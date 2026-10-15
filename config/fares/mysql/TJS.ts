import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const record = new FixedWidthRecord(
  "journey_segment",
  ["js_code", "end_date"],
  {
    "js_code": new TextField(0, 3),
    "end_date": new TextField(3, 8),
    "start_date": new TextField(11, 8),
    "line": new TextField(19, 3),
    "segment_start": new TextField(22, 2),
    "segment_end": new TextField(24, 2)
  }
);

const TJS = new SingleRecordFile(record);

export default TJS; 