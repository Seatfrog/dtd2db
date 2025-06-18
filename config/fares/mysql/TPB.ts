import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const record = new FixedWidthRecord(
  "ticket_price_band",
  ["price_band_code", "end_date"],
  {
    "price_band_code": new TextField(0, 3),
    "end_date": new TextField(3, 3)
  }
);

const TPB = new SingleRecordFile(record);

export default TPB; 