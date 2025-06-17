import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";
import {IntField} from "@feed/field/IntField";
import {DateField} from "@feed/field/DateField";
import {RecordAction} from "@feed/record/Record";
import {BooleanField} from "@feed/field/BooleanField";

const record = new FixedWidthRecord(
  "toc_specific_ticket",
  ["ticket_code", "restriction_code", "restriction_flag", "direction", "toc_id", "toc_type", "end_date"],
  {
    "ticket_code": new TextField(0, 3, true),
    "restriction_code": new TextField(3, 2, true),
    "restriction_flag": new TextField(5, 1, true),
    "direction": new TextField(6, 1, true),
    "toc_id": new TextField(7, 2, true),
    "toc_type": new TextField(9, 1, true),
    "end_date": new DateField(10, true),
    "start_date": new DateField(18, true),
    "sleeper_mkr": new BooleanField(26, true),
    "inc_exc_stock": new TextField(27, 1, true),
    "stock_list": new TextField(28, 40, true)
  }
);

const TSP = new SingleRecordFile(record);

export default TSP;