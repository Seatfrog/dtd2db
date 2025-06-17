import { CLICommand } from "@cli/CLICommand";
import { DatabaseConnection } from "@database/DatabaseConnection";
import * as fs from "fs";
import * as path from "path";
import { Logger } from "@utils/Logger";

const logger = Logger.getInstance();

/**
 * Command to import GTFS data into Snowflake
 */
export class SnowflakeGTFSImportCommand implements CLICommand {
  constructor(
    private readonly db: DatabaseConnection,
    private readonly tmpFolder: string
  ) {}

  /**
   * Import GTFS files into Snowflake
   */
  public async run(argv: string[]): Promise<void> {
    const inputPath = argv[3] || "./";
    logger.debug(`Importing GTFS files from ${inputPath} into Snowflake`);

    // Create tables if they don't exist
    await this.createTables();

    // Import each GTFS file
    const files = [
      "agency.txt",
      "stops.txt",
      "routes.txt",
      "trips.txt",
      "stop_times.txt",
      "calendar.txt",
      "calendar_dates.txt",
      "transfers.txt",
      "links.txt"
    ];

    for (const file of files) {
      const filePath = path.join(inputPath, file);
      if (fs.existsSync(filePath)) {
        await this.importFile(file, filePath);
      }
    }

    logger.debug("GTFS import completed successfully");
  }

  /**
   * Create the GTFS tables in Snowflake
   */
  private async createTables(): Promise<void> {
    const tables = [
      `CREATE TABLE IF NOT EXISTS agency (
        agency_id VARCHAR(100) NOT NULL,
        agency_name VARCHAR(255) NOT NULL,
        agency_url VARCHAR(255) NOT NULL,
        agency_timezone VARCHAR(100) NOT NULL,
        agency_lang VARCHAR(100),
        agency_phone VARCHAR(100),
        agency_fare_url VARCHAR(100)
      )`,
      `CREATE TABLE IF NOT EXISTS stops (
        stop_id VARCHAR(100) NOT NULL,
        stop_code VARCHAR(50),
        stop_name VARCHAR(255) NOT NULL,
        stop_desc VARCHAR(255),
        stop_lat FLOAT,
        stop_lon FLOAT,
        zone_id VARCHAR(255),
        stop_url VARCHAR(255),
        location_type VARCHAR(2),
        parent_station VARCHAR(100),
        stop_timezone VARCHAR(50),
        wheelchair_boarding NUMBER(1)
      )`,
      `CREATE TABLE IF NOT EXISTS routes (
        route_id VARCHAR(100) NOT NULL,
        agency_id VARCHAR(100),
        route_short_name VARCHAR(50) NOT NULL,
        route_long_name VARCHAR(255) NOT NULL,
        route_type NUMBER(12) NOT NULL,
        route_text_color VARCHAR(255),
        route_color VARCHAR(255),
        route_url VARCHAR(255),
        route_desc VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS trips (
        route_id VARCHAR(255) NOT NULL,
        service_id NUMBER(12) NOT NULL,
        trip_id NUMBER(12) NOT NULL,
        trip_headsign VARCHAR(50),
        trip_short_name VARCHAR(50),
        direction_id NUMBER(1),
        wheelchair_accessible NUMBER(1),
        bikes_allowed NUMBER(1)
      )`,
      `CREATE TABLE IF NOT EXISTS stop_times (
        trip_id NUMBER(12) NOT NULL,
        arrival_time TIME,
        departure_time TIME,
        stop_id VARCHAR(100) NOT NULL,
        stop_sequence NUMBER(1) NOT NULL,
        stop_headsign VARCHAR(50),
        pickup_type NUMBER(1),
        drop_off_type NUMBER(1),
        shape_dist_traveled VARCHAR(50),
        timepoint NUMBER(1)
      )`,
      `CREATE TABLE IF NOT EXISTS calendar (
        service_id NUMBER(12) NOT NULL,
        monday NUMBER(1) NOT NULL,
        tuesday NUMBER(1) NOT NULL,
        wednesday NUMBER(1) NOT NULL,
        thursday NUMBER(1) NOT NULL,
        friday NUMBER(1) NOT NULL,
        saturday NUMBER(1) NOT NULL,
        sunday NUMBER(1) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS calendar_dates (
        service_id NUMBER(12) NOT NULL,
        date DATE NOT NULL,
        exception_type NUMBER(2) NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS transfers (
        from_stop_id VARCHAR(100) NOT NULL,
        to_stop_id VARCHAR(100) NOT NULL,
        transfer_type NUMBER(1) NOT NULL,
        min_transfer_time NUMBER(8) NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS links (
        from_stop_id VARCHAR(100) NOT NULL,
        to_stop_id VARCHAR(100) NOT NULL,
        mode VARCHAR(15) NOT NULL,
        duration NUMBER(8) NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        monday NUMBER(1) NOT NULL,
        tuesday NUMBER(1) NOT NULL,
        wednesday NUMBER(1) NOT NULL,
        thursday NUMBER(1) NOT NULL,
        friday NUMBER(1) NOT NULL,
        saturday NUMBER(1) NOT NULL,
        sunday NUMBER(1) NOT NULL
      )`
    ];

    for (const table of tables) {
      await this.db.query(table);
    }
  }

  /**
   * Import a single GTFS file into Snowflake
   */
  private async importFile(tableName: string, filePath: string): Promise<void> {
    const table = tableName.replace(".txt", "");
    logger.debug(`Importing ${table} from ${filePath}`);

    // Create a temporary stage for the file
    const stageName = `gtfs_${table}_stage`;
    await this.db.query(`CREATE OR REPLACE TEMPORARY STAGE ${stageName}`);

    // Put the file into the stage
    await this.db.query(`PUT file://${filePath} @${stageName}`);

    // Copy the data from the stage to the table
    await this.db.query(`
      COPY INTO ${table}
      FROM @${stageName}
      FILE_FORMAT = (TYPE = CSV FIELD_DELIMITER = ',' SKIP_HEADER = 1)
    `);

    // Clean up the stage
    await this.db.query(`DROP STAGE IF EXISTS ${stageName}`);
  }
} 