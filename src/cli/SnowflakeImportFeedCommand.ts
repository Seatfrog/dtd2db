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
  protected async processFile(filename: string): Promise<any> {
    const file = this.getFeedFile(filename);
    const tables = await this.tables(file);
    const tableStream = new SnowflakeStream(filename, file, tables);
    const stream = byline.createStream(fs.createReadStream(`${this.tmpFolder}/${filename}`, "utf8")).pipe(tableStream);

    try {
      await streamToPromise(stream);
      console.log(`Finished processing ${filename}`);
    }
    catch (err) {
      console.error(`Error processing ${filename}`);
      console.error(err);
    }
  }

  /**
   * Get tables for the given file using Snowflake-specific table implementation
   */
  protected async tables(file: FeedFile): Promise<any> {
    const index = {};

    for (const record of file.recordTypes) {
      if (!index[record.name]) {
        const db = record.orderedInserts ? await this.db.getConnection() : this.db;
        console.log('Creating Snowflake table for record:', record.name);
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