import { BaseImportFeedCommand } from "@cli/BaseImportFeedCommand";
import { DatabaseConnection } from "@database/DatabaseConnection";
import { FeedConfig } from "@feed/FeedConfig";
import { SnowflakeStream } from "@database/SnowflakeStream";
import { FeedFile } from "@feed/file/FeedFile";
import { SnowflakeTable } from "@database/SnowflakeTable";
import { SnowflakeSchema } from "@database/SnowflakeSchema";
import { Record } from "@feed/record/Record";

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
    return new SnowflakeTable(
      db,
      record.name,
      process.env.SNOWFLAKE_SCHEMA!,
      process.env.DATABASE_NAME!,
      5000,
      record
    );
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