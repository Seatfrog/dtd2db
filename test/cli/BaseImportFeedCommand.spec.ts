import * as chai from "chai";
import { expect } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import AdmZip = require("adm-zip");
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

  describe("doImport", () => {
    let zipFolder: string;
    let zipPath: string;
    let tmpFolder: string;
    let command: SnowflakeImportFeedCommand;

    beforeEach(async () => {
      // A zip with a file that has no feed config, so the import extracts it but loads nothing
      zipFolder = await fs.promises.mkdtemp(path.join(os.tmpdir(), "dtd-test-zip-"));
      zipPath = path.join(zipFolder, "RJFAC001.ZIP");
      const zip = new AdmZip();
      zip.addFile("RJFAC001.TXT", Buffer.from("not a feed file\n"));
      zip.writeZip(zipPath);

      tmpFolder = await fs.promises.mkdtemp(path.join(os.tmpdir(), "dtd-test-"));
      const db = { end: sinon.stub().resolves() } as unknown as DatabaseConnection;
      command = new SnowflakeImportFeedCommand(db, snowflake, tmpFolder);
    });

    afterEach(async () => {
      sinon.restore();
      await fs.promises.rm(zipFolder, { recursive: true, force: true });
      await fs.promises.rm(tmpFolder, { recursive: true, force: true });
    });

    it("removes the extraction folder after the import", async () => {
      await command.doImport(zipPath, null);

      expect(fs.existsSync(tmpFolder)).to.be.false;
    });

    it("removes the extraction folder after a failed import", async () => {
      let error: Error | undefined;

      try {
        await command.doImport(path.join(zipFolder, "missing.zip"), null);
      } catch (err) {
        error = err;
      }

      expect(error).to.exist;
      expect(fs.existsSync(tmpFolder)).to.be.false;
    });

    it("only processes the files of the current zip when one command imports several zips", async () => {
      const firstZip = new AdmZip();
      firstZip.addFile("RJFAF001.TOC", Buffer.from("/!! Start of file\n"));
      firstZip.writeZip(path.join(zipFolder, "RJFAF001.ZIP"));
      const secondZip = new AdmZip();
      secondZip.addFile("RJFAF002.TOC", Buffer.from("/!! Start of file\n"));
      secondZip.writeZip(path.join(zipFolder, "RJFAF002.ZIP"));

      sinon.stub(command as any, "setupSchema").resolves();
      const processFile = sinon.stub(command as any, "processFile").resolves();

      await command.doImport(path.join(zipFolder, "RJFAF001.ZIP"), null);
      await command.doImport(path.join(zipFolder, "RJFAF002.ZIP"), null);

      expect(processFile.getCalls().map(call => call.args[0])).to.deep.equal(["RJFAF001.TOC", "RJFAF002.TOC"]);
    });
  });

});
