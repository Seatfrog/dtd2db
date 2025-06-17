import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile} from "@feed/file/MultiRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const toc = new SnowflakeFixedWidthRecord(
  "toc",
  ["toc_id"],
  {
    "toc_id": new TrimmedTextField(1, 2, true),
    "toc_name": new TrimmedTextField(3, 30, true),
    "active": new TrimmedTextField(41, 1, true)
  }
);

const fare = new SnowflakeFixedWidthRecord(
  "toc_fare",
  ["fare_toc_id", "toc_id"],
  {
    "fare_toc_id": new TrimmedTextField(1, 3, true),
    "toc_id": new TrimmedTextField(4, 2, true),
    "fare_toc_name": new TrimmedTextField(6, 30, true)
  }
);

const TOC = new MultiRecordFile({
  "T": toc,
  "F": fare
}, 0);

export default TOC; 