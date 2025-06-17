import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";

const record = new SnowflakeFixedWidthRecord(
  "advance_ticket",
  ["ticket_code", "restriction_code", "restriction_flag", "toc_id", "end_date"],
  {
    "ticket_code": new TrimmedTextField(0, 3, true),
    "restriction_code": new TrimmedTextField(3, 2, true),
    "restriction_flag": new TrimmedTextField(5, 1, true),
    "toc_id": new TrimmedTextField(6, 2, true),
    "end_date": new TrimmedTextField(8, 8, true),
    "start_date": new TrimmedTextField(16, 8, true),
    "check_type": new TrimmedTextField(24, 1, true),
    "ap_data": new TrimmedTextField(25, 8, true),
    "booking_time": new TrimmedTextField(33, 4, true)
  }
);

const TAP = new SingleRecordFile(record);

export default TAP; 