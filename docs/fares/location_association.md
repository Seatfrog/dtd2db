# Location Associations

**Config file:**
LOC.ts

**Snowflake table name:**
location_association

**Description:**  
Defines associations between different locations (stations). This allows one location to be linked to another, typically for fare calculation purposes where certain stations are treated as equivalent or grouped together. Within PMS the capability of creating these records is deprecated and no records exist in the data.

**Rate of change:** Approximately 12 times per month.

## A – Location Association Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'A'. |
| UIC_CODE | UIC code of the primary location. |
| END_DATE | End date for the validity of this association. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| ASSOC_UIC_CODE | UIC code of the associated location. |
| ASSOC_CRS_CODE | CRS code of the associated location. |

## Relationships
- `UIC_CODE` links to the main `location` table.
- `ASSOC_UIC_CODE` links to another record in the `location` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.LOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (A records within LOC file)
- **Note:** These records are deprecated and no records exist in the data. 