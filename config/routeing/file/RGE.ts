import {CSVRecord} from "@feed/record/mysql/CSVRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField, VariableLengthText} from "@feed/field/TextField";
import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";

const record = new FixedWidthRecord(
  "easement_text",
  ["text_ref"],
  {
    "text_ref": new TextField(0, 6),
    "easement_text": new VariableLengthText(7, 2000)
  }
);

const RGE = new SingleRecordFile(record);

export default RGE;