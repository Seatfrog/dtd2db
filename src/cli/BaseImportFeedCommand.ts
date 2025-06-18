import AdmZip = require("adm-zip");
import * as fs from 'fs';
import {CLICommand} from "@cli/CLICommand";
import {FeedConfig} from "@feed/FeedConfig";
import {FeedFile} from "@feed/file/FeedFile";
import {DatabaseConnection} from "@database/DatabaseConnection";
import * as path from "path";
import {DatabaseSchema} from "@database/DatabaseSchema";
import byline = require("byline");
import streamToPromise = require("stream-to-promise");

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
 * Base class for importing feeds with database-agnostic logic
 */
export abstract class BaseImportFeedCommand implements CLICommand {

  constructor(
    protected readonly db: DatabaseConnection,
    protected readonly files: FeedConfig,
    protected readonly tmpFolder: string
  ) { 
    console.log('BaseImportFeedCommand constructor called');
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
    
    try {
      // Extract the zip file
      console.log(`\n📦 Extracting zip file...`);
      const zip = new AdmZip(filePath);
      zip.extractAllTo(this.tmpFolder, true);
      console.log(`✅ Zip file extracted successfully`);

      // Get list of files to process
      const filesToProcess = this.getFilesToProcess(onlyFileTypes);
      console.log(`📋 Files to process: ${filesToProcess.join(', ')}`);

      // Ensure all required schemas exist
      console.log(`\n🗄️  Setting up database schemas...`);
      await this.ensureAllRequiredSchemas(filesToProcess, tableNames);
      console.log(`✅ Database schemas ready`);

      // Process each file
      console.log(`\n📁 Processing files...`);
      for (const filename of filesToProcess) {
        console.log(`\n🔄 Processing file: ${filename}`);
        await this.processFile(filename, tableNames);
      }

      // Set last schedule ID
      console.log(`\n🆔 Setting last schedule ID...`);
      await this.setLastScheduleId();

      // Remove orphan stop times
      console.log(`\n🧹 Cleaning up orphan stop times...`);
      await this.removeOrphanStopTimes();

      const endTime = Date.now();
      console.log(`\n✅ IMPORT COMPLETED SUCCESSFULLY`);
      console.log(`⏱️  Total time: ${endTime - startTime}ms`);
    } catch (error) {
      console.error(`\n❌ IMPORT FAILED:`, error);
      throw error;
    }
  }

  /**
   * Get list of files to process based on onlyFileTypes filter
   */
  private getFilesToProcess(onlyFileTypes: string[] | null): string[] {
    const allFiles = fs.readdirSync(this.tmpFolder);
    
    // Filter files that have a config
    const filesWithConfig = allFiles.filter(filename => this.getFeedFile(filename));
    
    // If onlyFileTypes is specified, only process files with those extensions
    if (onlyFileTypes) {
      return filesWithConfig.filter(filename => {
        const ext = getExt(filename);
        return onlyFileTypes.includes(ext);
      });
    }
    
    return filesWithConfig;
  }

  /**
   * Ensure all required schemas exist for the files to be processed
   */
  private async ensureAllRequiredSchemas(filesToProcess: string[], tableNames: string[] | null = null): Promise<void> {
    console.log(`    📋 Ensuring schemas for ${filesToProcess.length} files...`);
    
    for (const filename of filesToProcess) {
      const file = this.getFeedFile(filename);
      if (file) {
        console.log(`    🗄️  Setting up schema for file: ${filename}`);
        await this.setupSchema(file, tableNames);
      } else {
        console.log(`    ⚠️  No config found for file: ${filename}`);
      }
    }
  }

  /**
   * Set up the schema for a given file
   */
  protected async setupSchema(file: FeedFile, tableNames: string[] | null = null): Promise<void> {
    const schemas = this.schemas(file);
    console.log(`      📊 Found ${schemas.length} schemas for file`);
    
    for (const schema of schemas) {
      console.log(`      🏗️  Creating schema`);
      await schema.createSchema();
    }
  }

  /**
   * Create the last processed schema
   */
  private async createLastProcessedSchema(): Promise<void> {
    const schema = new (await this.getLastProcessedSchemaClass())(
      this.db,
      'last_processed'
    );
    await schema.createSchema();
  }

  /**
   * Set the last schedule ID
   */
  protected async setLastScheduleId(): Promise<void> {
    // This is a placeholder - database-specific implementations should override
    console.log(`      ⏭️  Skipping setLastScheduleId (to be implemented by database-specific class)`);
  }

  /**
   * Remove orphan stop times
   */
  protected async removeOrphanStopTimes() {
    // This is a placeholder - database-specific implementations should override
    console.log(`      ⏭️  Skipping removeOrphanStopTimes (to be implemented by database-specific class)`);
  }

  /**
   * Update the last file processed
   */
  protected async updateLastFile(filename: string): Promise<void> {
    // This is a placeholder - database-specific implementations should override
    console.log(`      ⏭️  Skipping updateLastFile (to be implemented by database-specific class)`);
  }

  /**
   * Process the records inside the given file - common implementation
   */
  protected async processFile(filename: string, tableNames: string[] | null): Promise<any> {
    console.log(`    📁 Starting to process file: ${filename}`);
    
    const file = this.getFeedFile(filename);
    if (!file) {
      console.log(`    ❌ No config found for file: ${filename}`);
      return;
    }
    
    console.log(`    📋 Getting tables for file: ${filename}`);
    const tables = await this.tables(file, tableNames);
    console.log(`    📊 Tables prepared: ${Object.keys(tables).join(', ')}`);
    
    console.log(`    🔄 Creating ${this.getDatabaseType()} stream for file: ${filename}`);
    const tableStream = this.createStream(filename, file, tables);
    const stream = byline.createStream(fs.createReadStream(`${this.tmpFolder}/${filename}`, "utf8")).pipe(tableStream);

    try {
      console.log(`    ⏳ Processing ${this.getDatabaseType()} stream for file: ${filename}`);
      const startTime = Date.now();
      await streamToPromise(stream);
      const endTime = Date.now();
      
      console.log(`    ✅ Successfully processed ${filename} (${this.getDatabaseType()} stream took ${endTime - startTime}ms)`);
    }
    catch (err) {
      console.error(`    ❌ Error processing ${filename}:`);
      console.error(`    ${err}`);
      throw err; // Re-throw to ensure the error is handled by the caller
    }
  }

  /**
   * Get tables for the given file - common implementation
   */
  protected async tables(file: FeedFile, tableNames: string[] | null): Promise<any> {
    const index = {};
    console.log(`      🗄️  Database type: ${this.getDatabaseType()}`);
    console.log(`      📝 Record types: ${file.recordTypes.map(r => r.name).join(', ')}`);

    for (const record of file.recordTypes) {
      // If tableNames is specified, only create table objects for those specific tables
      if (tableNames && !tableNames.includes(record.name)) {
        console.log(`      ⏭️  Skipping table object creation for: ${record.name} (not in requested tables: ${tableNames.join(', ')})`);
        continue;
      }

      if (!index[record.name]) {
        const db = record.orderedInserts ? await this.db.getConnection() : this.db;
        console.log(`      🏗️  Creating ${this.getDatabaseType()} table object for: ${record.name}`);
        index[record.name] = this.createTable(db, record);
      }
    }

    return index;
  }

  /**
   * Get the database type name for logging
   */
  protected abstract getDatabaseType(): string;

  /**
   * Create the appropriate stream for this database type
   */
  protected abstract createStream(filename: string, file: FeedFile, tables: any): any;

  /**
   * Create the appropriate table for this database type
   */
  protected abstract createTable(db: DatabaseConnection, record: any): any;

  /**
   * Get the feed file configuration for a given filename
   */
  protected getFeedFile(filename: string): FeedFile {
    const ext = getExt(filename);
    return this.files[ext];
  }

  /**
   * Get schemas for a given file
   */
  protected schemas(file: FeedFile): DatabaseSchema[] {
    return file.recordTypes.map(record => new (this.getSchemaClass())(this.db, record));
  }

  /**
   * Get the schema class for this database type
   */
  protected abstract getSchemaClass(): any;

  /**
   * Get the last processed schema class for this database type
   */
  protected abstract getLastProcessedSchemaClass(): Promise<any>;

  /**
   * End the connection
   */
  public end(): Promise<void> {
    return this.db.end();
  }
} 