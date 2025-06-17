import {FixedWidthRecord} from "../../../src/feed/record/mysql/FixedWidthRecord";
import {MultiRecordFile, RecordTypeMap} from "../../../src/feed/file/MultiRecordFile";
import {TextField} from "../../../src/feed/field/TextField";
import {DateField} from "../../../src/feed/field/DateField";
import {BooleanField} from "../../../src/feed/field/BooleanField";
import {RecordAction} from "../../../src/feed/record/Record";

const route = new FixedWidthRecord(
  "route",
  ["route_code", "end_date"],
  {
    "route_code": new TextField(2, 5, true),
    "end_date": new DateField(7, true),
    "start_date": new DateField(15, true),
    "quote_date": new DateField(23, true),
    "description": new TextField(31, 16, true),
    "atb_desc_1": new TextField(47, 35, true),
    "atb_desc_2": new TextField(82, 35, true),
    "atb_desc_3": new TextField(117, 35, true),
    "atb_desc_4": new TextField(152, 35, true),
    "cc_desc": new TextField(187, 16, true),
    "aaa_desc": new TextField(203, 41, true),
    "uts_mode": new TextField(244, 1, true, []),
    "uts_zone_1": new BooleanField(245, true),
    "uts_zone_2": new BooleanField(246, true),
    "uts_zone_3": new BooleanField(247, true),
    "uts_zone_4": new BooleanField(248, true),
    "uts_zone_5": new BooleanField(249, true),
    "uts_zone_6": new BooleanField(250, true),
    "uts_north": new TextField(251, 3, true),
    "uts_east": new TextField(254, 3, true),
    "uts_south": new TextField(257, 3, true),
    "uts_west": new TextField(260, 3, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const location = new FixedWidthRecord(
  "route_location",
  ["route_code", "end_date", "admin_area_code", "nlc_code"],
  {
    "route_code": new TextField(2, 5, true),
    "end_date": new DateField(7, true),
    "admin_area_code": new TextField(15, 3, true),
    "nlc_code": new TextField(18, 4, true),
    "crs_code": new TextField(22, 3, true),
    "incl_excl": new TextField(25, 1, true)
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