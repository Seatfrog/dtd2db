import {Writable} from "stream";
import {MySQLTable} from "./MySQLTable";
import {FeedFile} from "../feed/file/FeedFile";

export class MySQLStream extends Writable {
  private readonly tables: { [key: string]: MySQLTable };

  constructor(
    private readonly filename: string,
    private readonly file: FeedFile,
    tables: TableIndex
  ) {
    super({ decodeStrings: false });
    this.tables = tables;
  }

  public async _write(line: string, encoding: string, callback: WritableCallback): Promise<void> {
    if (line === "" || line.charAt(0) === "/") {
      return callback();
    }

    try {
      const record = this.file.getRecord(line);

      if (record) {
        await this.tables[record.name].apply(record.extractValues(line));
      }

      callback();
    }
    catch (err) {
      callback(Error(`Error processing ${this.filename} with data ${line}` + err.stack));
    }
  }

  public async _final(callback: WritableCallback): Promise<void> {
    try {
      await Promise.all(Object.values(this.tables).map(t => t.close()));

      callback();
    }
    catch (err) {
      callback(err);
    }
  }
}

export type WritableCallback = (error?: Error | null) => void;

export type TableIndex = {
  [tableName: string]: MySQLTable;
}
