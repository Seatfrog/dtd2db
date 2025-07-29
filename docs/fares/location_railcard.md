# Location Railcards

**Config file:**
LOC.ts

**Snowflake table name:**
location_railcard

**Description:**  
Links locations to railcard codes, indicating which railcards are valid at specific stations or locations. These records are linked to the associated Location record using the UIC_CODE and END_DATE fields.

**Rate of change:** Approximately 12 times per month.

## R – Location Railcard Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| UIC_CODE | UIC Code of location. |
| RAILCARD_CODE | Railcard code, to indicate a railcard which is valid at this location. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |

## Relationships
- `UIC_CODE` links to the main `location` table.
- `RAILCARD_CODE` links to railcard definitions in other tables.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.LOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (R records within LOC file) 