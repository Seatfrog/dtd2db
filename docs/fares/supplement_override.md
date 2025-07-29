# Supplement Overrides

**Config file:**
SUP.ts

**Snowflake table name:**
supplement_override

**Description:**  
Defines overrides for supplement records, allowing specific supplements to be overridden for certain conditions. Supplement override records are linked to the associated Supplement record using the SUPPLEMENT_CODE and END_DATE fields.

**Rate of change:** Approximately 10 times per month.

## Supplement Override Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'O'. |
| SUPPLEMENT_CODE | A unique supplement code. |
| END_DATE | Last date for which this record can be used. A high date (31122999) is used to indicate records which have no defined end date. |
| OVERRIDDEN_SUPPLEMENT | Supplement code. A supplement whose cost is overridden by the supplement in SUPPLEMENT_CODE. |

## Relationships
- `SUPPLEMENT_CODE` links to `supplement` table in conjuntion with `END DATE`.
- `OVERRIDDEN_SUPPLEMENT` links to `supplement` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.SUP
- **Typical Size:** 8Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (O records within SUP file) 