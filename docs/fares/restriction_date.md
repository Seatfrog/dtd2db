# Restriction Dates

**Config file:**
RST.ts

**Snowflake table name:**
restriction_date

**Description:**  
Defines date-based restrictions for travel, specifying when restrictions are valid and which days of the week they apply. This record type controls the validity periods for all other restriction records in the file.

**Rate of change:** Approximately three times per week.

## Restriction Date Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'RD'. |
| CF_MKR | Value = 'C' or 'F' indicating Current or Future. All other restriction records in this file have a CF_MKR field set to 'C' or 'F'. This indicates that the start and end date of the records correspond to the start date and end date held in this record. |
| START_DATE | First date for which records with the matching CF_MKR can be used. Format is ddmmyyyy. |
| END_DATE | Last date for which records with the matching CF_MKR can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| ATB_DESC | ATB description. |

## Relationships
- `CF_MKR` links to all other restriction records in the file to determine their validity periods.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (RD records within RST file) 