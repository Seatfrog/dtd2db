import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const record = new SnowflakeFixedWidthRecord(
  "ticket_journey_status",
  ["status_code", "end_date"],
  {
    "status_code": new TrimmedTextField(0, 3, true),
    "end_date": new TrimmedTextField(3, 8, true),
    "start_date": new TrimmedTextField(11, 8, true),
    "status_type": new TrimmedTextField(19, 1, true)
  }
);

const TJS = new SingleRecordFile(record);

export default TJS; 