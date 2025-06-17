import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const clusterFixedWidthRecord = new SnowflakeFixedWidthRecord(
  "station_cluster",
  ["cluster_id", "cluster_nlc", "end_date"],
  {
    "cluster_id": new TrimmedTextField(1, 4, true),
    "cluster_nlc": new TrimmedTextField(5, 4, true),
    "end_date": new TrimmedTextField(9, 8, true),
    "start_date": new TrimmedTextField(17, 8, true)
  },
  ["cluster_nlc"],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const FSC = new SingleRecordFile(clusterFixedWidthRecord);

export default FSC; 