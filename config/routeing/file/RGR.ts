import {CSVRecord} from "@feed/record/mysql/CSVRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField, VariableLengthText} from "@feed/field/TextField";
import {FixedWidthRecord} from "@feed/record/mysql/FixedWidthRecord";

const record = new FixedWidthRecord(
  "permitted_route",
  [],
  {
    "start_routeing_point": new TextField(0, 3),
    "end_routeing_point": new TextField(4, 3),
    "map_code": new VariableLengthText(8, 150)
  }
);

const RGR = new SingleRecordFile(record);

export default RGR;