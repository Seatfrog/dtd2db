import {Field} from "@feed/field/Field";
import {Record} from "@feed/record/Record";

/**
 * Interface for records that can provide their last ID
 */
export interface RecordWithLastId extends Record {
  lastId: number;
}

export class ForeignKeyField extends Field {
  constructor(
    private readonly foreignRecord: RecordWithLastId,
    public readonly offset = 0
  ) {
    super(0, 1, false, []);
  }

  /**
   * Return the last apply ID of the foreign record
   */
  protected parse(value: string): number {
    return this.foreignRecord.lastId + this.offset;
  }
}
