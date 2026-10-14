import * as chai from "chai";
import { expect } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { TABLE_TO_FILE_MAPPING } from "@cli/BaseImportFeedCommand";
import { SnowflakeImportFeedCommand } from "@cli/SnowflakeImportFeedCommand";
import { DatabaseConnection } from "@database/DatabaseConnection";
import { FeedConfig } from "@feed/FeedConfig";
import mysql from "@config/fares/mysql";
import snowflake from "@config/fares/snowflake";

chai.use(sinonChai);

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

  describe("run with --tables", () => {
    let tmpFolder: string;
    let command: SnowflakeImportFeedCommand;
    let doImport: sinon.SinonStub;

    beforeEach(async () => {
      tmpFolder = await fs.promises.mkdtemp(path.join(os.tmpdir(), "dtd-test-"));
      const db = { end: sinon.stub().resolves() } as unknown as DatabaseConnection;
      command = new SnowflakeImportFeedCommand(db, snowflake, tmpFolder);
      doImport = sinon.stub(command, "doImport").resolves();
    });

    afterEach(async () => {
      sinon.restore();
      await fs.promises.rm(tmpFolder, { recursive: true, force: true });
    });

    it("imports the files for known table names", async () => {
      await command.run(["node", "index.ts", "--fares", "fares.zip", "--tables", "TICKET_JOURNEY_STATUS", "flow", "fare"]);

      expect(doImport).to.have.been.calledOnceWith("fares.zip", ["TJS", "FFL"], ["ticket_journey_status", "flow", "fare"]);
    });

    it("rejects unknown table names without importing anything", async () => {
      let error: Error | undefined;

      try {
        await command.run(["node", "index.ts", "--fares", "fares.zip", "--tables", "flow", "not_a_table", "ticket_journey"]);
      } catch (err) {
        error = err;
      }

      expect(error?.message).to.contain("Unknown table name(s): not_a_table, ticket_journey");
      expect(doImport).not.to.have.been.called;
    });
  });

});
