import {CSVRecord} from "@feed/record/mysql/CSVRecord";
import {SingleRecordFile} from "@feed/file/SingleRecordFile";
import {TextField} from "@feed/field/TextField";

const stationGroup = new CSVRecord(
  "station_group",
  ["station_group_id"],
  {
    "station_group_id": new TextField(0, 3),
    "main_station": new TextField(1, 3),
  }
);

const RGG = new SingleRecordFile(stationGroup);

export default RGG;