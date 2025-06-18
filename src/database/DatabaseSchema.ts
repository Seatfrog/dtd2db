import { DatabaseConnection } from "./DatabaseConnection";
import { Record } from "../feed/record/Record";
import { MySQLSchema } from "./MySQLSchema";
import { SnowflakeSchema } from "./SnowflakeSchema";

export interface DatabaseSchema {
  createSchema(): Promise<any>;
  dropSchema(): Promise<any>;
  tableExists(): Promise<boolean>;
}

export class DatabaseSchemaFactory {
  static create(db: DatabaseConnection, record: Record): DatabaseSchema {
    if (db.type === "mysql") {
      return new MySQLSchema(db, record);
    } else if (db.type === "snowflake") {
      if (!process.env.SNOWFLAKE_SCHEMA || !process.env.DATABASE_NAME) {
        throw new Error("SNOWFLAKE_SCHEMA and DATABASE_NAME environment variables are required for Snowflake");
      }
      return new SnowflakeSchema(db, record, process.env.SNOWFLAKE_SCHEMA, process.env.DATABASE_NAME);
    }
    throw new Error(`Unsupported database type: ${db.type}`);
  }
} 