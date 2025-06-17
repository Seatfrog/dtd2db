import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const nonDerivableFareFixedWidthRecord = new SnowflakeFixedWidthRecord(
  "non_derivable_fare",
  ["origin_code", "destination_code", "route_code", "railcard_code", "ticket_code", "nd_record_type", "end_date"],
  {
    "origin_code": new TrimmedTextField(1, 4, true),
    "destination_code": new TrimmedTextField(5, 4, true),
    "route_code": new TrimmedTextField(9, 5, true),
    "railcard_code": new TrimmedTextField(14, 3, true, []),
    "ticket_code": new TrimmedTextField(17, 3, true),
    "nd_record_type": new TrimmedTextField(20, 1, true),
    "end_date": new TrimmedTextField(21, 8, true),
    "start_date": new TrimmedTextField(29, 8, true),
    "quote_date": new TrimmedTextField(37, 8, true),
    "suppress_mkr": new TrimmedTextField(45, 1, true),
    "adult_fare": new TrimmedTextField(46, 8, true),
    "child_fare": new TrimmedTextField(54, 8, true),
    "restriction_code": new TrimmedTextField(62, 2, true),
    "composite_indicator": new TrimmedTextField(64, 1, true),
    "cross_london_ind": new TrimmedTextField(65, 1, true),
    "ps_ind": new TrimmedTextField(66, 1, true)
  }
);

const NDF = new SingleRecordFile(nonDerivableFareFixedWidthRecord);

export default NDF; 