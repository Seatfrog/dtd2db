# Restriction Exceptions

**Config file:**
RST.ts

**Snowflake table name:**
restriction_exception

**Description:**  
Defines exception codes that can be used to override or modify standard restrictions. These records are not maintained but records may exist in the feed and contain data but should be ignored.

**Rate of change:** Approximately three times per week.

## EC – Exception Codes Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'EC'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| EXCEPTION_CODE | Exception code. |
| DESCRIPTION | Description of the exception. |

## Relationships
- Exception codes may be referenced in other restriction tables.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (EC records within RST file)
- **Note:** These records are not maintained and should be ignored. 