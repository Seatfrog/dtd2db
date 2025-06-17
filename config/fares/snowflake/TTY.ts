import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const ticketTypeFixedWidthRecord = new SnowflakeFixedWidthRecord(
  "ticket_type",
  ["ticket_code", "end_date"],
  {
    "ticket_code": new TrimmedTextField(1, 3, true),
    "end_date": new TrimmedTextField(4, 8, true),
    "start_date": new TrimmedTextField(12, 8, true),
    "quote_date": new TrimmedTextField(20, 8, true),
    "description": new TrimmedTextField(28, 15, true),
    "tkt_class": new TrimmedTextField(43, 1, true),
    "tkt_type": new TrimmedTextField(44, 1, true),
    "tkt_group": new TrimmedTextField(45, 1, true),
    "last_valid_day": new TrimmedTextField(46, 8, true),
    "max_passengers": new TrimmedTextField(54, 3, true),
    "min_passengers": new TrimmedTextField(57, 3, true),
    "max_adults": new TrimmedTextField(60, 3, true),
    "min_adults": new TrimmedTextField(63, 3, true),
    "max_children": new TrimmedTextField(66, 3, true),
    "min_children": new TrimmedTextField(69, 3, true),
    "restricted_by_date": new TrimmedTextField(72, 1, true),
    "restricted_by_train": new TrimmedTextField(73, 1, true),
    "restricted_by_area": new TrimmedTextField(74, 1, true),
    "validity_code": new TrimmedTextField(75, 2, true),
    "atb_description": new TrimmedTextField(77, 20, true),
    "lul_xlondon_issue": new TrimmedTextField(97, 1, true),
    "reservation_required": new TrimmedTextField(98, 1, true),
    "capri_code": new TrimmedTextField(99, 3, true),
    "lul_93": new TrimmedTextField(102, 1, true),
    "uts_code": new TrimmedTextField(103, 2, true),
    "time_restriction": new TrimmedTextField(105, 1, true),
    "free_pass_lul": new TrimmedTextField(106, 1, true),
    "package_mkr": new TrimmedTextField(107, 1, true),
    "fare_multiplier": new TrimmedTextField(108, 3, true),
    "discount_category": new TrimmedTextField(111, 2, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const TTY = new SingleRecordFile(ticketTypeFixedWidthRecord);

export default TTY; 