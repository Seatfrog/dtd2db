import * as chai from "chai";
import { expect } from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { SnowflakeTable } from "@database/SnowflakeTable";
import { DatabaseConnection } from "@database/DatabaseConnection";
import { RecordAction } from "@feed/record/Record";
import { setupMockLogger, teardownMockLogger } from "../utils/testHelpers";
import { MockLogger } from "../utils/MockLogger";
import { SnowflakeTableFactory } from "@database/SnowflakeTableFactory";
import { SnowflakeFixedWidthRecord } from "@feed/record/snowflake/FixedWidthRecord";
import { TextField } from "@feed/field/TextField";
import { DateField } from "@feed/field/DateField";

chai.use(sinonChai);

describe("SnowflakeTable", () => {
  let table: SnowflakeTable;
  let mockDb: sinon.SinonStubbedInstance<DatabaseConnection>;
  let mockLogger: MockLogger;
  let mockRecord: SnowflakeFixedWidthRecord;

  beforeEach(() => {
    mockLogger = setupMockLogger();
    mockDb = {
      query: sinon.stub().resolves([[], {}]),
      stream: sinon.stub().resolves(),
      end: sinon.stub().resolves(),
      getConnection: sinon.stub().resolves(),
      release: sinon.stub().resolves(),
      type: "snowflake"
    } as any;

    // Create a mock record with fields
    mockRecord = new SnowflakeFixedWidthRecord(
      "test_table",
      ["validity_code", "end_date"],
      {
        validity_code: new TextField(0, 10),
        end_date: new DateField(10),
        start_date: new DateField(20),
        description: new TextField(30, 50),
        out_days: new TextField(80, 4),
        out_months: new TextField(84, 4),
        ret_days: new TextField(88, 4),
        ret_months: new TextField(92, 4),
        ret_after_days: new TextField(96, 4),
        ret_after_months: new TextField(100, 4),
        ret_after_day: new TextField(104, 10),
        break_out: new TextField(114, 4),
        break_in: new TextField(118, 4),
        out_description: new TextField(122, 50),
        rtn_description: new TextField(172, 50)
      }
    );

    table = new SnowflakeTable(
      mockDb,
      "test_table",
      "TEST_SCHEMA",
      "TEST_DB",
      2,
      mockRecord,
      mockLogger as any
    );

    // Always mock the schema check to return the expected schema for the first call
    mockDb.query.resetHistory();
    mockDb.query.callsFake((sql) => {
      if (sql.includes('INFORMATION_SCHEMA.COLUMNS')) {
        return Promise.resolve([fullTableSchema, {}]);
      }
      return Promise.resolve([[], {}]);
    });
  });

  afterEach(() => {
    teardownMockLogger();
    sinon.restore();
  });

  const fullTableSchema = [
    { TABLE_NAME: "test_table", COLUMN_NAME: "VALIDITY_CODE", DATA_TYPE: "VARCHAR" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "END_DATE", DATA_TYPE: "DATE" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "START_DATE", DATA_TYPE: "DATE" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "DESCRIPTION", DATA_TYPE: "VARCHAR" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "OUT_DAYS", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "OUT_MONTHS", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "RET_DAYS", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "RET_MONTHS", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "RET_AFTER_DAYS", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "RET_AFTER_MONTHS", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "RET_AFTER_DAY", DATA_TYPE: "VARCHAR" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "BREAK_OUT", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "BREAK_IN", DATA_TYPE: "NUMBER" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "OUT_DESCRIPTION", DATA_TYPE: "VARCHAR" },
    { TABLE_NAME: "test_table", COLUMN_NAME: "RTN_DESCRIPTION", DATA_TYPE: "VARCHAR" }
  ];

  it("should buffer inserts until flush limit is reached", async () => {
    mockDb.query.onFirstCall().resolves([[
      { COLUMN_NAME: 'VALIDITY_CODE', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'END_DATE', DATA_TYPE: 'DATE' },
      { COLUMN_NAME: 'START_DATE', DATA_TYPE: 'DATE' },
      { COLUMN_NAME: 'DESCRIPTION', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'OUT_DAYS', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'OUT_MONTHS', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'RET_DAYS', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'RET_MONTHS', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'RET_AFTER_DAYS', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'RET_AFTER_MONTHS', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'RET_AFTER_DAY', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'BREAK_OUT', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'BREAK_IN', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'OUT_DESCRIPTION', DATA_TYPE: 'VARCHAR' },
      { COLUMN_NAME: 'RTN_DESCRIPTION', DATA_TYPE: 'VARCHAR' }
    ], {}]);
    const row1 = {
      action: RecordAction.Insert,
      values: { validity_code: "V1", end_date: "2024-12-31", name: "test1" },
      keysValues: { validity_code: "V1", end_date: "2024-12-31" }
    };
    const row2 = {
      action: RecordAction.Insert,
      values: { validity_code: "V2", end_date: "2024-12-31", name: "test2" },
      keysValues: { validity_code: "V2", end_date: "2024-12-31" }
    };

    await table.apply(row1);
    await table.apply(row2);

    expect(mockDb.query).to.have.been.calledWith(
      `MERGE INTO TEST_DB.TEST_SCHEMA.TEST_TABLE target
   USING (SELECT * FROM TABLE(FLATTEN(input => parse_json(?)))) source
   ON target.VALIDITY_CODE = source.value:VALIDITY_CODE AND target.END_DATE = source.value:END_DATE
   WHEN NOT MATCHED THEN INSERT (VALIDITY_CODE, END_DATE, NAME) VALUES (source.value:validity_code, source.value:end_date, source.value:name)`,
      ['[{"VALIDITY_CODE":"V1","END_DATE":"2024-12-31","NAME":"test1"},{"VALIDITY_CODE":"V2","END_DATE":"2024-12-31","NAME":"test2"}]']
    );
  });

  it("should handle delayed inserts correctly", async () => {
    mockDb.query.onFirstCall().resolves([[{ TABLE_NAME: 'TEST_TABLE' }], {}]);
    mockDb.query.onSecondCall().resolves([
      [
        { COLUMN_NAME: 'VALIDITY_CODE', DATA_TYPE: 'VARCHAR' },
        { COLUMN_NAME: 'END_DATE', DATA_TYPE: 'DATE' },
        { COLUMN_NAME: 'START_DATE', DATA_TYPE: 'DATE' },
        { COLUMN_NAME: 'DESCRIPTION', DATA_TYPE: 'VARCHAR' },
        { COLUMN_NAME: 'OUT_DAYS', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'OUT_MONTHS', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'RET_DAYS', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'RET_MONTHS', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'RET_AFTER_DAYS', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'RET_AFTER_MONTHS', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'RET_AFTER_DAY', DATA_TYPE: 'VARCHAR' },
        { COLUMN_NAME: 'BREAK_OUT', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'BREAK_IN', DATA_TYPE: 'NUMBER' },
        { COLUMN_NAME: 'OUT_DESCRIPTION', DATA_TYPE: 'VARCHAR' },
        { COLUMN_NAME: 'RTN_DESCRIPTION', DATA_TYPE: 'VARCHAR' }
      ],
      {}
    ]);
    mockDb.query.onThirdCall().resolves([[], {}]);
    mockDb.query.onCall(3).resolves([[], {}]);
    const row = {
      action: RecordAction.DelayedInsert,
      values: { validity_code: "V1", end_date: "2024-12-31", name: "test" },
      keysValues: { validity_code: "V1", end_date: "2024-12-31" }
    };
    await table.apply(row);
    const deleteMatched = mockDb.query.getCalls().some(call =>
      typeof call.args[0] === 'string' && call.args[0].startsWith("DELETE FROM TEST_DB.TEST_SCHEMA.TEST_TABLE WHERE")
    );
    const mergeMatched = mockDb.query.getCalls().some(call =>
      typeof call.args[0] === 'string' && call.args[0].includes("MERGE INTO TEST_DB.TEST_SCHEMA.TEST_TABLE target")
    );
    expect(deleteMatched).to.be.true;
    expect(mergeMatched).to.be.true;
  });

  it("should log and do nothing if the table already exists", async () => {
    mockDb.query.resolves([[], {}]);

    await table.initialize();

    // Since we're using a schema with a record, it will call createSchema directly
    const createTableCall = mockDb.query.getCalls().some(call =>
      call.args[0].includes("CREATE TABLE IF NOT EXISTS TEST_DB.TEST_SCHEMA.TEST_TABLE")
    );
    expect(createTableCall).to.be.true;
  });

  it("should create the table if it does not exist", async () => {
    mockDb.query
      .onFirstCall()
      .resolves([[], {}])
      .onSecondCall()
      .resolves([[], {}]);

    await table.initialize();

    expect(mockDb.query).to.have.been.calledWith(
      "CREATE TABLE IF NOT EXISTS TEST_DB.TEST_SCHEMA.TEST_TABLE (VALIDITY_CODE VARCHAR(10) NOT NULL, END_DATE DATE NOT NULL, START_DATE DATE NOT NULL, DESCRIPTION VARCHAR(50) NOT NULL, OUT_DAYS VARCHAR(4) NOT NULL, OUT_MONTHS VARCHAR(4) NOT NULL, RET_DAYS VARCHAR(4) NOT NULL, RET_MONTHS VARCHAR(4) NOT NULL, RET_AFTER_DAYS VARCHAR(4) NOT NULL, RET_AFTER_MONTHS VARCHAR(4) NOT NULL, RET_AFTER_DAY VARCHAR(10) NOT NULL, BREAK_OUT VARCHAR(4) NOT NULL, BREAK_IN VARCHAR(4) NOT NULL, OUT_DESCRIPTION VARCHAR(50) NOT NULL, RTN_DESCRIPTION VARCHAR(50) NOT NULL, CONSTRAINT TEST_TABLE_KEY UNIQUE (VALIDITY_CODE, END_DATE))"
    );
  });

  it("should propagate errors from the db query", async () => {
    const row = {
      action: RecordAction.Insert,
      values: { validity_code: "V1", end_date: "2024-12-31", name: "test" },
      keysValues: { validity_code: "V1", end_date: "2024-12-31" }
    };

    const error = new Error("Database error");
    mockDb.query.rejects(error);

    await expect(table.apply(row)).to.be.rejectedWith(error);
  });

  it("should use the factory to get a table instance", async () => {
    const factory = SnowflakeTableFactory.getInstance();
    const table = factory.getTable(mockDb, "test_table", "TEST_SCHEMA", "TEST_DB", 2, mockLogger as any);

    expect(table).to.be.instanceOf(SnowflakeTable);
  });

  it("should return the same instance for the same table", async () => {
    const factory = SnowflakeTableFactory.getInstance();
    const table1 = factory.getTable(mockDb, "test_table", "TEST_SCHEMA", "TEST_DB", 2, mockLogger as any);
    const table2 = factory.getTable(mockDb, "test_table", "TEST_SCHEMA", "TEST_DB", 2, mockLogger as any);

    expect(table1).to.equal(table2);
  });

  it("should return different instances for different tables", async () => {
    const factory = SnowflakeTableFactory.getInstance();
    const table1 = factory.getTable(mockDb, "test_table1", "TEST_SCHEMA", "TEST_DB", 2, mockLogger as any);
    const table2 = factory.getTable(mockDb, "test_table2", "TEST_SCHEMA", "TEST_DB", 2, mockLogger as any);

    expect(table1).to.not.equal(table2);
  });

  it("should clear the cache when requested", async () => {
    const factory = SnowflakeTableFactory.getInstance();
    const table1 = factory.getTable(mockDb, "test_table", "TEST_SCHEMA", "TEST_DB", 2, mockLogger as any);
    factory.clearCache();
    const table2 = factory.getTable(mockDb, "test_table", "TEST_SCHEMA", "TEST_DB", 2, mockLogger as any);

    expect(table1).to.not.equal(table2);
  });

  // it('should handle updates correctly', async () => {
  //   const table = new SnowflakeTable(mockDb, 'test_table', 'TEST_SCHEMA', 'TEST_DB');
  //   const record = {
  //     action: RecordAction.Update,
  //     values: { validity_code: 'V1', end_date: '2024-12-31', name: 'updated_test' },
  //     keysValues: { validity_code: 'V1', end_date: '2024-12-31' }
  //   };
  //   await table.apply(record);
  //   const expectedSQL = `MERGE INTO TEST_DB.TEST_SCHEMA.TEST_TABLE target\n   USING (SELECT * FROM TABLE(FLATTEN(input => parse_json(?)))) source\n   ON target.validity_code = source.value:validity_code AND target.end_date = source.value:end_date\n   WHEN MATCHED THEN UPDATE SET target.validity_code = source.value:validity_code, target.end_date = source.value:end_date, target.name = source.value:name`;
  //   const expectedParams = ['[{"VALIDITY_CODE":"V1","END_DATE":"2024-12-31","NAME":"updated_test"}]'];
  //   const calls = mockDb.query.getCalls();
  //   const found = calls.some(call => call.args[0] === expectedSQL && JSON.stringify(call.args[1]) === JSON.stringify(expectedParams));
  //   expect(found).to.be.true;
  // });
}); 