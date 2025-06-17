import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const record = new SnowflakeFixedWidthRecord(
  "toc_specific_ticket",
  ["ticket_code", "restriction_code", "restriction_flag", "direction", "toc_id", "toc_type", "end_date"],
  {
    "ticket_code": new TrimmedTextField(0, 3, true),
    "restriction_code": new TrimmedTextField(3, 2, true),
    "restriction_flag": new TrimmedTextField(5, 1, true),
    "direction": new TrimmedTextField(6, 1, true),
    "toc_id": new TrimmedTextField(7, 2, true),
    "toc_type": new TrimmedTextField(9, 1, true),
    "end_date": new TrimmedTextField(10, 8, true),
    "start_date": new TrimmedTextField(18, 8, true),
    "sleeper_mkr": new TrimmedTextField(26, 1, true),
    "inc_exc_stock": new TrimmedTextField(27, 1, true),
    "stock_list": new TrimmedTextField(28, 40, true)
  }
);

const TSP = new SingleRecordFile(record);

export default TSP; 