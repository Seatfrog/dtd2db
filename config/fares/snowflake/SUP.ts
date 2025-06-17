import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile, RecordTypeMap} from "@feed/file/MultiRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const supplement = new SnowflakeFixedWidthRecord(
  "supplement",
  ["supplement_code", "end_date"],
  {
    "supplement_code": new TrimmedTextField(2, 3, true),
    "end_date": new TrimmedTextField(5, 8, true),
    "start_date": new TrimmedTextField(13, 8, true),
    "quote_date": new TrimmedTextField(21, 8, true),
    "description": new TrimmedTextField(29, 20, true),
    "short_desc": new TrimmedTextField(49, 12, true),
    "suppl_type": new TrimmedTextField(61, 3, true),
    "price": new TrimmedTextField(64, 5, true),
    "cpf_ticket_type": new TrimmedTextField(69, 5, true),
    "min_group_size": new TrimmedTextField(74, 1, true),
    "max_group_size": new TrimmedTextField(75, 1, true),
    "per_leg_or_dir": new TrimmedTextField(76, 1, true),
    "class_type": new TrimmedTextField(77, 1, true),
    "capri_code": new TrimmedTextField(78, 3, true),
    "sep_tkt_ind": new TrimmedTextField(81, 1, true),
    "resvn_type": new TrimmedTextField(82, 2, true),
    "sundry_code": new TrimmedTextField(84, 5, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const supplementRule = new SnowflakeFixedWidthRecord(
  "supplement_rule",
  ["rule_number", "end_date"],
  {
    "rule_number": new TrimmedTextField(2, 3, false),
    "end_date": new TrimmedTextField(5, 8, false),
    "start_date": new TrimmedTextField(13, 8, false),
    "quote_date": new TrimmedTextField(21, 8, false),
    "train_uid": new TrimmedTextField(29, 7, true),
    "train_uid_desc": new TrimmedTextField(36, 39, true),
    "fare_class": new TrimmedTextField(75, 1, false),
    "quota": new TrimmedTextField(76, 1, false),
    "weekend_first": new TrimmedTextField(77, 1, false),
    "silver_standard": new TrimmedTextField(78, 1, false),
    "railcard": new TrimmedTextField(79, 1, false),
    "catering_code": new TrimmedTextField(80, 1, false),
    "sleeper": new TrimmedTextField(81, 1, false),
    "accom_class": new TrimmedTextField(82, 1, false),
    "status": new TrimmedTextField(83, 1, false),
    "reservation_status": new TrimmedTextField(84, 3, true),
    "sectors": new TrimmedTextField(87, 3, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const supplementRuleApplies = new SnowflakeFixedWidthRecord(
  "supplement_rule_applies",
  ["rule_number", "end_date", "ie_marker", "condition_type", "ie_code"],
  {
    "rule_number": new TrimmedTextField(2, 3, false),
    "end_date": new TrimmedTextField(5, 8, false),
    "ie_marker": new TrimmedTextField(13, 1, false),
    "condition_type": new TrimmedTextField(14, 1, false),
    "ie_code": new TrimmedTextField(15, 3, false)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const supplementRuleSupplement = new SnowflakeFixedWidthRecord(
  "supplement_rule_supplement",
  ["rule_number", "end_date", "supplement_code"],
  {
    "rule_number": new TrimmedTextField(2, 3, false),
    "end_date": new TrimmedTextField(5, 8, false),
    "supplement_code": new TrimmedTextField(13, 3, false),
    "om_flag": new TrimmedTextField(16, 1, false)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const supplementOverride = new SnowflakeFixedWidthRecord(
  "supplement_override",
  ["supplement_code", "end_date", "overridden_supplement"],
  {
    "supplement_code": new TrimmedTextField(2, 3, false),
    "end_date": new TrimmedTextField(5, 8, false),
    "overridden_supplement": new TrimmedTextField(13, 3, false)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const SUP = new MultiRecordFile({
  "S": supplement,
  "R": supplementRule,
  "A": supplementRuleApplies,
  "M": supplementRuleSupplement,
  "O": supplementOverride
});

export default SUP; 