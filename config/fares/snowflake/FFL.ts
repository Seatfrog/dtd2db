import {TrimmedTextField} from "@feed/field/TextField";
import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile} from "@feed/file/MultiRecordFile";
import {RecordAction} from "@feed/record/Record";

const flowFixedWidthRecord = new SnowflakeFixedWidthRecord(
  "flow",
  ["origin_code", "destination_code", "route_code", "status_code", "usage_code", "direction", "end_date"],
  {
    "origin_code": new TrimmedTextField(2, 4, true),
    "destination_code": new TrimmedTextField(6, 4, true),
    "route_code": new TrimmedTextField(10, 5, true),
    "status_code": new TrimmedTextField(15, 3, true),
    "usage_code": new TrimmedTextField(18, 1, true),
    "direction": new TrimmedTextField(19, 1, true),
    "end_date": new TrimmedTextField(20, 8, true),
    "start_date": new TrimmedTextField(28, 8, true),
    "toc": new TrimmedTextField(36, 3, true),
    "cross_london_ind": new TrimmedTextField(39, 1, true),
    "ns_disc_ind": new TrimmedTextField(40, 1, true),
    "publication_ind": new TrimmedTextField(41, 1, true),
    "flow_id": new TrimmedTextField(42, 7, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const fareFixedWidthRecord = new SnowflakeFixedWidthRecord(
  "fare",
  ["flow_id", "ticket_code"],
  {
    "flow_id": new TrimmedTextField(2, 7, true),
    "ticket_code": new TrimmedTextField(9, 3, true),
    "fare": new TrimmedTextField(12, 8, true),
    "restriction_code": new TrimmedTextField(20, 2, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const FFL = new MultiRecordFile({
  "F": flowFixedWidthRecord,
  "T": fareFixedWidthRecord
});

export default FFL; 