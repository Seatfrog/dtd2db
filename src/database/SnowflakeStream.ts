import {Writable} from "stream";
import {SnowflakeTable} from "@database/SnowflakeTable";
import {FeedFile} from "@feed/file/FeedFile";
import { Logger, LogLevel } from "@utils/Logger";
import { SnowflakeTableFactory } from '@database/SnowflakeTableFactory';

export class SnowflakeStream extends Writable {
  private logger: Logger;
  private tables: TableIndex;

  constructor(
    private readonly filename: string,
    private readonly file: FeedFile,
    private readonly initialTables: TableIndex,
    logger?: Logger
  ) {
    super({ decodeStrings: false });
    this.logger = logger || Logger.getInstance();
    this.logger.debug(`SnowflakeStream initialized for file: ${filename}`);
    this.tables = this.initializeTables();
  }

  private initializeTables(): TableIndex {
    const factory = SnowflakeTableFactory.getInstance();
    const tableIndex: TableIndex = {};
    for (const [tableName, table] of Object.entries(this.initialTables)) {
      const record = this.file.recordTypes.find(r => r.name === tableName);
      tableIndex[tableName] = factory.getTable(
        table.getDb(),
        table.getTableName(),
        table.getSchemaName(),
        table.getDatabaseName(),
        table.getFlushLimit(),
        record,
        this.logger
      );
    }
    return tableIndex;
  }

  public async _write(line: string, encoding: string, callback: WritableCallback): Promise<void> {
    if (line === "" || line.charAt(0) === "/") {
      return callback();
    }

    try {
      this.logger.debug(`Processing line: ${line.substring(0, 100)}...`);
      const record = this.file.getRecord(line);

      if (record) {
        this.logger.debug(`Found record type: ${record.name}`);
        await this.tables[record.name].initialize();
        await this.tables[record.name].apply(record.extractValues(line));
      } else {
        this.logger.debug('No record type found for line');
      }

      callback();
    }
    catch (err) {
      this.logger.debug(`Error processing line: ${err}`);
      callback(Error(`Error processing ${this.filename} with data ${line}` + err.stack));
    }
  }

  public async _final(callback: WritableCallback): Promise<void> {
    try {
      this.logger.debug('Finalizing stream, closing all tables');
      await Promise.all(Object.values(this.tables).map(t => t.close()));
      this.logger.debug('All tables closed successfully');
      callback();
    }
    catch (err) {
      this.logger.debug(`Error during stream finalization: ${err}`);
      callback(err);
    }
  }

  public async ensureExists(): Promise<void> {
    for (const table of Object.values(this.tables)) {
      if (typeof (table as any).ensureExists === 'function') {
        await (table as any).ensureExists();
      }
    }
    this.logger.debug('All tables in stream ensured to exist');
  }
}

export type WritableCallback = (error?: Error | null) => void;

export type TableIndex = {
  [tableName: string]: SnowflakeTable;
} 