import {FixedWidthRecord} from "../../../src/feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "../../../src/feed/file/SingleRecordFile";
import {TextField} from "../../../src/feed/field/TextField";

const record = new FixedWidthRecord(
  "fare_route_restriction",
  ["restriction_code", "end_date"],
  {
    "restriction_code": new TextField(0, 2),
    "end_date": new TextField(2, 8),
    "start_date": new TextField(10, 8),
    "route_code": new TextField(18, 5),
    "direction": new TextField(23, 1),
    "restriction_type": new TextField(24, 1),
    "restriction_value": new TextField(25, 7)
  }
);

const FRR = new SingleRecordFile(record);

export default FRR; 