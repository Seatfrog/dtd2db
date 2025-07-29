# Restriction Header Dates

**Config file:**
RST.ts

**Snowflake table name:**
restriction_header_date

**Description:**  
Defines date bands for restriction headers, specifying when restrictions are valid and which days of the week they apply. These records are linked to the associated Restriction header record using the CF_MKR and RESTRICTION_CODE fields.

**Rate of change:** Approximately three times per week.

## Restriction Header Date Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'HD'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code. |
| DATE_FROM | Date band start date (within the start date/end date of the restriction, indicated by Current or Future) in the form MMDD. |
| DATE_TO | Date band end date (within the start date/end date of the restriction, indicated by Current or Future) in the form MMDD. |
| MONDAY | Monday indicator. If Y, then the restriction applies on Monday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Monday. |
| TUESDAY | Tuesday indicator. If Y, then the restriction applies on Tuesday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Tuesday. |
| WEDNESDAY | Wednesday indicator. If Y, then the restriction applies on Wednesday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Wednesday. |
| THURSDAY | Thursday indicator. If Y, then the restriction applies on Thursday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Thursday. |
| FRIDAY | Friday indicator. If Y, then the restriction applies on Friday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Friday. |
| SATURDAY | Saturday indicator. If Y, then the restriction applies on Saturday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Saturday. |
| SUNDAY | Sunday indicator. If Y, then the restriction applies on Sunday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Sunday. |
| START_DATE | Start date. Format is ddmmyyyy. |
| END_DATE | End date. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |

## Relationships
- `CF_MKR` and `RESTRICTION_CODE` link to `restriction_header` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (HD records within RST file) 