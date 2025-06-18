import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const record = new FixedWidthRecord(
  "ticket_journey_status",
  ["status_code", "end_date"],
  {
    "status_code": new TextField(0, 3),
    "end_date": new TextField(3, 8),
    "start_date": new TextField(11, 8),
    "status_type": new TextField(19, 1)
  }
);

const TJS = new SingleRecordFile(record);

export default TJS; 