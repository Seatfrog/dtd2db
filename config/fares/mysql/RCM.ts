import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";
import {IntField} from "@feed/field/IntField";
import {DateField} from "@feed/field/DateField";
import {RecordAction} from "@feed/record/Record";

const record = new FixedWidthRecord(
  "railcard_minimum_fare",
  ["railcard_code", "ticket_code", "end_date"],
  {
    "railcard_code": new TextField(0, 3),
    "ticket_code": new TextField(3, 3),
    "end_date": new DateField(6),
    "start_date": new DateField(14),
    "minimum_fare": new IntField(22, 8)
  }
);

const RCM = new SingleRecordFile(record);

export default RCM;