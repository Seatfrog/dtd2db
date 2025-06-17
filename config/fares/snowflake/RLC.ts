import {SnowflakeFixedWidthRecord} from "@feed/record/snowflake/FixedWidthRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TrimmedTextField} from "@feed/field/TextField";
import {RecordAction} from "@feed/record/Record";

const record = new SnowflakeFixedWidthRecord(
  "railcard",
  ["railcard_code", "end_date"],
  {
    "railcard_code": new TrimmedTextField(0, 3, true),
    "end_date": new TrimmedTextField(3, 8, true),
    "start_date": new TrimmedTextField(11, 8, true),
    "quote_date": new TrimmedTextField(19, 8, true),
    "holder_type": new TrimmedTextField(27, 1, true),
    "description": new TrimmedTextField(28, 20, true),
    "restricted_by_issue": new TrimmedTextField(48, 1, true),
    "restricted_by_area": new TrimmedTextField(49, 1, true),
    "restricted_by_train": new TrimmedTextField(50, 1, true),
    "restricted_by_date": new TrimmedTextField(51, 1, true),
    "master_code": new TrimmedTextField(52, 3, true),
    "display_flag": new TrimmedTextField(55, 1, true),
    "max_passengers": new TrimmedTextField(56, 3, true),
    "min_passengers": new TrimmedTextField(59, 3, true),
    "max_holders": new TrimmedTextField(62, 3, true),
    "min_holders": new TrimmedTextField(65, 3, true),
    "max_acc_adults": new TrimmedTextField(68, 3, true),
    "min_acc_adults": new TrimmedTextField(71, 3, true),
    "max_adults": new TrimmedTextField(74, 3, true),
    "min_adults": new TrimmedTextField(77, 3, true),
    "max_children": new TrimmedTextField(80, 3, true),
    "min_children": new TrimmedTextField(83, 3, true),
    "price": new TrimmedTextField(86, 8, true),
    "discount_price": new TrimmedTextField(94, 8, true),
    "validity_period": new TrimmedTextField(102, 4, true),
    "last_valid_date": new TrimmedTextField(106, 8, true),
    "physical_card": new TrimmedTextField(114, 1, true),
    "capri_ticket_type": new TrimmedTextField(115, 3, true),
    "adult_status": new TrimmedTextField(118, 3, true),
    "child_status": new TrimmedTextField(121, 3, true),
    "aaa_status": new TrimmedTextField(124, 3, true)
  }
);

const RLC = new SingleRecordFile(record);

export default RLC; 