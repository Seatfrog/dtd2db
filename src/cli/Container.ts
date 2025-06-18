import memoize from "memoized-class-decorator";
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {CLICommand} from "@cli/CLICommand";
import {BaseImportFeedCommand} from "@cli/BaseImportFeedCommand";
import {MySQLImportFeedCommand} from "@cli/MySQLImportFeedCommand";
import {DatabaseConfiguration, DatabaseConnection} from "@database/DatabaseConnection";
import config from "@config/index";
import {CleanFaresCommand} from "@cli/CleanFaresCommand";
import {ShowHelpCommand} from "@cli/ShowHelpCommand";
import {OutputGTFSCommand} from "@cli/OutputGTFSCommand";
import {CIFRepository} from "@gtfs/repository/CIFRepository";
import {stationCoordinates} from "@config/gtfs/station-coordinates";
import {FileOutput} from "@gtfs/output/FileOutput";
import {GTFSOutput} from "@gtfs/output/GTFSOutput";
import {OutputGTFSZipCommand} from "@cli/OutputGTFSZipCommand";
import {DownloadCommand} from "@cli/DownloadCommand";
import {DownloadAndProcessCommand} from "@cli/DownloadAndProcessCommand";
import {GTFSImportCommand} from "@cli/GTFSImportCommand";
import {downloadUrl} from "@config/nfm64";
import {DownloadFileCommand} from "@cli/DownloadFileCommand";
import {PromiseSFTP} from "@src/sftp/PromiseSFTP";
import {SnowflakeDatabaseCommand} from "@cli/SnowflakeDatabaseCommand";
import {MySQLDatabaseCommand} from "@cli/MySQLDatabaseCommand";
import {SnowflakeConnection} from "@database/SnowflakeConnection";
import {SnowflakeGTFSImportCommand} from "@cli/SnowflakeGTFSImportCommand";
import {SnowflakeImportFeedCommand} from "@cli/SnowflakeImportFeedCommand";
import {SnowflakeCleanFaresCommand} from "@cli/SnowflakeCleanFaresCommand";

// Debug logging function
function debugLog(message: string): void {
  if (process.env.DEBUG) {
    console.log(`[DEBUG] ${message}`);
  }
}

export class Container {
  private readonly isSnowflake: boolean;

  constructor() {
    this.isSnowflake = process.env.DATABASE_TYPE === 'snowflake';
    if (this.isSnowflake) {
      this.validateSnowflakeConfig();
    }
  }

  private validateSnowflakeConfig(): void {
    const requiredVars = [
      'SNOWFLAKE_ACCOUNT',
      'SNOWFLAKE_USERNAME',
      'SNOWFLAKE_PRIVATE_KEY_PATH',
      'DATABASE_NAME',
      'SNOWFLAKE_SCHEMA',
      'SNOWFLAKE_WAREHOUSE',
      'SNOWFLAKE_ROLE'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required Snowflake environment variables: ${missingVars.join(', ')}`);
    }

    // Validate warehouse exists
    if (!process.env.SNOWFLAKE_WAREHOUSE) {
      throw new Error("SNOWFLAKE_WAREHOUSE environment variable is required for Snowflake connection");
    }
  }

  @memoize
  public getCommand(type: string): Promise<CLICommand> {
    debugLog(`getCommand called with type: ${type}`);
    switch (type) {
      case "--fares": return this.getFaresImportCommand();
      case "--fares-clean": return this.getCleanFaresCommand();
      case "--routeing": return this.getRouteingImportCommand();
      case "--timetable": return this.getTimetableImportCommand();
      case "--nfm64": return this.getNFM64ImportCommand();
      case "--gtfs": return this.getOutputGTFSCommand();
      case "--gtfs-import": return this.getImportGTFSCommand();
      case "--gtfs-zip": return this.getOutputGTFSZipCommand();
      case "--download-fares": return this.getDownloadCommand("/fares/");
      case "--download-timetable": return this.getDownloadCommand("/timetable/");
      case "--download-routeing": return this.getDownloadCommand("/routing_guide/");
      case "--download-nfm64": return this.getDownloadNFM64Command();
      case "--get-fares": return this.getDownloadAndProcessCommand("/fares/", this.getFaresImportCommand());
      case "--get-timetable": return this.getDownloadAndProcessCommand("/timetable/", this.getTimetableImportCommand());
      case "--get-routeing": return this.getDownloadAndProcessCommand("/routing_guide/", this.getRouteingImportCommand());
      case "--get-nfm64": return this.getDownloadAndProcessNFM64Command();
      default: return this.getShowHelpCommand();
    }
  }

  @memoize
  public async getFaresImportCommand(): Promise<BaseImportFeedCommand> {
    if (this.isSnowflake) {
      return new SnowflakeImportFeedCommand(await this.getDatabaseConnection(), config.fares, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
    }
    return new MySQLImportFeedCommand(await this.getDatabaseConnection(), config.fares, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
  }

  @memoize
  public async getRouteingImportCommand(): Promise<BaseImportFeedCommand> {
    if (this.isSnowflake) {
      return new SnowflakeImportFeedCommand(await this.getDatabaseConnection(), config.routeing, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
    }
    return new MySQLImportFeedCommand(await this.getDatabaseConnection(), config.routeing, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
  }

  @memoize
  public async getTimetableImportCommand(): Promise<BaseImportFeedCommand> {
    if (this.isSnowflake) {
      return new SnowflakeImportFeedCommand(await this.getDatabaseConnection(), config.timetable, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
    }
    return new MySQLImportFeedCommand(await this.getDatabaseConnection(), config.timetable, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
  }

  @memoize
  public async getNFM64ImportCommand(): Promise<BaseImportFeedCommand> {
    if (this.isSnowflake) {
      return new SnowflakeImportFeedCommand(await this.getDatabaseConnection(), config.nfm64, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
    }
    return new MySQLImportFeedCommand(await this.getDatabaseConnection(), config.nfm64, fs.mkdtempSync(path.join(os.tmpdir(), "dtd")));
  }

  @memoize
  public async getCleanFaresCommand(): Promise<CLICommand> {
    if (this.isSnowflake) {
      return new SnowflakeCleanFaresCommand(await this.getDatabaseConnection());
    }
    return new CleanFaresCommand(await this.getDatabaseConnection());
  }

  @memoize
  public async getShowHelpCommand(): Promise<CLICommand> {
    return new ShowHelpCommand();
  }

  @memoize
  public async getImportGTFSCommand(): Promise<CLICommand> {
    if (this.isSnowflake) {
      return new SnowflakeGTFSImportCommand(
        await this.getDatabaseConnection(),
        fs.mkdtempSync(path.join(os.tmpdir(), "dtd"))
      );
    }
    return new GTFSImportCommand(this.databaseConfiguration);
  }

  @memoize
  private getOutputGTFSCommandWithOutput(output: GTFSOutput): OutputGTFSCommand {
    return new OutputGTFSCommand(
      new CIFRepository(
        this.getDatabaseConnection(),
        this.getDatabaseStream(),
        stationCoordinates
      ),
      output
    );
  }

  @memoize
  private async getOutputGTFSCommand(): Promise<OutputGTFSCommand> {
    return this.getOutputGTFSCommandWithOutput(new FileOutput());
  }

  @memoize
  private async getOutputGTFSZipCommand(): Promise<OutputGTFSZipCommand> {
    return new OutputGTFSZipCommand(await this.getOutputGTFSCommand());
  }

  @memoize
  private async getDownloadCommand(path: string): Promise<DownloadCommand> {
    return new DownloadCommand(await this.getDatabaseConnection(), await this.getSFTP(), path);
  }

  @memoize
  private async getDownloadNFM64Command(): Promise<DownloadFileCommand> {
    return Promise.resolve(new DownloadFileCommand(downloadUrl));
  }

  @memoize
  private async getDownloadAndProcessCommand(path: string, process: Promise<BaseImportFeedCommand>): Promise<DownloadAndProcessCommand> {
    return new DownloadAndProcessCommand(await this.getDownloadCommand(path), await process);
  }

  @memoize
  private async getDownloadAndProcessNFM64Command(): Promise<DownloadAndProcessCommand> {
    return new DownloadAndProcessCommand(
      await this.getDownloadNFM64Command(),
      await this.getNFM64ImportCommand()
    );
  }

  @memoize
  private getSFTP(): Promise<PromiseSFTP> {
    return PromiseSFTP.connect({
      host: process.env.SFTP_HOSTNAME || "dtd.atocrsp.org",
      username: process.env.SFTP_USERNAME,
      password: process.env.SFTP_PASSWORD,
      algorithms: {
        kex: [
          "diffie-hellman-group1-sha1",
          "ecdh-sha2-nistp256",
          "ecdh-sha2-nistp384",
          "ecdh-sha2-nistp521",
          "diffie-hellman-group-exchange-sha256",
          "diffie-hellman-group14-sha1"
        ],
        cipher: [
          "3des-cbc",
          "aes128-ctr",
          "aes192-ctr",
          "aes256-ctr",
          "aes128-gcm",
          "aes128-gcm@openssh.com",
          "aes256-gcm",
          "aes256-gcm@openssh.com"
        ],
        serverHostKey: [
          "ssh-dss",
          "ssh-rsa",
          "ecdsa-sha2-nistp256",
          "ecdsa-sha2-nistp384",
          "ecdsa-sha2-nistp521"
        ],
        hmac: [
          "hmac-sha2-256",
          "hmac-sha2-512",
          "hmac-sha1"
        ]
      }
    });
  }

  @memoize
  public get databaseConfiguration(): DatabaseConfiguration {
    if (!process.env.DATABASE_NAME) {
      throw new Error("Please set the DATABASE_NAME environment variable.");
    }

    if (this.isSnowflake) {
      return {
        host: process.env.SNOWFLAKE_ACCOUNT!,
        user: process.env.SNOWFLAKE_USERNAME!,
        privateKeyPath: process.env.SNOWFLAKE_PRIVATE_KEY_PATH!,
        database: process.env.DATABASE_NAME,
        schema: process.env.SNOWFLAKE_SCHEMA!,
        warehouse: process.env.SNOWFLAKE_WAREHOUSE!,
        role: process.env.SNOWFLAKE_ROLE!,
        port: 443, // Snowflake uses HTTPS
        connectionLimit: 20,
        multipleStatements: true
      };
    }

    return {
      host: process.env.DATABASE_HOSTNAME || "localhost",
      user: process.env.DATABASE_USERNAME || "root",
      password: process.env.DATABASE_PASSWORD || null,
      database: process.env.DATABASE_NAME,
      port: +(process.env.DATABASE_PORT || 3306),
      connectionLimit: 20,
      multipleStatements: true
    };
  }

  @memoize
  public getDatabaseConnection(): DatabaseConnection {
    if (this.isSnowflake) {
      return new SnowflakeConnection(this.databaseConfiguration);
    }
    return require('mysql2/promise').createPool(this.databaseConfiguration);
  }

  @memoize
  public getDatabaseStream() {
    return this.getDatabaseConnection();
  }

  @memoize
  public async getDatabaseTypeCommand(): Promise<CLICommand> {
    if (this.isSnowflake) {
      return new SnowflakeDatabaseCommand();
    }
    return new MySQLDatabaseCommand();
  }
}
