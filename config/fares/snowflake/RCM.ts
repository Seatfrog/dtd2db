import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const record = new SnowflakeFixedWidthRecord(
  "railcard_minimum_fare",
  ["railcard_code", "ticket_code", "end_date"],
  {
    "railcard_code": new TrimmedTextField(0, 3, true),
    "ticket_code": new TrimmedTextField(3, 3, true),
    "end_date": new TrimmedTextField(6, 8, true),
    "start_date": new TrimmedTextField(14, 8, true),
    "minimum_fare": new TrimmedTextField(22, 8, true)
  }
);

const RCM = new SingleRecordFile(record);

export default RCM; 