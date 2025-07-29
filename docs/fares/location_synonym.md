# Location Synonyms

**Config file:**
LOC.ts

**Snowflake table name:**
location_synonym

**Description:**  
Defines alternative names or synonyms for locations, allowing stations to be referenced by different names or descriptions.

**Rate of change:** Approximately 12 times per month.

## S – Location Synonym Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| UIC_CODE | UIC code of location. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| DESCRIPTION | Synonym name. |

## Relationships
- `UIC_CODE` links to the main `location` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.LOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (S records within LOC file) 