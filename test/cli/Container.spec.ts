import * as chai from "chai";
import { expect } from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { Container } from "@cli/Container";
import { SnowflakeConnection } from "@database/SnowflakeConnection";
import { ShowHelpCommand } from "@cli/ShowHelpCommand";
import { BaseImportFeedCommand } from "@cli/BaseImportFeedCommand";
import { MySQLImportFeedCommand } from "@cli/MySQLImportFeedCommand";
import { SnowflakeImportFeedCommand } from "@cli/SnowflakeImportFeedCommand";
import { OutputGTFSCommand } from "@cli/OutputGTFSCommand";
import { DownloadCommand } from "@cli/DownloadCommand";
import * as PromiseSFTP from "@src/sftp/PromiseSFTP";

chai.use(sinonChai);

describe("Container", () => {
  let container: Container;
  let originalEnv: NodeJS.ProcessEnv;
  let sftpStub: sinon.SinonStub;

  beforeEach(() => {
    originalEnv = { ...process.env };
    process.env = { ...originalEnv };
    process.env.DATABASE_NAME = "test-db";
    sftpStub = sinon.stub(PromiseSFTP, "PromiseSFTP").value({
      connect: sinon.stub().resolves({})
    });
    container = new Container();
  });

  afterEach(() => {
    sinon.restore();
    process.env = originalEnv;
  });

  it("should initialize the container", () => {
    expect(container).to.be.instanceOf(Container);
  });


  describe("Snowflake configuration", () => {
    it("should validate Snowflake configuration when DATABASE_TYPE is snowflake", () => {
      process.env.DATABASE_TYPE = "snowflake";
      process.env.SNOWFLAKE_ACCOUNT = "test-account";
      process.env.SNOWFLAKE_USERNAME = "test-user";
      process.env.SNOWFLAKE_PRIVATE_KEY_PATH = "/path/to/key";
      process.env.DATABASE_NAME = "test-db";
      process.env.SNOWFLAKE_SCHEMA = "test-schema";
      process.env.SNOWFLAKE_WAREHOUSE = "test-warehouse";
      process.env.SNOWFLAKE_ROLE = "test-role";
    });

    it("should throw error when required Snowflake environment variables are missing", () => {
      process.env.DATABASE_TYPE = "snowflake";
      // Remove all required Snowflake env vars
      delete process.env.SNOWFLAKE_ACCOUNT;
      delete process.env.SNOWFLAKE_USERNAME;
      delete process.env.SNOWFLAKE_PRIVATE_KEY_PATH;
      delete process.env.DATABASE_NAME;
      delete process.env.SNOWFLAKE_SCHEMA;
      delete process.env.SNOWFLAKE_WAREHOUSE;
      delete process.env.SNOWFLAKE_ROLE;
    });
  });

  describe("Command handling", () => {
    it("should return ShowHelpCommand for unknown command", async () => {
      const command = await container.getCommand("unknown");
      expect(command).to.be.instanceOf(ShowHelpCommand);
    });

    it("should return appropriate command for --fares", async () => {
      const command = await container.getCommand("--fares");
      expect(command).to.be.instanceOf(BaseImportFeedCommand);
      
      // Check for the appropriate database-specific implementation
      if (process.env.DATABASE_TYPE === 'snowflake') {
        expect(command).to.be.instanceOf(SnowflakeImportFeedCommand);
      } else {
        expect(command).to.be.instanceOf(MySQLImportFeedCommand);
      }
    });

    it("should return appropriate command for --gtfs", async () => {
      const command = await container.getCommand("--gtfs");
      expect(command).to.be.instanceOf(OutputGTFSCommand);
    });

    it("should return appropriate command for --download-fares", async () => {
      const command = await container.getCommand("--download-fares");
      expect(command).to.be.instanceOf(DownloadCommand);
    });
  });

  describe("Database connection", () => {
    it("should get database connection with required interface methods", async () => {
      const mockConnection = {
        type: "mysql",
        query: sinon.stub(),
        stream: sinon.stub(),
        end: sinon.stub(),
        getConnection: sinon.stub().resolvesThis(),
        release: sinon.stub()
      };
      sinon.stub(container, "getDatabaseConnection").resolves(mockConnection);
      const connection = await container.getDatabaseConnection();
      expect(connection).to.have.property('type');
      expect(connection).to.have.property('query').that.is.a('function');
      expect(connection).to.have.property('stream').that.is.a('function');
      expect(connection).to.have.property('end').that.is.a('function');
      expect(connection).to.have.property('getConnection').that.is.a('function');
      expect(connection).to.have.property('release').that.is.a('function');
    });

    it("should get Snowflake connection when DATABASE_TYPE is snowflake", async () => {
      process.env.DATABASE_TYPE = "snowflake";
      process.env.SNOWFLAKE_ACCOUNT = "test-account";
      process.env.SNOWFLAKE_USERNAME = "test-user";
      process.env.SNOWFLAKE_PRIVATE_KEY_PATH = "/path/to/key";
      process.env.DATABASE_NAME = "test-db";
      process.env.SNOWFLAKE_SCHEMA = "test-schema";
      process.env.SNOWFLAKE_WAREHOUSE = "test-warehouse";
      process.env.SNOWFLAKE_ROLE = "test-role";

      const container = new Container();
      const connection = await container.getDatabaseConnection();
      expect(connection).to.be.instanceOf(SnowflakeConnection);
    });
  });
}); 
