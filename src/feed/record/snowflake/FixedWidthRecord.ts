import {FieldMap, ParsedRecord, Record, RecordAction} from "../Record";

/**
 * Snowflake-specific version of FixedWidthRecord that doesn't include ID field
 */
export class SnowflakeFixedWidthRecord implements Record {
  constructor(
    public readonly name: string,
    public readonly key: string[],
    public readonly fields: FieldMap,
    public readonly indexes: string[] = [],
    public readonly actionMap: ActionMap = {},
    public readonly charPosition: number = 0,
    public readonly orderedInserts: boolean = false
  ) {}

  /**
   * Extract the relevant part of the line for each field and then get the value from the field
   * Note: Unlike the MySQL version, this doesn't add an ID field
   */
  public extractValues(line: string): ParsedRecord {
    const action = this.actionMap[line.charAt(this.charPosition)] || RecordAction.Insert;
    const values = {};

    for (const key of Object.keys(this.fields)) {
      values[key.toUpperCase()] = this.fields[key].extract(line.substr(this.fields[key].position, this.fields[key].length));
    }

    const keysValues = this.key.reduce((vals, key) => {
      vals[key.toUpperCase()] = values[key.toUpperCase()];
      return vals;
    }, {});

    return { action, values, keysValues } as ParsedRecord;
  }
}

/**
 * Different feeds use different characters for different actions, this map provides a look up from char to action
 */
export interface ActionMap {
  [char: string]: RecordAction;
} 