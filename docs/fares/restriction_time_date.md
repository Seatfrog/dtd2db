# Restriction Time Dates

**Config file:**
RST.ts

**Snowflake table name:**
restriction_time_date

**Description:**  
Defines date ranges and day-of-week restrictions for specific time-based restrictions, allowing time restrictions to be applied only on certain days within certain date ranges. These records are linked to the associated Time Restriction record using the CF_MKR, RESTRICTION_CODE and SEQUENCE_NO fields.

**Rate of change:** Approximately three times per week.

## Restriction Time Date Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TD'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code. |
| SEQUENCE_NO | Numeric sequence number. Several time restrictions may apply with the same restriction code; this field is used to uniquely identify them. |
| OUT_RET | 'O' or 'R', to indicate whether the restriction applies to outward journeys or return journeys. |
| DATE_FROM | Date band start date (within the start date/end date of the restriction, indicated by Current or Future) in the form MMDD. |
| DATE_TO | Date band end date (within the start date/end date of the restriction, indicated by Current or Future) in the form MMDD. |
| MONDAY | Monday restriction indicator. If Y, then the restriction applies on Monday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Monday. |
| TUESDAY | Tuesday restriction indicator. If Y, then the restriction applies on Tuesday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Tuesday. |
| WEDNESDAY | Wednesday restriction indicator. If Y, then the restriction applies on Wednesday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Wednesday. |
| THURSDAY | Thursday restriction indicator. If Y, then the restriction applies on Thursday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Thursday. |
| FRIDAY | Friday restriction indicator. If Y, then the restriction applies on Friday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Friday. |
| SATURDAY | Saturday restriction indicator. If Y, then the restriction applies on Saturday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Saturday. |
| SUNDAY | Sunday restriction indicator. If Y, then the restriction applies on Sunday between the dates in DATE_FROM/DATE_TO. If N, then the restriction does not apply on Sunday. |
| START_DATE | Start date for the restriction. Format is ddmmyyyy. |
| END_DATE | End date for the restriction. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |

## Relationships
- `CF_MKR`, `RESTRICTION_CODE` and `SEQUENCE_NO` link to `restriction_time` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (TD records within RST file) 