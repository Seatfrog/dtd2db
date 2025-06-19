# Advance Tickets

**Description:**  
Defines advance ticket restrictions and booking requirements, specifying when advance tickets can be booked and what restrictions apply.

## Advance Ticket Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'A'. |
| TICKET_CODE | Ticket code (links to ticket_type). |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| RESTRICTION_FLAG | Restriction flag indicator. |
| TOC_ID | TOC ID (links to toc). |
| END_DATE | End date for the advance ticket. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the advance ticket. Format is ddmmyyyy. |
| CHECK_TYPE | Check type indicator. |
| AP_DATA | Advance purchase data. |
| BOOKING_TIME | Booking time in HHMM format. |

## Relationships
- `TICKET_CODE` links to `ticket_type`.
- `RESTRICTION_CODE` links to `restriction_header`.
- `TOC_ID` links to `toc`. 