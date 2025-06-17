import { DatabaseConnection } from "@database/DatabaseConnection";
import { Field } from "@feed/field/Field";
import { Record } from "@feed/record/Record";
import { TextField, VariableLengthText } from "@feed/field/TextField";
import { IntField, ZeroFillIntField } from "@feed/field/IntField";
import { BooleanField } from "@feed/field/BooleanField";
import { DateField, NullDateField, ShortDateField } from "@feed/field/DateField";
import { TimeField } from "@feed/field/TimeField";
import { DoubleField } from "@feed/field/DoubleField";
import { Logger, LogLevel } from "@utils/Logger";
import { DatabaseSchema } from "@database/DatabaseSchema";

export class SnowflakeSchema implements DatabaseSchema {
  private logger: Logger;
  constructor(
    private readonly db: DatabaseConnection,
    private readonly record: Record,
    private readonly schemaName: string,
    private readonly databaseName: string,
    logger?: Logger
  ) {
    this.logger = logger || Logger.getInstance();
    this.logger.debug(`SnowflakeSchema initialized for record: ${record.name} in database: ${databaseName}, schema: ${schemaName}`);
  }

  public createSchema(): Promise<any> {
    const schema = this.getSchema();
    this.logger.debug(`Creating schema for ${this.record.name}`);
    this.logger.debug(`Schema SQL: ${schema}`);
    return this.db.query(schema);
  }

  public dropSchema(): Promise<any> {
    this.logger.debug(`Dropping schema for ${this.record.name}`);
    return this.db.query(`DROP TABLE IF EXISTS ${this.databaseName}.${this.schemaName}.${this.record.name.toUpperCase()}`);
  }

  private getSchema(): string {
    const fields = Object.entries(this.record.fields)
      .map(SnowflakeSchema.getField)
      .join(', ');
    const unique = this.record.key.length === 0 
      ? "" 
      : `CONSTRAINT ${this.record.name.toUpperCase()}_KEY UNIQUE (${this.record.key.map(k => k.toUpperCase()).join(', ')})`;
    const table = [fields, unique].filter(Boolean).join(', ');
    const sql = `CREATE TABLE IF NOT EXISTS ${this.databaseName}.${this.schemaName}.${this.record.name.toUpperCase()} (${table})`;
    this.logger.debug(`[SnowflakeSchema] record.key: ${JSON.stringify(this.record.key)}`);
    this.logger.debug(`[SnowflakeSchema] Final CREATE TABLE SQL: ${sql}`);
    return sql;
  }

  private static getField(entry: [string, Field]): string {
    const [name, field] = entry;
    const type = SnowflakeSchema.getFieldType(field);
    const nullable = SnowflakeSchema.getNullStatement(field);

    return `${name.toUpperCase()} ${type} ${nullable}`;
  }

  private static getFieldType(field: Field): string {
    if (field instanceof VariableLengthText) return `VARCHAR(${field.length})`;
    if (field instanceof TextField)          return `VARCHAR(${field.length})`;
    if (field instanceof BooleanField)       return `BOOLEAN`;
    if (field instanceof ShortDateField)     return `DATE`;
    if (field instanceof DateField)          return `DATE`;
    if (field instanceof NullDateField)      return `DATE`;
    if (field instanceof TimeField)          return `TIME`;
    if (field instanceof DoubleField)        return `FLOAT`;
    if (field instanceof ZeroFillIntField)   return `VARCHAR(${field.length})`;
    if (field instanceof IntField) {
      if (field.length <= 4) return `NUMBER(4,0)`;
      if (field.length <= 9) return `NUMBER(9,0)`;
      return `NUMBER(18,0)`;
    }

    throw new Error(`Unknown field type: ${field.constructor.name}`);
  }

  private static getNullStatement(field: Field): string {
    return field.nullable ? 'NULL' : 'NOT NULL';
  }

  public async ensureExists(): Promise<void> {
    // Check if schema exists
    const checkSchemaQuery = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${this.schemaName}'`;
    const [rows] = await this.db.query(checkSchemaQuery);
    
    if (rows.length > 0) {
      this.logger.debug(`Schema ${this.schemaName} already exists`);
      return;
    }

    // Create schema if it doesn't exist
    const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS ${this.databaseName}.${this.schemaName}`;
    await this.db.query(createSchemaQuery);
    this.logger.debug(`Schema ${this.schemaName} ensured to exist`);
  }
} 