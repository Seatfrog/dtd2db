import {FixedWidthRecord} from "../../../src/feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "../../../src/feed/file/SingleRecordFile";
import {TextField} from "../../../src/feed/field/TextField";
import {IntField} from "../../../src/feed/field/IntField";
import {DateField} from "../../../src/feed/field/DateField";
import {BooleanField} from "../../../src/feed/field/BooleanField";
import {RecordAction} from "../../../src/feed/record/Record";

const ticketValidity = new FixedWidthRecord(
  "ticket_validity",
  ["validity_code", "end_date"],
  {
    "validity_code": new TextField(0, 2, true),
    "end_date": new DateField(2, true),
    "start_date": new DateField(10, true),
    "description": new TextField(18, 20, true),
    "out_days": new IntField(38, 2, true),
    "out_months": new IntField(40, 2, true),
    "ret_days": new IntField(42, 2, true),
    "ret_months": new IntField(44, 2, true),
    "ret_after_days": new IntField(46, 2, true),
    "ret_after_months": new IntField(48, 2, true),
    "ret_after_day": new TextField(50, 2, true),
    "break_out": new BooleanField(52, true),
    "break_in": new BooleanField(53, true),
    "out_description": new TextField(54, 14, true),
    "rtn_description": new TextField(68, 14, true)
  }
);

const TVL = new SingleRecordFile(ticketValidity);

export default TVL;
