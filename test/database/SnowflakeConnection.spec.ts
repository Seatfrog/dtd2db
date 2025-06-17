import * as chai from "chai";
import { expect } from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { SnowflakeConnection } from "@database/SnowflakeConnection";
import { DatabaseConfiguration } from "@database/DatabaseConnection";

chai.use(sinonChai);

describe("SnowflakeConnection", () => {
  let config: DatabaseConfiguration;

  beforeEach(() => {
    config = {
      host: "test-account.snowflakecomputing.com",
      user: "test-user",
      privateKeyPath: "/path/to/test/private_key.p8",
      database: "test-db",
      connectionLimit: 10,
      multipleStatements: true,
      port: 443,
      schema: "TEST_SCHEMA",
      warehouse: "TEST_WAREHOUSE",
      role: "TEST_ROLE"
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should validate configuration", () => {
    expect(() => new SnowflakeConnection(config)).to.not.throw();
  });

  it("should throw error when required fields are missing", () => {
    const invalidConfig = { ...config };
    delete invalidConfig.host;
    
    expect(() => new SnowflakeConnection(invalidConfig)).to.throw(
      "Snowflake configuration requires the following fields to be set: account"
    );
  });
}); 
