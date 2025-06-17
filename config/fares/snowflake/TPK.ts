import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile} from "@feed/file/MultiRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";

const pkg = new SnowflakeFixedWidthRecord(
  "package",
  ["package_code", "end_date"],
  {
    "package_code": new TrimmedTextField(1, 3, true),
    "end_date": new TrimmedTextField(4, 8, true),
    "start_date": new TrimmedTextField(12, 8, true),
    "quote_date": new TrimmedTextField(20, 8, true),
    "restriction_code": new TrimmedTextField(28, 2, true),
    "origin_facilities": new TrimmedTextField(30, 26, true),
    "destination_facilities": new TrimmedTextField(56, 26, true)
  }
);

const supplement = new SnowflakeFixedWidthRecord(
  "package_supplement",
  ["package_code", "end_date", "supplement_code"],
  {
    "package_code": new TrimmedTextField(1, 3, true),
    "end_date": new TrimmedTextField(4, 8, true),
    "supplement_code": new TrimmedTextField(12, 3, true),
    "direction": new TrimmedTextField(15, 1, true),
    "pack_number": new TrimmedTextField(16, 3, true),
    "origin_facility": new TrimmedTextField(19, 1, true),
    "dest_facility": new TrimmedTextField(20, 1, true)
  }
);

const TPK = new MultiRecordFile({
  "P": pkg,
  "S": supplement
}, 0);

export default TPK; 