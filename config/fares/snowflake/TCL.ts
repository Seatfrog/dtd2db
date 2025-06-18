import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const record = new SnowflakeFixedWidthRecord(
  "ticket_class",
  ["class_code", "end_date"],
  {
    "class_code": new TrimmedTextField(0, 1, true),
    "end_date": new TrimmedTextField(1, 8, true),
    "start_date": new TrimmedTextField(9, 8, true),
    "class_name": new TrimmedTextField(17, 8, true),
    "class_abbreviation": new TrimmedTextField(25, 3, true)
  }
);

const TCL = new SingleRecordFile(record);

export default TCL; 