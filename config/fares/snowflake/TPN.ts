import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const record = new SnowflakeFixedWidthRecord(
  "ticket_price_network",
  ["network_code", "end_date"],
  {
    "network_code": new TrimmedTextField(0, 6, true),
    "end_date": new TrimmedTextField(6, 8, true),
    "start_date": new TrimmedTextField(14, 8, true),
    "network_type": new TrimmedTextField(22, 1, true)
  }
);

const TPN = new SingleRecordFile(record);

export default TPN; 