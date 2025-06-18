import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const record = new FixedWidthRecord(
  "ticket_price_network",
  ["network_code", "end_date"],
  {
    "network_code": new TextField(0, 6),
    "end_date": new TextField(6, 8),
    "start_date": new TextField(14, 8),
    "network_type": new TextField(22, 1)
  }
);

const TPN = new SingleRecordFile(record);

export default TPN; 