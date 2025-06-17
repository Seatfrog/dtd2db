import {CSVRecord} from "@feed/record/mysql/CSVRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const node = new CSVRecord(
  "routeing_node",
  ["node"],
  {
    "node": new TextField(0, 3),
  }
);

const RGN = new SingleRecordFile(node);

export default RGN;