import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const discountFixedWidthRecord = new SnowflakeFixedWidthRecord(
  "non_standard_discount",
  ["origin_code", "destination_code", "route_code", "railcard_code", "ticket_code", "end_date"],
  {
    "origin_code": new TrimmedTextField(1, 4, true),
    "destination_code": new TrimmedTextField(5, 4, true),
    "route_code": new TrimmedTextField(9, 5, true),
    "railcard_code": new TrimmedTextField(14, 3, true, ["*"]),
    "ticket_code": new TrimmedTextField(17, 3, true),
    "end_date": new TrimmedTextField(20, 8, true),
    "start_date": new TrimmedTextField(28, 8, true),
    "quote_date": new TrimmedTextField(36, 8, true),
    "use_nlc": new TrimmedTextField(44, 4, true),
    "adult_nodis_flag": new TrimmedTextField(48, 1, true, []),
    "adult_add_on_amount": new TrimmedTextField(49, 8, true),
    "adult_rebook_flag": new TrimmedTextField(57, 1, true),
    "child_nodis_flag": new TrimmedTextField(58, 1, true, []),
    "child_add_on_amount": new TrimmedTextField(59, 8, true),
    "child_rebook_flag": new TrimmedTextField(67, 1, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const FNS = new SingleRecordFile(discountFixedWidthRecord);

export default FNS; 