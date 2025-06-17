import * as chai from "chai";
import { expect } from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import { SnowflakeStream } from "@database/SnowflakeStream";
import { FeedFile } from "@feed/file/FeedFile";
import { setupMockLogger, teardownMockLogger } from "../utils/testHelpers";
import { MockLogger } from "../utils/MockLogger";
import { SnowflakeTableFactory } from "@database/SnowflakeTableFactory";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("SnowflakeStream", () => {
  let mockFile: FeedFile;
  let mockTables: Record<string, any>;
  let stream: SnowflakeStream;
  let mockLogger: MockLogger;
  let mockDb: any;
  let factoryStub: sinon.SinonStub;

  beforeEach(() => {
    mockDb = {
      query: sinon.stub().resolves([[], {}]),
      stream: sinon.stub().resolves(),
      end: sinon.stub().resolves(),
      getConnection: sinon.stub().resolves(),
      release: sinon.stub().resolves(),
      type: "snowflake"
    };
    mockFile = {
      recordTypes: [],
      getRecord: sinon.stub().returns(null)
    };
    mockTables = {
      table1: {
        ensureExists: sinon.stub().resolves(),
        name: "table1",
        getDb: () => mockDb,
        getTableName: () => "table1",
        getSchemaName: () => "TEST_SCHEMA",
        getDatabaseName: () => "TEST_DB",
        getFlushLimit: () => 2
      },
      table2: {
        ensureExists: sinon.stub().resolves(),
        name: "table2",
        getDb: () => mockDb,
        getTableName: () => "table2",
        getSchemaName: () => "TEST_SCHEMA",
        getDatabaseName: () => "TEST_DB",
        getFlushLimit: () => 2
      }
    };
    mockLogger = setupMockLogger();
    factoryStub = sinon.stub(SnowflakeTableFactory, "getInstance").returns({
      getTable: (db: any, tableName: string) => mockTables[tableName],
      tableCache: new Map(),
      clearCache: sinon.stub()
    } as unknown as SnowflakeTableFactory);
    stream = new SnowflakeStream("testStream", mockFile, mockTables, mockLogger as any);
  });

  afterEach(() => {
    teardownMockLogger();
    sinon.restore();
  });

  it("should ensure all tables exist when ensureExists is called", async () => {
    await stream.ensureExists();
    expect(mockTables.table1.ensureExists).to.have.been.calledOnce;
    expect(mockTables.table2.ensureExists).to.have.been.calledOnce;
    expect(mockLogger.debugStub).to.have.been.calledWith("All tables in stream ensured to exist");
  });

  it("should handle tables that don't have ensureExists method", async () => {
    const tableWithoutEnsureExists = { name: "table3" };
    mockTables.table3 = tableWithoutEnsureExists;
    
    await stream.ensureExists();
    expect(mockTables.table1.ensureExists).to.have.been.calledOnce;
    expect(mockTables.table2.ensureExists).to.have.been.calledOnce;
    expect(mockLogger.debugStub).to.have.been.calledWith("All tables in stream ensured to exist");
  });

  it("should handle errors from table ensureExists calls", async () => {
    mockTables.table1.ensureExists.rejects(new Error("Table creation failed"));
    
    await expect(stream.ensureExists()).to.be.rejectedWith("Table creation failed");
    expect(mockTables.table1.ensureExists).to.have.been.calledOnce;
    expect(mockTables.table2.ensureExists).to.not.have.been.called;
  });
}); 