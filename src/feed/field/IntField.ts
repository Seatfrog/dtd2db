import {Field, ParseError} from "@feed/field/Field";

export class IntField extends Field {

  constructor(position: number,
              length: number,
              nullable: boolean = false,
              nullChars: string[] = [" ", "*", "9", "AY", "YY"]) {
    super(position, length, nullable, nullChars);
  }

  /**
   * Try to process this string as an integer
   */
  protected parse(value: string): number {
    // Only treat actual nulls, empty strings, or exact matches of nullChars as null
    if (value === null || value === "" || this.nullValues.includes(value)) {
      if (this.nullable) return null;
      throw new ParseError(`Non-nullable field received null value: "${value}" at position ${this.position}`);
    }

    const intValue = parseInt(value);

    if (isNaN(intValue)) {
      throw new ParseError(`Error parsing int: "${value}" isNaN`);
    }

    return intValue;
  }

}

export class ZeroFillIntField extends Field {

  /**
   * Zero filled ints are stored as padded chars
   */
  protected parse(value: string): string {
    return value.padStart(this.length, "0");
  }

}