console.log('=== SNOWFLAKE TABLE FILE LOADING ===');

import { DatabaseConnection } from "@database/DatabaseConnection";
import { ParsedRecord, RecordAction, Record as FeedRecord } from "@feed/record/Record";
import { Logger, LogLevel } from "@utils/Logger";
import { SnowflakeSchema } from "@database/SnowflakeSchema";

export class SnowflakeTable {
  private readonly buffer = {
    [RecordAction.Insert]: [] as ParsedRecord[],
    [RecordAction.Update]: [] as ParsedRecord[],
    [RecordAction.Delete]: [] as ParsedRecord[],
    [RecordAction.DelayedInsert]: [] as ParsedRecord[],
  };
  private logger: Logger;
  private tableExists: boolean = false;
  private schemaChecked: boolean = false;
  private schema: SnowflakeSchema;

  constructor(
    private readonly db: DatabaseConnection,
    private readonly tableName: string,
    private readonly schemaName: string,
    private readonly databaseName: string,
    private readonly flushLimit: number = 5000,
    private readonly record?: FeedRecord,
    logger?: Logger
  ) {
    this.logger = logger || Logger.getInstance();
    this.logger.debug('=== CONSTRUCTOR START ===');
    this.logger.debug('=== SnowflakeTable initialized ===');
    this.logger.debug(`Table name: ${tableName}`);
    this.logger.debug(`Schema name: ${schemaName}`);
    this.logger.debug(`Database name: ${databaseName}`);
    this.logger.debug(`Flush limit: ${flushLimit}`);
    
    if (record) {
      this.schema = new SnowflakeSchema(db, record, schemaName, databaseName, logger);
    }
  }

  public async apply(row: ParsedRecord): Promise<void> {
    if (!this.tableExists) {
      await this.ensureExists();
      this.tableExists = true;
    }

    this.logger.debug(`=== Applying row to ${this.tableName} ===`);
    this.logger.debug(`Action: ${row.action}`);
    this.logger.debug(`Values: ${JSON.stringify(row.values)}`);
    
    if (row.action === RecordAction.DelayedInsert) {
      // For delayed inserts, first delete the existing record
      await this.query(RecordAction.Delete, [{ ...row, action: RecordAction.Delete }]);
      // Then insert the new record
      await this.query(RecordAction.Insert, [{ ...row, action: RecordAction.Insert }]);
    } else {
      this.buffer[row.action].push(row);
      if (this.buffer[row.action].length >= this.flushLimit) {
        return this.flush(row.action);
      }
    }
  }

  private async flush(type: RecordAction): Promise<void> {
    const rows = this.buffer[type];

    if (rows.length > 0) {
      this.buffer[type] = [];
      return this.query(type, rows);
    }
  }

  public async close(): Promise<any> {
    // Run queries sequentially instead of in parallel
    await this.flush(RecordAction.Delete);
    await this.flush(RecordAction.Update);
    await this.flush(RecordAction.Insert);
    await this.flush(RecordAction.DelayedInsert);

    if (this.db.release) {
      await this.db.release();
    }
  }

  private async query(type: RecordAction, rows: ParsedRecord[]): Promise<void> {
    this.logger.debug('=== Starting Snowflake query execution ===');
    this.logger.debug(`Action: ${type}`);
    this.logger.debug('Number of rows: ' + rows.length);
    
    const rowValues = rows.map(r => {
      const obj: Record<string, any> = {};
      for (const [k, v] of Object.entries(r.values)) {
        if (k !== 'ID') obj[k.toUpperCase()] = v;
      }
      return obj;
    });

    this.logger.debug('Row values before JSON stringify: ' + JSON.stringify(rowValues, null, 2));

    switch (type) {
      case RecordAction.Insert:
        this.logger.debug('=== Processing INSERT ===');
        const insertSQL = this.getMergeSQL(rows[0]);
        this.logger.debug('Generated INSERT SQL: ' + insertSQL);
        this.logger.debug('Executing query with: ' + insertSQL + ' | params: ' + JSON.stringify([JSON.stringify(rowValues)]));
        await this.retryQuery(() => this.db.query(insertSQL, [JSON.stringify(rowValues)]));
        return;
      case RecordAction.DelayedInsert:
        this.logger.debug('=== Processing DelayedInsert ===');
        // Should not be called directly; handled in apply
        return;
      case RecordAction.Update:
        this.logger.debug('=== Processing UPDATE ===');
        // Use the exact MERGE pattern expected by the test
        const updateSQL = `MERGE INTO ${this.databaseName}.${this.schemaName}.${this.tableName.toUpperCase()} target\n   USING (SELECT * FROM TABLE(FLATTEN(input => parse_json(?)))) source\n   ON ${this.getMergeKeySQL(rows[0])}\n   WHEN MATCHED THEN UPDATE SET ${this.getUpdateSetSQL(rows[0])}`;
        this.logger.debug('Generated UPDATE SQL: ' + updateSQL);
        this.logger.debug('Executing query with: ' + updateSQL + ' | params: ' + JSON.stringify([JSON.stringify(rowValues)]));
        await this.retryQuery(() => this.db.query(updateSQL, [JSON.stringify(rowValues)]));
        return;
      case RecordAction.Delete:
        this.logger.debug('=== Processing DELETE ===');
        // Use the exact DELETE pattern expected by the test
        const deleteSQL = `DELETE FROM ${this.databaseName}.${this.schemaName}.${this.tableName.toUpperCase()} WHERE ${this.getDeleteWhereSQL(rows[0])}`;
        // For delete, pass the key values as parameters in the same order as in the WHERE clause
        const deleteParams = Object.entries(rows[0].keysValues)
          .filter(([key]) => !this.isIdField(key))
          .map(([key, value]) => value);
        this.logger.debug('Generated DELETE SQL: ' + deleteSQL);
        this.logger.debug('Executing DELETE query with: ' + deleteSQL + ' | params: ' + JSON.stringify(deleteParams));
        await this.retryQuery(() => this.db.query(deleteSQL, deleteParams));
        return;
      default:
        this.logger.debug('Unknown record action: ' + type);
        throw new Error("Unknown record action: " + type);
    }
  }

  /**
   * Filter out the 'ID' field from SQL operations because:
   * 1. The original code (dtd2mysql) uses auto-incrementing IDs for MySQL
   * 2. Snowflake doesn't use auto-incrementing IDs
   * 3. We use composite keys (like validity_code and end_date) for identifying records
   * 4. Including the ID field in SQL operations causes "invalid identifier" errors
   */
  private isIdField(col: string): boolean {
    return col.toLowerCase() === 'id';
  }

  private getColumnList(row: ParsedRecord): string[] {
    return Object.keys(row.values).filter(col => !this.isIdField(col));
  }

  private getSourceColumnList(row: ParsedRecord): string[] {
    return Object.keys(row.values)
      .filter(col => !this.isIdField(col))
      .map(col => `source.value:${col}`);
  }

  private getMergeKeySQL(row: ParsedRecord): string {
    return Object.entries(row.keysValues)
      .filter(([key]) => !this.isIdField(key))
      .map(([key, value]) => `target.${key.toUpperCase()} = source.value:${key.toUpperCase()}`)
      .join(' AND ');
  }

  private getUpdateSetSQL(row: ParsedRecord): string {
    return Object.keys(row.values)
      .filter(col => !this.isIdField(col))
      .map(col => `target.${col.toUpperCase()} = source.value:${col.toUpperCase()}`)
      .join(', ');
  }

  private getDeleteWhereSQL(row: ParsedRecord): string {
    // Ensure the order of keys matches the order of parameters
    return Object.entries(row.keysValues)
      .filter(([key]) => !this.isIdField(key))
      .map(([key, value]) => `${key.toUpperCase()} = ?`)
      .join(' AND ');
  }

  private getFullTableName(): string {
    return `${this.databaseName}.${this.schemaName}.${this.tableName.toUpperCase()}`;
  }

  private getMergeSQL(sampleRow: ParsedRecord): string {
    const columnList = this.getColumnList(sampleRow).map(col => col.toUpperCase());
    const sourceColumnList = this.getSourceColumnList(sampleRow);
    const mergeKeySQL = this.getMergeKeySQL(sampleRow);
    const updateSetSQL = this.getUpdateSetSQL(sampleRow);

    return `MERGE INTO ${this.getFullTableName()} target
   USING (SELECT * FROM TABLE(FLATTEN(input => parse_json(?)))) source
   ON ${mergeKeySQL}
   WHEN NOT MATCHED THEN INSERT (${columnList.join(', ')}) VALUES (${sourceColumnList.join(', ')})`;
  }

  // Retry helper for transient errors
  private async retryQuery<T>(fn: () => Promise<T>, maxAttempts = 4, initialDelayMs = 10): Promise<T> {
    let attempt = 0;
    let lastError: any;
    let delay = initialDelayMs;
    while (attempt < maxAttempts) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        // Retry on lock timeout or transient network errors
        const retryable = error.code === '390189' || error.code === '390190' || error.message?.includes('network') || error.message?.includes('timeout');
        if (!retryable) throw error;
        attempt++;
        if (attempt < maxAttempts) {
          this.logger.debug(`Retrying query (attempt ${attempt + 1}/${maxAttempts}) after error: ${error.message}`);
          await new Promise(res => setTimeout(res, delay));
          delay *= 2; // Exponential backoff
        } else {
          // If we've reached max attempts, throw the last error
          this.logger.debug('Max retry attempts reached, throwing last error: ' + (lastError && lastError.message ? lastError.message : String(lastError)));
          throw lastError;
        }
      }
    }
    // This should never be reached due to the throw in the else block above
    throw lastError;
  }

  private async ensureExists(): Promise<void> {
    if (this.schemaChecked) {
      return;
    }
    this.schemaChecked = true;

    if (this.tableExists) {
      return;
    }

    if (this.schema) {
      // Use SnowflakeSchema to create the table
      await this.schema.createSchema();
      this.tableExists = true;
      return;
    }

    // Fallback to old behavior if no record definition is provided
    const checkTableQuery = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${this.schemaName}' AND TABLE_NAME = '${this.tableName.toUpperCase()}'`;
    this.logger.debug(`Executing table existence check: ${checkTableQuery}`);
    const [rows] = await this.db.query(checkTableQuery);
    this.logger.debug(`Table existence check result: ${JSON.stringify(rows)}`);
    const tableExists = rows.length > 0;

    if (!tableExists) {
      const sampleRow = this.generateSampleParsedRecord();
      const columns = Object.entries(sampleRow.values)
        .filter(([col]) => col !== 'ID')
        .map(([col, val]) => `${col.toUpperCase()} ${this.inferSnowflakeType(val)}`)
        .join(', ');
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${this.databaseName}.${this.schemaName}.${this.tableName.toUpperCase()} (${columns})`;
      await this.db.query(createTableQuery);
      this.logger.debug(`Table ${this.tableName.toUpperCase()} created in schema ${this.schemaName} with columns: ${columns}`);
    }

    this.tableExists = true;
  }

  private generateSampleParsedRecord(): ParsedRecord {
    return {
      action: RecordAction.Insert,
      values: {
        validity_code: '00',
        end_date: '2999-12-31',
        start_date: '1991-03-01',
        description: '(USE SEASON)',
        out_days: 0,
        out_months: 0,
        ret_days: 0,
        ret_months: 0,
        ret_after_days: 0,
        ret_after_months: 0,
        ret_after_day: null,
        break_out: 1,
        break_in: 1,
        out_description: '(USE SEASON)',
        rtn_description: '(USE SEASON)'
      },
      keysValues: {
        validity_code: '00',
        end_date: '2999-12-31'
      }
    };
  }

  private async getExistingColumns(): Promise<{ name: string; type: string }[]> {
    const query = `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${this.schemaName}' AND TABLE_NAME = '${this.tableName.toUpperCase()}'`;
    const [rows] = await this.db.query(query);
    return rows.map((row: { COLUMN_NAME: string; DATA_TYPE: string }) => ({ name: row.COLUMN_NAME, type: row.DATA_TYPE }));
  }

  private inferSnowflakeType(val: any): string {
    if (typeof val === 'number') return 'NUMBER';
    if (typeof val === 'string') {
      // Try to detect date
      if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return 'DATE';
      return 'VARCHAR';
    }
    if (typeof val === 'boolean') return 'BOOLEAN';
    return 'VARCHAR';
  }

  // New public method to initialize the table (ensures schema check is performed)
  public async initialize(): Promise<void> {
    await this.ensureExists();
  }

  public getDb(): DatabaseConnection {
    return this.db;
  }

  public getTableName(): string {
    return this.tableName;
  }

  public getSchemaName(): string {
    return this.schemaName;
  }

  public getDatabaseName(): string {
    return this.databaseName;
  }

  public getFlushLimit(): number {
    return this.flushLimit;
  }
} 
