# Supplement Rule Supplement

**Config file:**
SUP.ts

**Snowflake table name:**
supplement_rule_supplement

**Description:**  
Links supplement rules to specific supplements, defining which supplements are governed by which rules. Rule Supplement records are linked to the associated Rule record using the RULE_NUMBER and END_DATE fields. The key fields are used to match this record to the rule record to which it applies.

**Rate of change:** Approximately 10 times per month.

## Supplement Rule Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'M'. |
| RULE_NUMBER | 3-character rule number. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| SUPPLEMENT_CODE | 3-character supplement code identifying a supplement contained in the rule. |
| OM_FLAG | Optional/Mandatory flag. |

## Relationships
- `RULE_NUMBER` links to `supplement_rule` table in conjunction with `END DATE`.
- `SUPPLEMENT_CODE` links to `supplement` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.SUP
- **Typical Size:** 8Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (M records within SUP file) 