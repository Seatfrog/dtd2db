import { SnowflakeFixedWidthRecord } from '@feed/record/snowflake/FixedWidthRecord';
import { MultiRecordFile, RecordTypeMap } from '@feed/file/MultiRecordFile';
import { TrimmedTextField } from '@feed/field/TextField';
import { RecordAction } from '@feed/record/Record';

const location = new SnowflakeFixedWidthRecord(
  "location",
  ["uic", "end_date", "start_date"],
  {
    "uic": new TrimmedTextField(2, 7, true),
    "end_date": new TrimmedTextField(9, 8, true),
    "start_date": new TrimmedTextField(17, 8, true),
    "quote_date": new TrimmedTextField(25, 8, true),
    "area_admin_code": new TrimmedTextField(34, 2, true),
    "nlc": new TrimmedTextField(36, 4, true),
    "description": new TrimmedTextField(40, 16, true),
    "crs": new TrimmedTextField(56, 3, true),
    "resv": new TrimmedTextField(59, 5, true),
    "ers_country": new TrimmedTextField(64, 2, true),
    "ers_code": new TrimmedTextField(66, 3, true),
    "fare_group": new TrimmedTextField(69, 6, true),
    "county": new TrimmedTextField(75, 2, true),
    "pte_code": new TrimmedTextField(77, 2, true),
    "zone_no": new TrimmedTextField(79, 4, true),
    "zone_ind": new TrimmedTextField(83, 2, true),
    "region": new TrimmedTextField(85, 1, true),
    "hierarchy": new TrimmedTextField(86, 1, true),
    "cc_desc_out": new TrimmedTextField(87, 41, true),
    "cc_desc_rtn": new TrimmedTextField(128, 16, true),
    "atb_desc_out": new TrimmedTextField(144, 60, true),
    "atb_desc_rtn": new TrimmedTextField(204, 30, true),
    "special_facilities": new TrimmedTextField(234, 26, true),
    "lul_direction_ind": new TrimmedTextField(260, 1, true),
    "lul_uts_mode": new TrimmedTextField(261, 1, true),
    "lul_zone_1": new TrimmedTextField(262, 1, true),
    "lul_zone_2": new TrimmedTextField(263, 1, true),
    "lul_zone_3": new TrimmedTextField(264, 1, true),
    "lul_zone_4": new TrimmedTextField(265, 1, true),
    "lul_zone_5": new TrimmedTextField(266, 1, true),
    "lul_zone_6": new TrimmedTextField(267, 1, true),
    "lul_uts_london_stn": new TrimmedTextField(268, 1, true),
    "uts_code": new TrimmedTextField(269, 3, true),
    "uts_a_code": new TrimmedTextField(272, 3, true),
    "uts_ptr_bias": new TrimmedTextField(275, 1, true),
    "uts_offset": new TrimmedTextField(276, 1, true),
    "uts_north": new TrimmedTextField(277, 3, true),
    "uts_east": new TrimmedTextField(280, 3, true),
    "uts_south": new TrimmedTextField(283, 3, true),
    "uts_west": new TrimmedTextField(286, 3, true)
  },
  ["nlc"],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const association = new SnowflakeFixedWidthRecord(
  "location_association",
  ["uic_code", "end_date", "assoc_uic_code"],
  {
    "uic_code": new TrimmedTextField(2, 7, true),
    "end_date": new TrimmedTextField(9, 8, true),
    "assoc_uic_code": new TrimmedTextField(17, 7, true),
    "assoc_crs_code": new TrimmedTextField(24, 3, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const railcard = new SnowflakeFixedWidthRecord(
  "location_railcard",
  ["uic_code", "railcard_code", "end_date"],
  {
    "uic_code": new TrimmedTextField(2, 7, true),
    "railcard_code": new TrimmedTextField(9, 3, true),
    "end_date": new TrimmedTextField(12, 8, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const group = new SnowflakeFixedWidthRecord(
  "location_group",
  ["group_uic_code", "end_date"],
  {
    "group_uic_code": new TrimmedTextField(2, 7, true),
    "end_date": new TrimmedTextField(9, 8, true),
    "start_date": new TrimmedTextField(17, 8, true),
    "quote_date": new TrimmedTextField(25, 8, true),
    "description": new TrimmedTextField(33, 16, true),
    "ers_country": new TrimmedTextField(49, 2, true),
    "ers_code": new TrimmedTextField(51, 3, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const groupMember = new SnowflakeFixedWidthRecord(
  "location_group_member",
  ["group_uic_code", "end_date", "member_uic_code"],
  {
    "group_uic_code": new TrimmedTextField(2, 7, true),
    "end_date": new TrimmedTextField(9, 8, true),
    "member_uic_code": new TrimmedTextField(17, 7, true),
    "member_crs_code": new TrimmedTextField(24, 3, true)
  },
  ["member_uic_code"],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const synonym = new SnowflakeFixedWidthRecord(
  "location_synonym",
  ["uic_code", "end_date", "start_date", "description"],
  {
    "uic_code": new TrimmedTextField(2, 7, true),
    "end_date": new TrimmedTextField(9, 8, true),
    "start_date": new TrimmedTextField(17, 8, true),
    "description": new TrimmedTextField(25, 16, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const LOC = new MultiRecordFile({
  "L": location,
  "A": association,
  "G": group,
  "M": groupMember,
  "S": synonym,
  "R": railcard
});

export default LOC; 