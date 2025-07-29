# Location Group Members

**Config file:**
LOC.ts

**Snowflake table name:**
location_group_member

**Description:**  
Links individual locations to location groups, defining which stations belong to which groups. These records are linked to the associated Group Location record using the GROUP_UIC_CODE and END_DATE fields.

**Rate of change:** Approximately 12 times per month.

## M – Location Group Member Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'M'. |
| GROUP_UIC_CODE | UIC code of group location. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| MEMBER_UIC_CODE | UIC code of group member. |
| MEMBER_CRS_CODE | CRS code of group member. |

## Relationships
- `GROUP_UIC_CODE` links to the `location_group` table.
- `MEMBER_UIC_CODE` links to the main `location` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.LOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (M records within LOC file) 