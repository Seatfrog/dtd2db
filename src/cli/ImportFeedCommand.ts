import AdmZip = require("adm-zip");
import * as fs from 'fs';
import {CLICommand} from "@cli/CLICommand";
import {FeedConfig} from "@feed/FeedConfig";
import {FeedFile} from "@feed/file/FeedFile";
import {MySQLSchema} from "@database/MySQLSchema";
import {DatabaseConnection} from "@database/DatabaseConnection";
import * as path from "path";
import {MySQLTable} from "@database/MySQLTable";
import memoize from "memoized-class-decorator";
import {MultiRecordFile} from "@feed/file/MultiRecordFile";
import {RecordWithManualIdentifier} from "@feed/record/mysql/FixedWidthRecord";
import {MySQLStream} from "@database/MySQLStream";
import {SnowflakeStream} from "@database/SnowflakeStream";
import byline = require("byline");
import streamToPromise = require("stream-to-promise");
import {SnowflakeTable} from "@database/SnowflakeTable";
import {SnowflakeSchema} from "@database/SnowflakeSchema";
import { DatabaseSchema } from "@database/DatabaseSchema";

const getExt = filename => path.extname(filename).slice(1).toUpperCase();
const readFile = filename => byline.createStream(fs.createReadStream(filename, "utf8"));

/**
 * Imports one of the feeds
 */
export class ImportFeedCommand implements CLICommand {

  constructor(
    protected readonly db: DatabaseConnection,
    protected readonly files: FeedConfig,
    protected readonly tmpFolder: string
  ) { 
    console.log('ImportFeedCommand constructor called');
    console.log('Database type:', process.env.DATABASE_TYPE);
  }

  protected get fileArray(): FeedFile[] {
    return Object.values(this.files);
  }

  /**
   * Do the import and then shut down the connection pool
   */
  public async run(argv: string[]): Promise<void> {
    await this.doImport(argv[3]);
    return this.end();
  }

  /**
   * Extract the zip, set up the schema and do the inserts
   */
  public async doImport(filePath: string): Promise<void> {
    console.log(`Extracting ${filePath} to ${this.tmpFolder}`);
    fs.rmSync(this.tmpFolder, {recursive: true, force: true});

    new AdmZip(filePath).extractAllTo(this.tmpFolder);

    const zipName = path.basename(filePath);

    // if the file is a not an incremental, reset the database schema
    if (zipName.charAt(4) !== "C") {
      // Run schema setup sequentially
      for (const file of this.fileArray) {
        await this.setupSchema(file);
      }
    }
    
    // Always ensure the log table exists
    await this.createLastProcessedSchema();

    if (this.files["CFA"] instanceof MultiRecordFile) {
      await this.setLastScheduleId();
    }

    // Process files sequentially
    const files = fs.readdirSync(this.tmpFolder)
      .filter(filename => this.getFeedFile(filename));
    
    for (const filename of files) {
      await this.processFile(filename);
    }

    if (this.files["CFA"] instanceof MultiRecordFile) {
      await this.removeOrphanStopTimes();
    }

    await this.updateLastFile(zipName);
    fs.rmSync(this.tmpFolder, { recursive: true });
  }

  /**
   * Drop and recreate the tables
   */
  protected async setupSchema(file: FeedFile): Promise<void> {
    // Run schema operations sequentially
    const schemas = this.schemas(file);
    for (const schema of schemas) {
      await schema.dropSchema();
    }
    for (const schema of schemas) {
      await schema.createSchema();
    }
  }

  /**
   * Create the last_file table (if it doesn't already exist)
   */
  private async createLastProcessedSchema(): Promise<void> {
    const isSnowflake = process.env.DATABASE_TYPE === "snowflake";
    if (isSnowflake) {
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS ${process.env.DATABASE_NAME}.${process.env.SNOWFLAKE_SCHEMA}.LAST_PROCESSED (
          FILENAME VARCHAR(255) NOT NULL,
          PROCESSED TIMESTAMP_NTZ NOT NULL
        )
      `);
    } else {
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS last_processed (
          FILENAME VARCHAR(255) NOT NULL,
          PROCESSED TIMESTAMP NOT NULL
        )
      `);
    }
  }

  /**
   * Set the last schedule ID in the CFA record
   * For MySQL: Uses manual ID generation
   * For Snowflake: No ID generation needed as Snowflake handles this
   */
  protected async setLastScheduleId(): Promise<void> {
    const isSnowflake = process.env.DATABASE_TYPE === "snowflake";
    const cfaFile = this.files["CFA"] as MultiRecordFile;
    
    if (!isSnowflake) {
      // MySQL: Get the last ID and set it for manual ID generation
      const [[lastSchedule]] = await this.db.query<{id : number}>("SELECT id FROM schedule ORDER BY id desc LIMIT 1");
      const lastId = lastSchedule ? lastSchedule.id : 0;
      const bsRecord = cfaFile.records["BS"] as RecordWithManualIdentifier;
      bsRecord.lastId = lastId;
    }
    // For Snowflake, we don't need to do anything as it handles IDs differently
  }

  protected async removeOrphanStopTimes() {
    return Promise.all([
      this.db.query("DELETE FROM stop_time WHERE schedule NOT IN (SELECT id FROM schedule)"),
      this.db.query("DELETE FROM schedule_extra WHERE schedule NOT IN (SELECT id FROM schedule)")
    ]);
  }

  protected async updateLastFile(filename: string): Promise<void> {
    const isSnowflake = process.env.DATABASE_TYPE === "snowflake";
    if (isSnowflake) {
      await this.db.query(
        `INSERT INTO ${process.env.DATABASE_NAME}.${process.env.SNOWFLAKE_SCHEMA}.LAST_PROCESSED (FILENAME, PROCESSED) VALUES (?, CURRENT_TIMESTAMP())`,
        [filename]
      );
    } else {
      await this.db.query("INSERT INTO log VALUES (null, ?, NOW())", [filename]);
    }
  }

  /**
   * Process the records inside the given file
   */
  protected async processFile(filename: string): Promise<any> {
    const file = this.getFeedFile(filename);
    const tables = await this.tables(file);
    const tableStream = new MySQLStream(filename, file, tables);
    const stream = readFile(`${this.tmpFolder}/${filename}`).pipe(tableStream);

    try {
      await streamToPromise(stream);

      console.log(`Finished processing ${filename}`);
    }
    catch (err) {
      console.error(`Error processing ${filename}`);
      console.error(err);
    }
  }

  @memoize
  protected getFeedFile(filename: string): FeedFile {
    return this.files[getExt(filename)];
  }

  @memoize
  protected schemas(file: FeedFile): DatabaseSchema[] {
    const isSnowflake = process.env.DATABASE_TYPE === "snowflake";
    return file.recordTypes.map(record => 
      isSnowflake 
        ? new SnowflakeSchema(this.db, record, process.env.SNOWFLAKE_SCHEMA!, process.env.DATABASE_NAME!)
        : new MySQLSchema(this.db, record)
    );
  }

  @memoize
  protected async tables(file: FeedFile): Promise<any> {
    console.log('tables method called');
    const index = {};
    const isSnowflake = process.env.DATABASE_TYPE === "snowflake";
    console.log('isSnowflake:', isSnowflake);

    for (const record of file.recordTypes) {
      if (!index[record.name]) {
        const db = record.orderedInserts ? await this.db.getConnection() : this.db;
        console.log('Creating table for record:', record.name);
        index[record.name] = isSnowflake 
          ? new SnowflakeTable(db, record.name, process.env.SNOWFLAKE_SCHEMA!, process.env.DATABASE_NAME!)
          : new MySQLTable(db, record.name);
      }
    }

    return index;
  }

  /**
   * Close the underling database connection
   */
  public end(): Promise<void> {
    return this.db.end();
  }
}
