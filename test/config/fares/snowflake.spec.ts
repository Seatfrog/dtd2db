import { expect } from "chai";
import snowflake from "@config/fares/snowflake";
import { MultiRecordFile } from "@feed/file/MultiRecordFile";
import { RecordAction } from "@feed/record/Record";

describe("Snowflake fares config", () => {

  it("has no update markers in files that start each line with the record type", () => {
    for (const [fileType, file] of Object.entries(snowflake)) {
      if (!(file instanceof MultiRecordFile) || file.typeStart !== 0) continue;

      for (const record of file.recordTypes) {
        expect((record as any).actionMap || {}, `${fileType} ${record.name}`).to.deep.equal({});
      }
    }
  });

  describe("DIS", () => {
    it("inserts status and status discount records", () => {
      const statusLine = "S000311229992210" + " ".repeat(83);
      const discountLine = "D00031122999010000";

      const status = snowflake.DIS.getRecord(statusLine)!;
      const discount = snowflake.DIS.getRecord(discountLine)!;

      expect(status.name).to.equal("status");
      expect(status.extractValues(statusLine).action).to.equal(RecordAction.Insert);
      expect(discount.name).to.equal("status_discount");
      expect(discount.extractValues(discountLine)).to.deep.include({
        action: RecordAction.Insert,
        values: {
          STATUS_CODE: "000",
          END_DATE: "31122999",
          DISCOUNT_CATEGORY: "01",
          DISCOUNT_INDICATOR: "0",
          DISCOUNT_PERCENTAGE: "000"
        }
      });
    });
  });

  describe("LOC", () => {
    it("reads the admin area code and the fields around it", () => {
      const line = "RL700041002092026080820262002202470 0041BOUNDARY ZONE 2 QAK00000     0041  00GL      07BOUNDARY ZONE 2"
        + " ".repeat(26) + "BOUNDARY ZONE 2 BOUNDARY ZONE 2" + " ".repeat(45) + "BOUNDARY ZONE 2" + " ".repeat(41)
        + "2 NNNNNN0009000S0000000000000";
      const record = snowflake.LOC.getRecord(line)!;

      expect(record.name).to.equal("location");
      expect(record.extractValues(line).values).to.deep.include({
        QUOTE_DATE: "20022024",
        AREA_ADMIN_CODE: "70",
        NLC: "0041",
        DESCRIPTION: "BOUNDARY ZONE 2",
        CRS: "QAK"
      });
    });
  });

  describe("SUP", () => {
    it("keeps * in supplement rule flags and stores a space as null", () => {
      const line = "RR001311229992805202525082023" + " ".repeat(46) + "2**** **BARSINR";
      const record = snowflake.SUP.getRecord(line)!;

      expect(record.name).to.equal("supplement_rule");
      expect(record.extractValues(line).values).to.deep.include({
        FARE_CLASS: "2",
        QUOTA: "*",
        WEEKEND_FIRST: "*",
        SILVER_STANDARD: "*",
        RAILCARD: "*",
        CATERING_CODE: null,
        SLEEPER: "*",
        ACCOM_CLASS: "*",
        STATUS: "B",
        RESERVATION_STATUS: "ARS",
        SECTORS: "INR"
      });
    });
  });

});
