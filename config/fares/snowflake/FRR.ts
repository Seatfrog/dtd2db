import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const record = new SnowflakeFixedWidthRecord(
  "fare_route_restriction",
  ["restriction_code", "end_date"],
  {
    "restriction_code": new TrimmedTextField(0, 2, true),
    "end_date": new TrimmedTextField(2, 8, true),
    "start_date": new TrimmedTextField(10, 8, true),
    "route_code": new TrimmedTextField(18, 5, true),
    "direction": new TrimmedTextField(23, 1, true),
    "restriction_type": new TrimmedTextField(24, 1, true),
    "restriction_value": new TrimmedTextField(25, 7, true)
  }
);

const FRR = new SingleRecordFile(record);

export default FRR; 