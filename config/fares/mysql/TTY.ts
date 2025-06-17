import {FixedWidthRecord} from "../../../src/feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "../../../src/feed/file/SingleRecordFile";
import {TextField} from "../../../src/feed/field/TextField";
import {DateField} from "../../../src/feed/field/DateField";
import {IntField} from "../../../src/feed/field/IntField";
import {BooleanField} from "../../../src/feed/field/BooleanField";
import {RecordAction} from "../../../src/feed/record/Record";

const ticketTypeFixedWidthRecord = new FixedWidthRecord(
  "ticket_type",
  ["ticket_code", "end_date"],
  {
    "ticket_code": new TextField(1, 3, true),
    "end_date": new DateField(4, true),
    "start_date": new DateField(12, true),
    "quote_date": new DateField(20, true),
    "description": new TextField(28, 15, true),
    "tkt_class": new IntField(43, 1, true, []),
    "tkt_type": new TextField(44, 1, true),
    "tkt_group": new TextField(45, 1, true),
    "last_valid_day": new DateField(46, true),
    "max_passengers": new IntField(54, 3, true, []),
    "min_passengers": new IntField(57, 3, true, []),
    "max_adults": new IntField(60, 3, true, []),
    "min_adults": new IntField(63, 3, true, []),
    "max_children": new IntField(66, 3, true, []),
    "min_children": new IntField(69, 3, true, []),
    "restricted_by_date": new BooleanField(72, true),
    "restricted_by_train": new BooleanField(73, true),
    "restricted_by_area": new BooleanField(74, true),
    "validity_code": new TextField(75, 2, true),
    "atb_description": new TextField(77, 20, true),
    "lul_xlondon_issue": new IntField(97, 1, true),
    "reservation_required": new TextField(98, 1, true),
    "capri_code": new TextField(99, 3, true),
    "lul_93": new BooleanField(102, true),
    "uts_code": new TextField(103, 2, true),
    "time_restriction": new IntField(105, 1, true),
    "free_pass_lul": new BooleanField(106, true),
    "package_mkr": new TextField(107, 1, true),
    "fare_multiplier": new IntField(108, 3, true),
    "discount_category": new IntField(111, 2, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const TTY = new SingleRecordFile(ticketTypeFixedWidthRecord);

export default TTY;