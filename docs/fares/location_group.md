# Location Groups

**Config file:**
LOC.ts

**Snowflake table name:**
location_group

**Description:**  
Defines groups of locations (stations) that are treated as a single entity for fare calculation purposes. This allows multiple stations to be grouped together under a single group identifier.

**Rate of change:** Approximately 12 times per month.

## G – Location Group Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'G'. |
| GROUP_UIC_CODE | UIC Code of group location. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be queried. Format is ddmmyyyy. |
| DESCRIPTION | Description of group location. |
| ERS_COUNTRY | Along with the ERS Code this forms a reference to the location for use by Eurostar Reservation System. |
| ERS_CODE | Along with the ERS Country this forms a reference to the location for use by Eurostar Reservation System. |

## Relationships
- `GROUP_UIC_CODE` is referenced in `location_group_member` table.
- Individual locations are linked to groups via the `location_group_member` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.LOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (G records within LOC file) 