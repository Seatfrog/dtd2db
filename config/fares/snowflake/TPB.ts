import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const record = new SnowflakeFixedWidthRecord(
  "ticket_price_band",
  ["price_band_code", "end_date"],
  {
    "price_band_code": new TrimmedTextField(0, 3, true),
    "end_date": new TrimmedTextField(3, 3, true)
  }
);

const TPB = new SingleRecordFile(record);

export default TPB; 