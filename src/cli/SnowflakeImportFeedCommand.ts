import { ImportFeedCommand } from "@cli/ImportFeedCommand";
import { DatabaseConnection } from "@database/DatabaseConnection";
import { FeedConfig } from "@feed/FeedConfig";
import { SnowflakeStream } from "@database/SnowflakeStream";
import { FeedFile } from "@feed/file/FeedFile";
import { SnowflakeTable } from "@database/SnowflakeTable";
import byline = require("byline");
import streamToPromise = require("stream-to-promise");
import * as fs from "fs";

/**
 * Snowflake-specific implementation of ImportFeedCommand
 */
export class SnowflakeImportFeedCommand extends ImportFeedCommand {
  constructor(
    db: DatabaseConnection,
    files: FeedConfig,
    tmpFolder: string
  ) {
    super(db, files, tmpFolder);
  }

  /**
   * Process the records inside the given file using Snowflake-specific stream
   */
  protected async processFile(filename: string, tableNames: string[] | null = null): Promise<any> {
    console.log(`    📁 Starting to process file: ${filename}`);
    
    const file = this.getFeedFile(filename);
    if (!file) {
      console.log(`    ❌ No config found for file: ${filename}`);
      return;
    }
    
    console.log(`    📋 Getting tables for file: ${filename}`);
    const tables = await this.tables(file, tableNames);
    console.log(`    📊 Tables prepared: ${Object.keys(tables).join(', ')}`);
    
    console.log(`    🔄 Creating Snowflake stream for file: ${filename}`);
    const tableStream = new SnowflakeStream(filename, file, tables);
    const stream = byline.createStream(fs.createReadStream(`${this.tmpFolder}/${filename}`, "utf8")).pipe(tableStream);

    try {
      console.log(`    ⏳ Processing Snowflake stream for file: ${filename}`);
      const startTime = Date.now();
      await streamToPromise(stream);
      const endTime = Date.now();
      
      console.log(`    ✅ Successfully processed ${filename} (Snowflake stream took ${endTime - startTime}ms)`);
    }
    catch (err) {
      console.error(`    ❌ Error processing ${filename}:`);
      console.error(`    ${err}`);
      throw err; // Re-throw to ensure the error is handled by the caller
    }
  }

  /**
   * Get tables for the given file using Snowflake-specific table implementation
   */
  protected async tables(file: FeedFile, tableNames: string[] | null = null): Promise<any> {
    const index = {};
    console.log(`      🗄️  Database type: Snowflake`);
    console.log(`      📝 Record types: ${file.recordTypes.map(r => r.name).join(', ')}`);

    for (const record of file.recordTypes) {
      // If tableNames is specified, only create table objects for those specific tables
      if (tableNames && !tableNames.includes(record.name)) {
        console.log(`      ⏭️  Skipping table object creation for: ${record.name} (not in requested tables: ${tableNames.join(', ')})`);
        continue;
      }

      if (!index[record.name]) {
        const db = record.orderedInserts ? await this.db.getConnection() : this.db;
        console.log(`      🏗️  Creating Snowflake table object for: ${record.name}`);
        index[record.name] = new SnowflakeTable(
          db,
          record.name,
          process.env.SNOWFLAKE_SCHEMA!,
          process.env.DATABASE_NAME!,
          5000,
          record
        );
      }
    }

    return index;
  }
} 