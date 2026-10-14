import * as chai from "chai";
import { expect } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { SnowflakeImportFeedCommand } from "@cli/SnowflakeImportFeedCommand";
import { SnowflakeTableFactory } from "@database/SnowflakeTableFactory";
import { DatabaseConnection } from "@database/DatabaseConnection";
import snowflake from "@config/fares/snowflake";

chai.use(sinonChai);

describe("SnowflakeImportFeedCommand", () => {

  describe("processFile", () => {
    const tocRecord = "T" + "AW" + "Transport for Wales".padEnd(30) + " ".repeat(8) + "Y";
    const fareRecord = "F" + "AWX" + "AW" + "Transport for Wales".padEnd(30);

    let originalEnv: NodeJS.ProcessEnv;
    let tmpFolder: string;
    let query: sinon.SinonStub;
    let command: SnowflakeImportFeedCommand;

    beforeEach(async () => {
      originalEnv = { ...process.env };
      process.env.DATABASE_NAME = "TEST_DB";
      process.env.SNOWFLAKE_SCHEMA = "TEST_SCHEMA";
      SnowflakeTableFactory.getInstance().clearCache();

      tmpFolder = await fs.promises.mkdtemp(path.join(os.tmpdir(), "dtd-test-"));
      for (const filename of ["RJFAF001.TOC", "RJFAC001.TOC"]) {
        await fs.promises.writeFile(path.join(tmpFolder, filename), `/!! Start of file\n${tocRecord}\n${fareRecord}\n`);
      }

      query = sinon.stub().resolves([[], {}]);
      const db = { query, end: sinon.stub().resolves() } as unknown as DatabaseConnection;
      command = new SnowflakeImportFeedCommand(db, snowflake, tmpFolder);
    });

    afterEach(async () => {
      sinon.restore();
      process.env = originalEnv;
      SnowflakeTableFactory.getInstance().clearCache();
      await fs.promises.rm(tmpFolder, { recursive: true, force: true });
    });

    const queries = () => query.getCalls().map(call => call.args[0] as string);
    const loadTableOf = (table: string) => {
      const create = queries().find(sql => sql.startsWith(`CREATE TRANSIENT TABLE TEST_DB.TEST_SCHEMA.${table}__LOAD_`));
      return create?.match(new RegExp(`TEST_DB\\.TEST_SCHEMA\\.(${table}__LOAD_[0-9A-F]{8})`))?.[1];
    };

    it("replaces the requested tables from a full refresh file", async () => {
      await (command as any).processFile("RJFAF001.TOC", ["toc"]);

      const loadTable = loadTableOf("TOC");
      expect(loadTable).to.exist;

      const insert = queries().find(sql => sql.startsWith(`INSERT INTO TEST_DB.TEST_SCHEMA.${loadTable} `));
      expect(insert).to.exist;
      expect(JSON.parse(query.getCalls().find(call => call.args[0] === insert)!.args[1][0])).to.deep.equal([
        { TOC_ID: "AW", TOC_NAME: "Transport for Wales", ACTIVE: "Y" }
      ]);

      const replace = `CREATE OR REPLACE TABLE TEST_DB.TEST_SCHEMA.TOC COPY GRANTS AS SELECT * FROM TEST_DB.TEST_SCHEMA.${loadTable}`;
      const drop = `DROP TABLE IF EXISTS TEST_DB.TEST_SCHEMA.${loadTable}`;
      expect(queries()).to.include(replace);
      expect(queries()).to.include(drop);
      expect(queries().indexOf(insert!)).to.be.lessThan(queries().indexOf(replace));
      expect(queries().indexOf(replace)).to.be.lessThan(queries().indexOf(drop));

      expect(queries().some(sql => sql.startsWith("MERGE"))).to.be.false;
      expect(queries().some(sql => sql.includes("TOC_FARE"))).to.be.false;
    });

    it("replaces every table of a full refresh file without --tables", async () => {
      await (command as any).processFile("RJFAF001.TOC", null);

      for (const table of ["TOC", "TOC_FARE"]) {
        const loadTable = loadTableOf(table);
        expect(loadTable, table).to.exist;
        expect(queries()).to.include(`CREATE OR REPLACE TABLE TEST_DB.TEST_SCHEMA.${table} COPY GRANTS AS SELECT * FROM TEST_DB.TEST_SCHEMA.${loadTable}`);
        expect(queries()).to.include(`DROP TABLE IF EXISTS TEST_DB.TEST_SCHEMA.${loadTable}`);
      }
    });

    it("merges a change file into the live tables", async () => {
      await (command as any).processFile("RJFAC001.TOC", ["toc"]);

      expect(queries().some(sql => sql.startsWith("MERGE INTO TEST_DB.TEST_SCHEMA.TOC target"))).to.be.true;
      expect(queries().some(sql => sql.includes("__LOAD_"))).to.be.false;
      expect(queries().some(sql => sql.startsWith("CREATE OR REPLACE"))).to.be.false;
    });

    it("drops the load table and keeps the live table when the load fails", async () => {
      query.callsFake(async (sql: string) => {
        if (sql.startsWith("INSERT INTO")) throw new Error("load failed");
        return [[], {}];
      });

      let error: Error | undefined;
      try {
        await (command as any).processFile("RJFAF001.TOC", ["toc"]);
      } catch (err) {
        error = err;
      }

      const loadTable = loadTableOf("TOC");
      expect(error).to.exist;
      expect(queries()).to.include(`DROP TABLE IF EXISTS TEST_DB.TEST_SCHEMA.${loadTable}`);
      expect(queries().some(sql => sql.startsWith("CREATE OR REPLACE"))).to.be.false;
    });
  });

});
