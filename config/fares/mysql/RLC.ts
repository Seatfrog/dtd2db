import {FixedWidthRecord} from "../../../src/feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "../../../src/feed/file/SingleRecordFile";
import {TextField} from "../../../src/feed/field/TextField";
import {DateField} from "../../../src/feed/field/DateField";
import {IntField} from "../../../src/feed/field/IntField";
import {BooleanField} from "../../../src/feed/field/BooleanField";
import {RecordAction} from "../../../src/feed/record/Record";

const record = new FixedWidthRecord(
  "railcard",
  ["railcard_code", "end_date"],
  {
    "railcard_code": new TextField(0, 3, true,  []),
    "end_date": new DateField(3, true),
    "start_date": new DateField(11, true),
    "quote_date": new DateField(19, true),
    "holder_type": new TextField(27, 1, true),
    "description": new TextField(28, 20, true),
    "restricted_by_issue": new BooleanField(48, true),
    "restricted_by_area": new BooleanField(49, true),
    "restricted_by_train": new BooleanField(50, true),
    "restricted_by_date": new BooleanField(51, true),
    "master_code": new TextField(52, 3, true),
    "display_flag": new TextField(55, 1, true),
    "max_passengers": new IntField(56, 3, true, []),
    "min_passengers": new IntField(59, 3, true, []),
    "max_holders": new IntField(62, 3, true, []),
    "min_holders": new IntField(65, 3, true, []),
    "max_acc_adults": new IntField(68, 3, true, []),
    "min_acc_adults": new IntField(71, 3, true, []),
    "max_adults": new IntField(74, 3, true, []),
    "min_adults": new IntField(77, 3, true, []),
    "max_children": new IntField(80, 3, true, []),
    "min_children": new IntField(83, 3, true, []),
    "price": new IntField(86, 8, true),
    "discount_price": new IntField(94, 8, true),
    "validity_period": new TextField(102, 4, true),
    "last_valid_date": new DateField(106, true),
    "physical_card": new BooleanField(114, true),
    "capri_ticket_type": new TextField(115, 3, true),
    "adult_status": new TextField(118, 3, true, [" ", "X"]),
    "child_status": new TextField(121, 3, true, [" ", "X"]),
    "aaa_status": new TextField(124, 3, true)
  }
);

const RLC = new SingleRecordFile(record);

export default RLC;