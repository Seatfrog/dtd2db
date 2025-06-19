# Restriction Ticket Calendars

**Description:**  
Defines calendar-based restrictions for specific tickets, allowing tickets to be restricted on certain days within certain date ranges.

## Restriction Ticket Calendar Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'CA'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| TICKET_CODE | Ticket code (links to ticket_type). |
| CAL_TYPE | Calendar type. |
| ROUTE_CODE | Route code. |
| COUNTRY_CODE | Country code. |
| DATE_FROM | Start date for the restriction period (MMDD format). |
| DATE_TO | End date for the restriction period (MMDD format). |
| MONDAY | Monday restriction indicator. |
| TUESDAY | Tuesday restriction indicator. |
| WEDNESDAY | Wednesday restriction indicator. |
| THURSDAY | Thursday restriction indicator. |
| FRIDAY | Friday restriction indicator. |
| SATURDAY | Saturday restriction indicator. |
| SUNDAY | Sunday restriction indicator. |
| START_DATE | Start date for the restriction. Format is ddmmyyyy. |
| END_DATE | End date for the restriction. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |

## Relationships
- `TICKET_CODE` links to `ticket_type`. 