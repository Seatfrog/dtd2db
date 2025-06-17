import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {MultiRecordFile, RecordTypeMap} from "@feed/file/MultiRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const dates = new SnowflakeFixedWidthRecord(
  "restriction_date",
  ["cf_mkr"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "start_date": new TrimmedTextField(4, 8, true),
    "end_date": new TrimmedTextField(12, 8, true),
    "atb_desc": new TrimmedTextField(20, 5, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const header = new SnowflakeFixedWidthRecord(
  "restriction_header",
  ["cf_mkr", "restriction_code"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "description": new TrimmedTextField(6, 30, true),
    "desc_out": new TrimmedTextField(36, 50, true),
    "desc_ret": new TrimmedTextField(86, 50, true),
    "type_out": new TrimmedTextField(136, 1, true),
    "type_ret": new TrimmedTextField(137, 1, true),
    "change_ind": new TrimmedTextField(138, 1, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const headerDate = new SnowflakeFixedWidthRecord(
  "restriction_header_date",
  ["cf_mkr", "restriction_code", "date_from", "date_to"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "date_from": new TrimmedTextField(6, 4, true),
    "date_to": new TrimmedTextField(10, 4, true),
    "monday": new TrimmedTextField(14, 1, true),
    "tuesday": new TrimmedTextField(15, 1, true),
    "wednesday": new TrimmedTextField(16, 1, true),
    "thursday": new TrimmedTextField(17, 1, true),
    "friday": new TrimmedTextField(18, 1, true),
    "saturday": new TrimmedTextField(19, 1, true),
    "sunday": new TrimmedTextField(20, 1, true),
    "start_date": new TrimmedTextField(21, 8, true),
    "end_date": new TrimmedTextField(25, 8, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const time = new SnowflakeFixedWidthRecord(
  "restriction_time",
  ["cf_mkr", "restriction_code", "sequence_no", "out_ret"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "sequence_no": new TrimmedTextField(6, 4, true),
    "out_ret": new TrimmedTextField(10, 1, true),
    "time_from": new TrimmedTextField(11, 4, true),
    "time_to": new TrimmedTextField(15, 4, true),
    "arr_dep_via": new TrimmedTextField(19, 1, true),
    "location": new TrimmedTextField(20, 3, true),
    "rstr_type": new TrimmedTextField(23, 1, true),
    "train_type": new TrimmedTextField(24, 1, true),
    "min_fare_flag": new TrimmedTextField(25, 1, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const timeDateBand = new SnowflakeFixedWidthRecord(
  "restriction_time_date",
  ["cf_mkr", "restriction_code", "sequence_no", "out_ret", "date_from", "date_to"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "sequence_no": new TrimmedTextField(6, 4, true),
    "out_ret": new TrimmedTextField(10, 1, true),
    "date_from": new TrimmedTextField(11, 4, true),
    "date_to": new TrimmedTextField(15, 4, true),
    "monday": new TrimmedTextField(19, 1, true),
    "tuesday": new TrimmedTextField(20, 1, true),
    "wednesday": new TrimmedTextField(21, 1, true),
    "thursday": new TrimmedTextField(22, 1, true),
    "friday": new TrimmedTextField(23, 1, true),
    "saturday": new TrimmedTextField(24, 1, true),
    "sunday": new TrimmedTextField(25, 1, true),
    "start_date": new TrimmedTextField(26, 8, true),
    "end_date": new TrimmedTextField(30, 8, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const timeToc = new SnowflakeFixedWidthRecord(
  "restriction_time_toc",
  ["cf_mkr", "restriction_code", "sequence_no", "out_ret", "toc_code"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "sequence_no": new TrimmedTextField(6, 4, true),
    "out_ret": new TrimmedTextField(10, 1, true),
    "toc_code": new TrimmedTextField(11, 2, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const train = new SnowflakeFixedWidthRecord(
  "restriction_train",
  ["cf_mkr", "restriction_code", "train_no", "out_ret"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "train_no": new TrimmedTextField(6, 6, true),
    "out_ret": new TrimmedTextField(12, 1, true),
    "quota_ind": new TrimmedTextField(13, 1, true),
    "sleeper_ind": new TrimmedTextField(14, 1, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const trainDate = new SnowflakeFixedWidthRecord(
  "restriction_train_date",
  ["cf_mkr", "restriction_code", "train_no", "out_ret", "date_from", "date_to"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "train_no": new TrimmedTextField(6, 6, true),
    "out_ret": new TrimmedTextField(12, 1, true),
    "date_from": new TrimmedTextField(13, 4, true),
    "date_to": new TrimmedTextField(17, 4, true),
    "monday": new TrimmedTextField(21, 1, true),
    "tuesday": new TrimmedTextField(22, 1, true),
    "wednesday": new TrimmedTextField(23, 1, true),
    "thursday": new TrimmedTextField(24, 1, true),
    "friday": new TrimmedTextField(25, 1, true),
    "saturday": new TrimmedTextField(26, 1, true),
    "sunday": new TrimmedTextField(27, 1, true),
    "start_date": new TrimmedTextField(28, 8, true),
    "end_date": new TrimmedTextField(32, 8, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const trainQuota = new SnowflakeFixedWidthRecord(
  "restriction_train_quota",
  ["cf_mkr", "restriction_code", "train_no", "out_ret", "location", "quota_ind", "arr_dep"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "restriction_code": new TrimmedTextField(4, 2, true),
    "train_no": new TrimmedTextField(6, 6, true),
    "out_ret": new TrimmedTextField(12, 1, true),
    "location": new TrimmedTextField(13, 3, true),
    "quota_ind": new TrimmedTextField(16, 1, true),
    "arr_dep": new TrimmedTextField(17, 1, true)
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
  "restriction_railcard",
  ["cf_mkr", "railcard_code", "sequence_no"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "railcard_code": new TrimmedTextField(4, 3, true),
    "sequence_no": new TrimmedTextField(7, 4, true),
    "ticket_code": new TrimmedTextField(11, 3, true),
    "route_code": new TrimmedTextField(14, 5, true),
    "location": new TrimmedTextField(19, 3, true),
    "restriction_code": new TrimmedTextField(22, 2, true),
    "total_ban": new TrimmedTextField(24, 1, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const exceptionCode = new SnowflakeFixedWidthRecord(
  "restriction_exception",
  ["cf_mkr", "exception_code"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "exception_code": new TrimmedTextField(4, 1, true),
    "description": new TrimmedTextField(5, 50, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const ticketCalendar = new SnowflakeFixedWidthRecord(
  "restriction_ticket_calendar",
  ["cf_mkr", "ticket_code", "cal_type", "route_code", "country_code", "date_from", "date_to"],
  {
    "cf_mkr": new TrimmedTextField(3, 1, true),
    "ticket_code": new TrimmedTextField(4, 3, true),
    "cal_type": new TrimmedTextField(7, 1, true),
    "route_code": new TrimmedTextField(8, 5, true),
    "country_code": new TrimmedTextField(13, 1, true),
    "date_from": new TrimmedTextField(14, 4, true),
    "date_to": new TrimmedTextField(18, 4, true),
    "monday": new TrimmedTextField(22, 1, true),
    "tuesday": new TrimmedTextField(23, 1, true),
    "wednesday": new TrimmedTextField(24, 1, true),
    "thursday": new TrimmedTextField(25, 1, true),
    "friday": new TrimmedTextField(26, 1, true),
    "saturday": new TrimmedTextField(27, 1, true),
    "sunday": new TrimmedTextField(28, 1, true),
    "start_date": new TrimmedTextField(29, 8, true),
    "end_date": new TrimmedTextField(33, 8, true)
  },
  [],
  {
    "I": RecordAction.Insert,
    "A": RecordAction.Update,
    "D": RecordAction.Delete,
    "R": RecordAction.Insert
  }
);

const RST = new MultiRecordFile({
  "RD": dates,
  "RH": header,
  "HD": headerDate,
  "TR": time,
  "TD": timeDateBand,
  "TT": timeToc,
  "SR": train,
  "SD": trainDate,
  "SQ": trainQuota,
  "RR": railcard,
  "EC": exceptionCode,
  "CA": ticketCalendar
}, 1, 2);

export default RST; 