import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile, RecordTypeMap} from "@feed/file/MultiRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const route = new SnowflakeFixedWidthRecord(
  "route",
  ["route_code", "end_date"],
  {
    "route_code": new TrimmedTextField(2, 5, true),
    "end_date": new TrimmedTextField(7, 8, true),
    "start_date": new TrimmedTextField(15, 8, true),
    "quote_date": new TrimmedTextField(23, 8, true),
    "description": new TrimmedTextField(31, 16, true),
    "atb_desc_1": new TrimmedTextField(47, 35, true),
    "atb_desc_2": new TrimmedTextField(82, 35, true),
    "atb_desc_3": new TrimmedTextField(117, 35, true),
    "atb_desc_4": new TrimmedTextField(152, 35, true),
    "cc_desc": new TrimmedTextField(187, 16, true),
    "aaa_desc": new TrimmedTextField(203, 41, true),
    "uts_mode": new TrimmedTextField(244, 1, true),
    "uts_zone_1": new TrimmedTextField(245, 1, true),
    "uts_zone_2": new TrimmedTextField(246, 1, true),
    "uts_zone_3": new TrimmedTextField(247, 1, true),
    "uts_zone_4": new TrimmedTextField(248, 1, true),
    "uts_zone_5": new TrimmedTextField(249, 1, true),
    "uts_zone_6": new TrimmedTextField(250, 1, true),
    "uts_north": new TrimmedTextField(251, 3, true),
    "uts_east": new TrimmedTextField(254, 3, true),
    "uts_south": new TrimmedTextField(257, 3, true),
    "uts_west": new TrimmedTextField(260, 3, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const location = new SnowflakeFixedWidthRecord(
  "route_location",
  ["route_code", "end_date", "admin_area_code", "nlc_code"],
  {
    "route_code": new TrimmedTextField(2, 5, true),
    "end_date": new TrimmedTextField(7, 8, true),
    "admin_area_code": new TrimmedTextField(15, 3, true),
    "nlc_code": new TrimmedTextField(18, 4, true),
    "crs_code": new TrimmedTextField(22, 3, true),
    "incl_excl": new TrimmedTextField(25, 1, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const RTE = new MultiRecordFile({
  "R": route,
  "L": location
});

export default RTE; 