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
 * Mapping from table names to file extensions for fares data
 */
const TABLE_TO_FILE_MAPPING: { [key: string]: string } = {
  // TOC file
  'toc': 'TOC',
  'toc_fare': 'TOC',
  // TPB file
  'ticket_price_band': 'TPB',
  // TPK file
  'package': 'TPK',
  'package_supplement': 'TPK',
  // LOC file
  'location': 'LOC',
  'location_group': 'LOC',
  'location_group_member': 'LOC',
  'location_association': 'LOC',
  'location_synonym': 'LOC',
  'location_railcard': 'LOC',
  // FFL file
  'flow': 'FFL',
  'fare': 'FFL',
  // RTE file
  'route': 'RTE',
  'route_location': 'RTE',
  // RST file
  'restriction_header': 'RST',
  'restriction_date': 'RST',
  'restriction_header_date': 'RST',
  'restriction_time': 'RST',
  'restriction_time_date': 'RST',
  'restriction_time_toc': 'RST',
  'restriction_train': 'RST',
  'restriction_train_date': 'RST',
  'restriction_train_quota': 'RST',
  'restriction_railcard': 'RST',
  'restriction_exception': 'RST',
  'restriction_ticket_calendar': 'RST',
  // SUP file
  'supplement': 'SUP',
  'supplement_rule': 'SUP',
  'supplement_rule_applies': 'SUP',
  'supplement_rule_supplement': 'SUP',
  'supplement_override': 'SUP',
  // TTY file
  'ticket_type': 'TTY',
  // TVL file
  'ticket_validity': 'TVL',
  // TRR file
  'rover': 'TRR',
  'rover_price': 'TRR',
  // DIS file
  'status': 'DIS',
  'status_discount': 'DIS',
  // RLC file
  'railcard': 'RLC',
  // RCM file
  'railcard_minimum_fare': 'RCM',
  // TAP file
  'advance_ticket': 'TAP',
  // TCL file
  'ticket_class': 'TCL',
  // TJS file
  'ticket_journey': 'TJS',
  // TPN file
  'ticket_price_network': 'TPN',
  // TSP file
  'ticket_supplement': 'TSP',
  // FSC file
  'station_cluster': 'FSC',
  // FRR file
  'fare_route_restriction': 'FRR',
  // FNS file
  'non_standard_discount': 'FNS',
  // NDF file
  'non_derivable_fare': 'NDF',
  // NFO file
  'non_derivable_fare_override': 'NFO'
};

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
    const filePath = argv[3];
    const onlyFileTypes = this.parseOnlyFlag(argv);
    const tableNames = this.parseTablesFlag(argv);
    
    // If --tables is specified, convert table names to file extensions
    let finalFileTypes = onlyFileTypes;
    if (tableNames) {
      const fileTypesFromTables = this.convertTableNamesToFileTypes(tableNames);
      finalFileTypes = fileTypesFromTables;
    }
    
    await this.doImport(filePath, finalFileTypes, tableNames);
    return this.end();
  }

  /**
   * Parse the --only flag from command line arguments (comma-separated list)
   */
  private parseOnlyFlag(argv: string[]): string[] | null {
    const onlyIndex = argv.findIndex(arg => arg === '--only');
    if (onlyIndex !== -1 && onlyIndex + 1 < argv.length) {
      return argv[onlyIndex + 1].split(',').map(ext => ext.trim().toUpperCase());
    }
    return null;
  }

  /**
   * Parse the --tables flag from command line arguments (space-separated list)
   */
  private parseTablesFlag(argv: string[]): string[] | null {
    const tablesIndex = argv.findIndex(arg => arg === '--tables');
    if (tablesIndex !== -1 && tablesIndex + 1 < argv.length) {
      // Collect all arguments after --tables until the next flag (starting with --) or end of input
      const tableNames: string[] = [];
      for (let i = tablesIndex + 1; i < argv.length; i++) {
        if (argv[i].startsWith('--')) break;
        if (argv[i].trim().length > 0) {
          tableNames.push(argv[i].trim().toLowerCase());
        }
      }
      console.log(`🔍 Parsed table names: [${tableNames.map(t => `"${t}"`).join(', ')}]`);
      return tableNames.length > 0 ? tableNames : null;
    }
    return null;
  }

  /**
   * Convert table names to file extensions using the mapping
   */
  private convertTableNamesToFileTypes(tableNames: string[]): string[] {
    const fileTypes = new Set<string>();
    
    for (const tableName of tableNames) {
      const fileType = TABLE_TO_FILE_MAPPING[tableName];
      if (fileType) {
        fileTypes.add(fileType);
      } else {
        console.warn(`Warning: Unknown table name '${tableName}'. Available tables: ${Object.keys(TABLE_TO_FILE_MAPPING).join(', ')}`);
      }
    }
    
    return Array.from(fileTypes);
  }

  /**
   * Extract the zip, set up the schema and do the inserts
   */
  public async doImport(filePath: string, onlyFileTypes: string[] | null, tableNames: string[] | null = null): Promise<void> {
    const startTime = Date.now();
    console.log(`\n=== STARTING IMPORT PROCESS ===`);
    console.log(`File: ${filePath}`);
    console.log(`Only file types: ${onlyFileTypes ? onlyFileTypes.join(', ') : 'ALL'}`);
    console.log(`Only tables: ${tableNames ? tableNames.join(', ') : 'ALL'}`);
    console.log(`Temp folder: ${this.tmpFolder}`);
    
    console.log(`\n[${new Date().toISOString()}] Step 1: Extracting ZIP file...`);
    console.log(`Extracting ${filePath} to ${this.tmpFolder}`);
    fs.rmSync(this.tmpFolder, {recursive: true, force: true});

    new AdmZip(filePath).extractAllTo(this.tmpFolder);
    console.log(`✓ ZIP extraction completed`);

    const zipName = path.basename(filePath);

    console.log(`\n[${new Date().toISOString()}] Step 2: Analyzing files to process...`);
    // Determine which files we'll be processing
    const allFiles = fs.readdirSync(this.tmpFolder);
    const filesToProcess = allFiles
      .filter(filename => this.getFeedFile(filename))
      .filter(filename => {
        // If onlyFileTypes is specified, only process files with those extensions
        if (onlyFileTypes) {
          const ext = getExt(filename);
          return onlyFileTypes.includes(ext);
        }
        return true;
      });

    console.log(`Total files in ZIP: ${allFiles.length}`);
    console.log(`Files with config: ${allFiles.filter(f => this.getFeedFile(f)).length}`);
    console.log(`Files that will be processed: ${filesToProcess.length}`);
    console.log('Files that will be processed:', filesToProcess);

    console.log(`\n[${new Date().toISOString()}] Step 3: Checking and creating required schemas...`);
    // Check and create all required schemas upfront
    await this.ensureAllRequiredSchemas(filesToProcess, tableNames);
    console.log(`✓ Schema setup completed`);
    
    console.log(`\n[${new Date().toISOString()}] Step 4: Setting up log table...`);
    // Always ensure the log table exists
    await this.createLastProcessedSchema();
    console.log(`✓ Log table setup completed`);

    if (this.files["CFA"] instanceof MultiRecordFile) {
      console.log(`\n[${new Date().toISOString()}] Step 5: Setting last schedule ID...`);
      await this.setLastScheduleId();
      console.log(`✓ Last schedule ID set`);
    }

    console.log(`\n[${new Date().toISOString()}] Step 6: Processing files...`);
    // Process files sequentially
    for (let i = 0; i < filesToProcess.length; i++) {
      const filename = filesToProcess[i];
      console.log(`\n[${new Date().toISOString()}] Processing file ${i + 1}/${filesToProcess.length}: ${filename}`);
      const fileStartTime = Date.now();
      await this.processFile(filename, tableNames);
      const fileEndTime = Date.now();
      console.log(`✓ Finished processing ${filename} (took ${fileEndTime - fileStartTime}ms)`);
    }

    if (this.files["CFA"] instanceof MultiRecordFile) {
      console.log(`\n[${new Date().toISOString()}] Step 7: Cleaning up orphan stop times...`);
      await this.removeOrphanStopTimes();
      console.log(`✓ Orphan cleanup completed`);
    }

    console.log(`\n[${new Date().toISOString()}] Step 8: Updating last processed file...`);
    await this.updateLastFile(zipName);
    console.log(`✓ Last processed file updated`);

    console.log(`\n[${new Date().toISOString()}] Step 9: Cleaning up temp folder...`);
    fs.rmSync(this.tmpFolder, { recursive: true });
    console.log(`✓ Temp folder cleaned up`);

    const endTime = Date.now();
    console.log(`\n=== IMPORT PROCESS COMPLETED ===`);
    console.log(`Total time: ${endTime - startTime}ms`);
    console.log(`Files processed: ${filesToProcess.length}`);
    console.log(`================================\n`);
  }

  /**
   * Check and create all required schemas for the files we'll be processing
   */
  private async ensureAllRequiredSchemas(filesToProcess: string[], tableNames: string[] | null = null): Promise<void> {
    console.log(`Checking schemas for ${filesToProcess.length} files...`);
    
    let totalTablesChecked = 0;
    let totalTablesCreated = 0;
    let totalTablesSkipped = 0;
    
    for (const filename of filesToProcess) {
      const file = this.getFeedFile(filename);
      if (!file) {
        console.log(`⚠️  No config found for file: ${filename}`);
        continue;
      }

      console.log(`\nChecking schemas for file: ${filename}`);
      const schemas = this.schemas(file);
      console.log(`  Found ${schemas.length} record types in this file`);
      
      for (const schema of schemas) {
        const tableName = (schema as any).record?.name;
        totalTablesChecked++;
        
        // If tableNames is specified, only create schemas for those specific tables
        if (tableNames && tableName && !tableNames.includes(tableName)) {
          console.log(`  ⏭️  Skipping table '${tableName}' (not in requested tables: ${tableNames.join(', ')})`);
          totalTablesSkipped++;
          continue;
        }
        
        console.log(`  Checking table: ${tableName}`);
        const exists = await schema.tableExists();
        if (!exists) {
          console.log(`  ➕ Creating table: ${tableName}`);
          await schema.createSchema();
          totalTablesCreated++;
        } else {
          console.log(`  ✓ Table already exists: ${tableName}`);
          totalTablesSkipped++;
        }
      }
    }
    
    console.log(`\n📊 Schema Summary:`);
    console.log(`  Tables checked: ${totalTablesChecked}`);
    console.log(`  Tables created: ${totalTablesCreated}`);
    console.log(`  Tables skipped: ${totalTablesSkipped}`);
  }

  /**
   * Drop and recreate the tables only if they don't exist
   */
  protected async setupSchema(file: FeedFile, tableNames: string[] | null = null): Promise<void> {
    // This method is now deprecated in favor of ensureAllRequiredSchemas
    // Keeping it for backward compatibility but it's no longer used
    console.warn('setupSchema is deprecated, use ensureAllRequiredSchemas instead');
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
    
    console.log(`    🔄 Creating stream for file: ${filename}`);
    const tableStream = new MySQLStream(filename, file, tables);
    const stream = readFile(`${this.tmpFolder}/${filename}`).pipe(tableStream);

    try {
      console.log(`    ⏳ Processing stream for file: ${filename}`);
      const startTime = Date.now();
      await streamToPromise(stream);
      const endTime = Date.now();
      
      console.log(`    ✅ Successfully processed ${filename} (stream took ${endTime - startTime}ms)`);
    }
    catch (err) {
      console.error(`    ❌ Error processing ${filename}:`);
      console.error(`    ${err}`);
      throw err; // Re-throw to ensure the error is handled by the caller
    }
  }

  @memoize
  protected getFeedFile(filename: string): FeedFile {
    const ext = getExt(filename);
    const configFound = !!this.files[ext];
    if (!configFound) {
      console.log(`      ⚠️  No config found for extension: ${ext} (file: ${filename})`);
    }
    return this.files[ext];
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
  protected async tables(file: FeedFile, tableNames: string[] | null = null): Promise<any> {
    const index = {};
    const isSnowflake = process.env.DATABASE_TYPE === "snowflake";
    console.log(`      🗄️  Database type: ${isSnowflake ? 'Snowflake' : 'MySQL'}`);
    console.log(`      📝 Record types: ${file.recordTypes.map(r => r.name).join(', ')}`);

    for (const record of file.recordTypes) {
      // If tableNames is specified, only create table objects for those specific tables
      if (tableNames && !tableNames.includes(record.name)) {
        console.log(`      ⏭️  Skipping table object creation for: ${record.name} (not in requested tables: ${tableNames.join(', ')})`);
        continue;
      }

      if (!index[record.name]) {
        const db = record.orderedInserts ? await this.db.getConnection() : this.db;
        console.log(`      🏗️  Creating table object for: ${record.name}`);
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
