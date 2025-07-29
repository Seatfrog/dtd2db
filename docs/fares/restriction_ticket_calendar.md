# Restriction Ticket Calendars

**Config file:**
RST.ts

**Snowflake table name:**
restriction_ticket_calendar

**Description:**  
Defines calendar-based restrictions for specific tickets, allowing tickets to be restricted on certain days within certain date ranges.

**Rate of change:** Approximately three times per week.

## CA – Ticket Calendar Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'CA'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| TICKET_CODE | Ticket or supplement code. |
| CAL_TYPE | Calendar type. 'I' type calendars indicate days on which a ticket is not available, 'D' indicates that the ticket is restricted on those dates, 'S' is used for supplement calendars. |
| ROUTE_CODE | Route code. The calendar applies only to this route. If spaces, the calendar applies to all routes. Always spaces for Supplement calendars. |
| COUNTRY_CODE | Country code, 'E' for England, 'S' for Scotland or space. The calendar applies to locations in Scotland or England or all locations. Always space for Supplement calendars. |
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
- `TICKET_CODE` links to `ticket_type` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (CA records within RST file) 