import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const ticketValidity = new SnowflakeFixedWidthRecord(
  "ticket_validity",
  ["validity_code", "end_date"],
  {
    "validity_code": new TrimmedTextField(0, 2, true),
    "end_date": new TrimmedTextField(2, 8, true),
    "start_date": new TrimmedTextField(10, 8, true),
    "description": new TrimmedTextField(18, 20, true),
    "out_days": new TrimmedTextField(38, 2, true),
    "out_months": new TrimmedTextField(40, 2, true),
    "ret_days": new TrimmedTextField(42, 2, true),
    "ret_months": new TrimmedTextField(44, 2, true),
    "ret_after_days": new TrimmedTextField(46, 2, true),
    "ret_after_months": new TrimmedTextField(48, 2, true),
    "ret_after_day": new TrimmedTextField(50, 2, true),
    "break_out": new TrimmedTextField(52, 1, true),
    "break_in": new TrimmedTextField(53, 1, true),
    "out_description": new TrimmedTextField(54, 14, true),
    "rtn_description": new TrimmedTextField(68, 14, true)
  }
);

const TVL = new SingleRecordFile(ticketValidity);

export default TVL; 