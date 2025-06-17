import {FieldMap, ParsedRecord, Record, RecordAction} from "../Record";

/**
 * Snowflake-specific version of MultiFormatRecord that doesn't include ID field
 */
export class SnowflakeMultiFormatRecord implements Record {
  constructor(
    public readonly name: string,
    public readonly key: string[],
    public readonly fields: FieldMap,
    private readonly records: MultiRecordFieldMap,
    private readonly recordIdentifierStart: number,
    private readonly recordIdentifierLength: number,
    public readonly indexes: string[] = [],
    public readonly orderedInserts: boolean = false
  ) {}

  /**
   * Extract the relevant part of the line for each field and then get the value from the field
   * Note: Unlike the MySQL version, this doesn't add an ID field
   */
  public extractValues(line: string): ParsedRecord {
    const type = line.substr(this.recordIdentifierStart, this.recordIdentifierLength);
    const record = this.records[type];
    const values = {};
    const action = RecordAction.Insert;

    for (const key in record) {
      values[key.toUpperCase()] = record[key].extract(line.substr(record[key].position, record[key].length));
    }

    const keysValues = Object.keys(values).reduce((vals, key) => {
      vals[key] = values[key];
      return vals;
    }, {});

    return { action, values, keysValues };
  }
}

export type MultiRecordFieldMap = {
  [recordIdentifier: string]: FieldMap
}; 