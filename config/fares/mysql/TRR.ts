import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {MultiRecordFile} from "@feed/file/MultiRecordFile";
import {TextField} from "@feed/field/TextField";
import {DateField} from "@feed/field/DateField";
import {IntField} from "@feed/field/IntField";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {RecordAction} from "@feed/record/Record";

const rover = new FixedWidthRecord(
  "rover",
  ["rover_code", "end_date"],
  {
    "rover_code": new TextField(1, 3, true),
    "end_date": new DateField(4, true),
    "start_date": new DateField(12, true),
    "quote_date": new DateField(20, true),
    "description": new TextField(28, 30, true),
    "ticket_desc": new TextField(58, 15, true),
    "capri_ticket_code": new TextField(73, 3, true),
    "rover_accounting_code": new TextField(76, 4, true),
    "days_travel": new IntField(80, 3, true),
    "months_valid": new IntField(83, 2, true),
    "days_valid": new IntField(85, 2, true)
  }
);

const price = new FixedWidthRecord(
  "rover_price",
  ["rover_code", "end_date", "railcard_code", "rover_class"],
  {
    "rover_code": new TextField(1, 3, true),
    "end_date": new DateField(4, true),
    "railcard_code": new TextField(12, 3, true, []),
    "rover_class": new IntField(15, 1, true),
    "adult_fare": new IntField(16, 8, true),
    "child_fare": new IntField(24, 8, true),
    "restriction_code": new TextField(32, 2, true)
  }
);

const TRR = new MultiRecordFile({
  "R": rover,
  "P": price
}, 0);

export default TRR;