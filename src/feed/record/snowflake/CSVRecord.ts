import {Field, FieldValue} from "../../field/Field";
import {FieldMap, ParsedRecord, Record, RecordAction} from "../Record";
import memoize from "memoized-class-decorator";

/**
 * Snowflake-specific version of CSVRecord that doesn't include ID field
 */
export class SnowflakeCSVRecord implements Record {
  constructor(
    public readonly name: string,
    public readonly key: string[],
    public readonly fields: FieldMap,
    public readonly indexes: string[] = [],
    public readonly fieldDelimiter: string | RegExp = ",",
    public readonly orderedInserts: boolean = false
  ) {}

  @memoize
  private get fieldValues(): [string, Field][] {
    return Object.entries(this.fields);
  }

  /**
   * Split the CSV string and look up the relevant field to do the parsing
   * Note: Unlike the MySQL version, this doesn't add an ID field
   */
  extractValues(line: string): ParsedRecord {
    const fieldValues = line.trim().split(this.fieldDelimiter);
    const values = {};
    const action = RecordAction.Insert;

    for (let i = 0; i < fieldValues.length; i++) {
      const entry = this.fieldValues.find(([k, f]) => (f.position + fieldValues.length) % fieldValues.length === i);

      if (entry) {
        const [key, field] = entry;
        values[key.toUpperCase()] = field.extract(fieldValues[i]);
      }
    }

    const keysValues = this.key.reduce((vals, key) => {
      vals[key.toUpperCase()] = values[key.toUpperCase()];
      return vals;
    }, {});

    return { action, values, keysValues };
  }
} 