import {CSVRecord} from "@feed/record/mysql/CSVRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const routeingPoint = new CSVRecord(
  "routeing_point",
  ["routeing_point"],
  {
    "routeing_point": new TextField(0, 3)
  }
);

const RGP = new SingleRecordFile(routeingPoint);

export default RGP;