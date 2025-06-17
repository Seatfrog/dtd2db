import {CSVRecord} from "@feed/record/mysql/CSVRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const record = new CSVRecord(
  "map",
  ["map_identifier"],
  {
    "map_identifier": new TextField(0, 2)
  }
);

const RGM = new SingleRecordFile(record);

export default RGM;