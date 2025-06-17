import { expect } from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import { SnowflakeSchema } from "@database/SnowflakeSchema";
import { DatabaseConnection } from "@database/DatabaseConnection";
import { TextField } from "@feed/field/TextField";
import { IntField } from "@feed/field/IntField";
import { DateField } from "@feed/field/DateField";
import { BooleanField } from "@feed/field/BooleanField";
import { TimeField } from "@feed/field/TimeField";
import { DoubleField } from "@feed/field/DoubleField";
import { SnowflakeFixedWidthRecord } from "@feed/record/snowflake/FixedWidthRecord";
import { RecordAction } from "@feed/record/Record";

const chai = require("chai");
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("SnowflakeSchema", () => {
  let db: DatabaseConnection;
  let schema: SnowflakeSchema;
  let record: SnowflakeFixedWidthRecord;

  beforeEach(() => {
    db = {
      query: sinon.stub().resolves([[]]),
      end: sinon.stub().resolves(),
    } as any;

    record = new SnowflakeFixedWidthRecord(
      "test_table",
      ["validity_code", "end_date"],
      {
        validity_code: new TextField(0, 10),
        end_date: new DateField(10),
        name: new TextField(20, 50),
        is_active: new BooleanField(70),
        created_at: new DateField(71),
        updated_at: new TimeField(79, 8, false),
        price: new DoubleField(85, 10, 2),
      }
    );

    schema = new SnowflakeSchema(db, record, "TEST_SCHEMA", "TEST_DB");
  });

  it("should create schema with correct SQL", async () => {
    await schema.createSchema();

    expect(db.query).to.have.been.calledWith(
      'CREATE TABLE IF NOT EXISTS TEST_DB.TEST_SCHEMA.TEST_TABLE (VALIDITY_CODE VARCHAR(10) NOT NULL, END_DATE DATE NOT NULL, NAME VARCHAR(50) NOT NULL, IS_ACTIVE BOOLEAN NOT NULL, CREATED_AT DATE NOT NULL, UPDATED_AT TIME NOT NULL, PRICE FLOAT NOT NULL, CONSTRAINT TEST_TABLE_KEY UNIQUE (VALIDITY_CODE, END_DATE))'
    );
  });

  it("should drop schema with correct SQL", async () => {
    await schema.dropSchema();

    expect(db.query).to.have.been.calledWith(
      'DROP TABLE IF EXISTS TEST_DB.TEST_SCHEMA.TEST_TABLE'
    );
  });

  it("should handle nullable fields correctly", async () => {
    const nullableRecord = new SnowflakeFixedWidthRecord(
      "test_table",
      ["validity_code", "end_date"],
      {
        validity_code: new TextField(0, 10, true),
        end_date: new DateField(10, true),
        name: new TextField(20, 50, true),
      }
    );

    const nullableSchema = new SnowflakeSchema(db, nullableRecord, "TEST_SCHEMA", "TEST_DB");
    await nullableSchema.createSchema();

    expect(db.query).to.have.been.calledWith(
      'CREATE TABLE IF NOT EXISTS TEST_DB.TEST_SCHEMA.TEST_TABLE (VALIDITY_CODE VARCHAR(10) NULL, END_DATE DATE NULL, NAME VARCHAR(50) NULL, CONSTRAINT TEST_TABLE_KEY UNIQUE (VALIDITY_CODE, END_DATE))'
    );
  });

  it("should handle different integer types based on length", async () => {
    const intRecord = new SnowflakeFixedWidthRecord(
      "test_table",
      ["validity_code", "end_date"],
      {
        validity_code: new TextField(0, 10),
        end_date: new DateField(10),
        tiny: new IntField(20, 4),
        small: new IntField(24, 4),
        medium: new IntField(28, 9),
        large: new IntField(37, 9),
        huge: new IntField(46, 18),
      }
    );

    const intSchema = new SnowflakeSchema(db, intRecord, "TEST_SCHEMA", "TEST_DB");
    await intSchema.createSchema();

    expect(db.query).to.have.been.calledWith(
      'CREATE TABLE IF NOT EXISTS TEST_DB.TEST_SCHEMA.TEST_TABLE (VALIDITY_CODE VARCHAR(10) NOT NULL, END_DATE DATE NOT NULL, TINY NUMBER(4,0) NOT NULL, SMALL NUMBER(4,0) NOT NULL, MEDIUM NUMBER(9,0) NOT NULL, LARGE NUMBER(9,0) NOT NULL, HUGE NUMBER(18,0) NOT NULL, CONSTRAINT TEST_TABLE_KEY UNIQUE (VALIDITY_CODE, END_DATE))'
    );
  });

  it("should create a schema if it doesn't exist", async () => {
    db.query = sinon.stub()
      .onFirstCall().resolves([[]])  // First call for checking schema existence
      .onSecondCall().resolves([[]]); // Second call for creating schema

    await schema.ensureExists();

    expect(db.query).to.have.been.calledWith(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'TEST_SCHEMA'`
    );
    expect(db.query).to.have.been.calledWith(
      `CREATE SCHEMA IF NOT EXISTS TEST_DB.TEST_SCHEMA`
    );
  });

  it("should not create a schema if it already exists", async () => {
    db.query = sinon.stub().resolves([["TEST_SCHEMA"]]); // Schema exists

    await schema.ensureExists();

    expect(db.query).to.have.been.calledWith(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'TEST_SCHEMA'`
    );
    expect(db.query).to.not.have.been.calledWith(
      `CREATE SCHEMA IF NOT EXISTS TEST_DB.TEST_SCHEMA`
    );
  });

  it("should handle errors when checking schema existence", async () => {
    const error = new Error("Database error");
    db.query = sinon.stub().rejects(error);

    try {
      await schema.ensureExists();
      expect.fail("Should have thrown an error");
    } catch (e) {
      expect(e).to.equal(error);
    }
  });
}); 