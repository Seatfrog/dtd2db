import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const record = new SnowflakeFixedWidthRecord(
  "journey_segment",
  ["js_code", "end_date"],
  {
    "js_code": new TrimmedTextField(0, 3, true),
    "end_date": new TrimmedTextField(3, 8, true),
    "start_date": new TrimmedTextField(11, 8, true),
    "line": new TrimmedTextField(19, 3, true),
    "segment_start": new TrimmedTextField(22, 2, true),
    "segment_end": new TrimmedTextField(24, 2, true)
  }
);

const TJS = new SingleRecordFile(record);

export default TJS; 