import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const record = new FixedWidthRecord(
  "ticket_class",
  ["class_code", "end_date"],
  {
    "class_code": new TextField(0, 1),
    "end_date": new TextField(1, 8),
    "start_date": new TextField(9, 8),
    "class_name": new TextField(17, 8),
    "class_abbreviation": new TextField(25, 3)
  }
);

const TCL = new SingleRecordFile(record);

export default TCL; 