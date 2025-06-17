import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile} from "@feed/file/MultiRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const statusDiscount = new SnowflakeFixedWidthRecord(
  "status_discount",
  ["status_code", "end_date", "discount_category"],
  {
    "status_code": new TrimmedTextField(1, 3, true),
    "end_date": new TrimmedTextField(4, 8, true),
    "discount_category": new TrimmedTextField(12, 2, true),
    "discount_indicator": new TrimmedTextField(14, 1, true),
    "discount_percentage": new TrimmedTextField(15, 3, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const status = new SnowflakeFixedWidthRecord(
  "status",
  ["status_code", "end_date"],
  {
    "status_code": new TrimmedTextField(1, 3, true),
    "end_date": new TrimmedTextField(4, 8, true),
    "start_date": new TrimmedTextField(12, 8, true),
    "atb_desc": new TrimmedTextField(20, 5, true),
    "cc_desc": new TrimmedTextField(25, 5, true),
    "uts_code": new TrimmedTextField(30, 1, true),
    "first_single_max_flat": new TrimmedTextField(31, 8, true),
    "first_return_max_flat": new TrimmedTextField(39, 8, true),
    "std_single_max_flat": new TrimmedTextField(47, 8, true),
    "std_return_max_flat": new TrimmedTextField(55, 8, true),
    "first_lower_min": new TrimmedTextField(63, 8, true),
    "first_higher_min": new TrimmedTextField(71, 8, true),
    "std_lower_min": new TrimmedTextField(79, 8, true),
    "std_higher_min": new TrimmedTextField(87, 8, true),
    "fs_mkr": new TrimmedTextField(95, 1, true),
    "fr_mkr": new TrimmedTextField(96, 1, true),
    "ss_mkr": new TrimmedTextField(97, 1, true),
    "sr_mkr": new TrimmedTextField(98, 1, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const DIS = new MultiRecordFile({
  "S": status,
  "D": statusDiscount
}, 0);

export default DIS; 