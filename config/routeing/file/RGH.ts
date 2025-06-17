import {CSVRecord} from "@feed/record/mysql/CSVRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const record = new CSVRecord(
  "easement_toc",
  ["text_ref", "toc"],
  {
    "text_ref": new TextField(0, 6),
    "toc": new TextField(1, 2),
  }
);

const RGH = new SingleRecordFile(record);

export default RGH;