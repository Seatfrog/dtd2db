import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile} from "@feed/file/MultiRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const rover = new SnowflakeFixedWidthRecord(
  "rover",
  ["rover_code", "end_date"],
  {
    "rover_code": new TrimmedTextField(1, 3, true),
    "end_date": new TrimmedTextField(4, 8, true),
    "start_date": new TrimmedTextField(12, 8, true),
    "quote_date": new TrimmedTextField(20, 8, true),
    "description": new TrimmedTextField(28, 30, true),
    "ticket_desc": new TrimmedTextField(58, 15, true),
    "capri_ticket_code": new TrimmedTextField(73, 3, true),
    "rover_accounting_code": new TrimmedTextField(76, 4, true),
    "days_travel": new TrimmedTextField(80, 3, true),
    "months_valid": new TrimmedTextField(83, 2, true),
    "days_valid": new TrimmedTextField(85, 2, true)
  }
);

const price = new SnowflakeFixedWidthRecord(
  "rover_price",
  ["rover_code", "end_date", "railcard_code", "rover_class"],
  {
    "rover_code": new TrimmedTextField(1, 3, true),
    "end_date": new TrimmedTextField(4, 8, true),
    "railcard_code": new TrimmedTextField(12, 3, true),
    "rover_class": new TrimmedTextField(15, 1, true),
    "adult_fare": new TrimmedTextField(16, 8, true),
    "child_fare": new TrimmedTextField(24, 8, true),
    "restriction_code": new TrimmedTextField(32, 2, true)
  }
);

const TRR = new MultiRecordFile({
  "R": rover,
  "P": price
}, 0);

export default TRR; 