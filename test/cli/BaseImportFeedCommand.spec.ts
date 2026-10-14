import { expect } from "chai";
import { TABLE_TO_FILE_MAPPING } from "@cli/BaseImportFeedCommand";
import { FeedConfig } from "@feed/FeedConfig";
import mysql from "@config/fares/mysql";
import snowflake from "@config/fares/snowflake";

describe("BaseImportFeedCommand", () => {

  describe("TABLE_TO_FILE_MAPPING", () => {
    const configs: [string, FeedConfig][] = [["mysql", mysql], ["snowflake", snowflake]];

    for (const [dbType, config] of configs) {
      it(`maps every ${dbType} fares record to the file that defines it`, () => {
        for (const [fileType, file] of Object.entries(config)) {
          for (const record of file.recordTypes) {
            expect(TABLE_TO_FILE_MAPPING[record.name], record.name).to.equal(fileType);
          }
        }
      });
    }
  });

});
