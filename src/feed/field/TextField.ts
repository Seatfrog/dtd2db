import {Field} from "@feed/field/Field";

/**
 * Basic text field, with a fixed length
 */
export class TextField extends Field {

  /**
   * Return the string as is
   */
  protected parse(value: string): string {
    return value;
  }

}

/**
 * Text field with a variable length
 */
export class VariableLengthText extends TextField {}

/**
 * Text field that trims whitespace
 */
export class TrimmedTextField extends TextField {
  /**
   * Return the string with whitespace trimmed
   */
  protected parse(value: string): string {
    return value.trim();
  }
}
