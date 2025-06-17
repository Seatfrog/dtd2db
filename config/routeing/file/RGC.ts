import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";
import {BooleanField} from "@feed/field/BooleanField";
import {CSVRecord} from "@feed/record/mysql/CSVRecord";

const record = new CSVRecord(
  "london_station",
  ["crs_code"],
  {
    "crs_code": new TextField(0, 3),
    "lt_marker": new BooleanField(1),
    "xlondon_marker": new BooleanField(2)
  }
);

const RGC = new SingleRecordFile(record);

export default RGC;