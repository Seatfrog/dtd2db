import { BaseImportFeedCommand } from "@cli/BaseImportFeedCommand";
import { DatabaseConnection } from "@database/DatabaseConnection";
import { FeedConfig } from "@feed/FeedConfig";
import { FeedFile } from "@feed/file/FeedFile";
import { MySQLTable } from "@database/MySQLTable";
import { MySQLSchema } from "@database/MySQLSchema";
import { MySQLStream } from "@database/MySQLStream";
import { Record } from "@feed/record/Record";

/**
 * MySQL-specific implementation of ImportFeedCommand
 */
export class MySQLImportFeedCommand extends BaseImportFeedCommand {
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
    return "MySQL";
  }

  /**
   * Create the MySQL stream
   */
  protected createStream(filename: string, file: FeedFile, tables: any): MySQLStream {
    return new MySQLStream(filename, file, tables);
  }

  /**
   * Create the MySQL table
   */
  protected createTable(db: DatabaseConnection, record: Record): MySQLTable {
    return new MySQLTable(db, record.name, 5000);
  }

  /**
   * Get schemas for a given file using MySQL-specific schema implementation
   */
  protected schemas(file: FeedFile): MySQLSchema[] {
    return file.recordTypes.map(record => new MySQLSchema(this.db, record));
  }

  /**
   * Get the MySQL schema class
   */
  protected getSchemaClass(): any {
    return MySQLSchema;
  }

  /**
   * Get the MySQL last processed schema class
   */
  protected async getLastProcessedSchemaClass(): Promise<any> {
    return MySQLSchema;
  }

  /**
   * Set the last schedule ID for MySQL
   */
  protected async setLastScheduleId(): Promise<void> {
    // MySQL-specific implementation for setting last schedule ID
    console.log(`      🆔 Setting last schedule ID for MySQL...`);
    // TODO: Implement MySQL-specific logic
  }

  /**
   * Remove orphan stop times for MySQL
   */
  protected async removeOrphanStopTimes() {
    // MySQL-specific implementation for removing orphan stop times
    console.log(`      🧹 Removing orphan stop times for MySQL...`);
    // TODO: Implement MySQL-specific logic
  }

  /**
   * Update the last file processed for MySQL
   */
  protected async updateLastFile(filename: string): Promise<void> {
    // MySQL-specific implementation for updating last file
    console.log(`      📝 Updating last file processed for MySQL: ${filename}`);
    // TODO: Implement MySQL-specific logic
  }
} 