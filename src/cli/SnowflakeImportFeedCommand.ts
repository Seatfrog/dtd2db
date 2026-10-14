import { BaseImportFeedCommand } from "@cli/BaseImportFeedCommand";
import { DatabaseConnection } from "@database/DatabaseConnection";
import { FeedConfig } from "@feed/FeedConfig";
import { SnowflakeStream } from "@database/SnowflakeStream";
import { FeedFile } from "@feed/file/FeedFile";
import { SnowflakeTable } from "@database/SnowflakeTable";
import { SnowflakeSchema } from "@database/SnowflakeSchema";
import { Record } from "@feed/record/Record";
import { randomUUID } from "crypto";
import * as path from "path";

/**
 * Snowflake-specific implementation of ImportFeedCommand
 */
export class SnowflakeImportFeedCommand extends BaseImportFeedCommand {
  constructor(
    db: DatabaseConnection,
    files: FeedConfig,
    tmpFolder: string
  ) {
    super(db, files, tmpFolder);
  }

  /**
   * Get the database type name for logging
   */
  protected getDatabaseType(): string {
    return "Snowflake";
  }

  /**
   * Create the Snowflake stream
   */
  protected createStream(filename: string, file: FeedFile, tables: any): SnowflakeStream {
    return new SnowflakeStream(filename, file, tables);
  }

  /**
   * Create the Snowflake table
   */
  protected createTable(db: DatabaseConnection, record: Record): SnowflakeTable {
    const loadTableName = this.loadTableNames?.[record.name];

    return new SnowflakeTable(
      db,
      loadTableName || record.name,
      process.env.SNOWFLAKE_SCHEMA!,
      process.env.DATABASE_NAME!,
      5000,
      record,
      undefined,
      !!loadTableName
    );
  }

  /**
   * Load tables for the full refresh file being processed, by record name. Null while processing a change file.
   */
  private loadTableNames: { [recordName: string]: string } | null = null;

  /**
   * A full refresh file (RJFAF...) holds every record, so it replaces its tables rather than merging into them.
   * The rows load into new transient tables, which then replace the live tables with COPY GRANTS so that existing
   * privileges are kept. A change file (RJFAC...) merges into the live tables as before.
   */
  protected async processFile(filename: string, tableNames: string[] | null): Promise<any> {
    const file = this.getFeedFile(filename);

    if (!file || path.basename(filename).charAt(4) !== "F") {
      return super.processFile(filename, tableNames);
    }

    // A unique suffix keeps two runs for the same table from using the same load table
    const suffix = `__LOAD_${randomUUID().slice(0, 8).toUpperCase()}`;
    const records = file.recordTypes.filter(record => !tableNames || tableNames.includes(record.name));
    this.loadTableNames = Object.fromEntries(records.map(record => [record.name, record.name + suffix]));

    try {
      for (const record of records) {
        await this.schemaFor(record, this.loadTableNames[record.name]).createTransientSchema();
      }

      await super.processFile(filename, tableNames);

      for (const record of records) {
        console.log(`    🔁 Replacing ${record.name} with the full refresh from ${filename}`);
        await this.db.query(
          `CREATE OR REPLACE TABLE ${this.fullTableName(record.name)} COPY GRANTS AS SELECT * FROM ${this.fullTableName(this.loadTableNames[record.name])}`
        );
      }
    } finally {
      for (const loadTableName of Object.values(this.loadTableNames)) {
        await this.db.query(`DROP TABLE IF EXISTS ${this.fullTableName(loadTableName)}`)
          .catch(err => console.error(`    ❌ Could not drop ${loadTableName}: ${err}`));
      }
      this.loadTableNames = null;
    }
  }

  private schemaFor(record: Record, tableName: string = record.name): SnowflakeSchema {
    return new SnowflakeSchema(this.db, record, process.env.SNOWFLAKE_SCHEMA!, process.env.DATABASE_NAME!, undefined, tableName);
  }

  private fullTableName(tableName: string): string {
    return `${process.env.DATABASE_NAME}.${process.env.SNOWFLAKE_SCHEMA}.${tableName.toUpperCase()}`;
  }

  /**
   * Get schemas for a given file using Snowflake-specific schema implementation
   */
  protected schemas(file: FeedFile): SnowflakeSchema[] {
    return file.recordTypes.map(record => 
      new SnowflakeSchema(
        this.db, 
        record, 
        process.env.SNOWFLAKE_SCHEMA!, 
        process.env.DATABASE_NAME!
      )
    );
  }

  /**
   * Get the Snowflake schema class
   */
  protected getSchemaClass(): any {
    return SnowflakeSchema;
  }

  /**
   * Get the Snowflake last processed schema class
   */
  protected async getLastProcessedSchemaClass(): Promise<any> {
    return SnowflakeSchema;
  }

  /**
   * Set the last schedule ID for Snowflake
   */
  protected async setLastScheduleId(): Promise<void> {
    // Snowflake-specific implementation for setting last schedule ID
    console.log(`      🆔 Setting last schedule ID for Snowflake...`);
    // TODO: Implement Snowflake-specific logic
  }

  /**
   * Remove orphan stop times for Snowflake
   */
  protected async removeOrphanStopTimes() {
    // Snowflake-specific implementation for removing orphan stop times
    console.log(`      🧹 Removing orphan stop times for Snowflake...`);
    // TODO: Implement Snowflake-specific logic
  }

  /**
   * Update the last file processed for Snowflake
   */
  protected async updateLastFile(filename: string): Promise<void> {
    // Snowflake-specific implementation for updating last file
    console.log(`      📝 Updating last file processed for Snowflake: ${filename}`);
    // TODO: Implement Snowflake-specific logic
  }
} 