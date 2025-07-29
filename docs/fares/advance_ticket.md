# Advance Tickets

**Snowflake table name:**
advance_ticket

**Description:**  
This file contains details of tickets which require advance purchase, and the details of the advance purchase horizon.

**Rate of change:** Once per month (estimate)

## Advance Purchase Tickets Record

| Field Name | Length | Position | Description |
|------------|--------|----------|-------------|
| UPDATE_MARKER | 1 | 0-0 | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | 1 | 1-1 | Contains 'A'. |
| TICKET_CODE | 3 | 2-4 | Ticket Code (links to ticket_type). |
| RESTRICTION_CODE | 2 | 5-6 | Restriction code or spaces. |
| RESTRICTION_FLAG | 1 | 7-7 | Values are '0', '1' or '2'. '0' indicates that the Advance Purchase details apply to this ticket/restriction code (above). '1' indicates that the Advance Purchase details apply to this ticket when it is not restricted. '2' indicates that Advance Purchase details apply to this ticket regardless of restriction. |
| TOC_ID | 2 | 8-9 | TOC code or spaces. If a TOC code is supplied then Advance Purchase details apply only to the specified TOC which operates the service, otherwise the Advance Purchase details apply to this ticket, regardless of which TOC's trains it is used on. |
| END_DATE | 8 | 10-17 | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | 8 | 18-25 | First date for which this record can be used. Format is ddmmyyyy. |
| CHECK_TYPE | 1 | 26-26 | Indicates which of the following fields should be checked for this ticket/restriction/TOC. '0' indicates that AP_DATA contains a BOOKING DATE. '1' indicates that AP_DATA contains ADVANCE HOURS. '2' indicates that AP_DATA contains ADVANCE DAYS. |
| AP_DATA | 8 | 27-34 | The value of this field depends on the value of CHECK_TYPE. If CHECK_TYPE='0' then it contains the date by which this ticket must be booked. Format is ddmmyyyy. If CHECK_TYPE='1' then it contains the number of required advance hours for this ticket. For example, a value of '24' indicates that the ticket must be booked at least 24 hours in advance of travel. If CHECK_TYPE='2' then it contains the number of required advance days for this ticket. For example, a value of '1' indicates that the ticket must be booked the day before travel at the latest. |
| BOOKING_TIME | 4 | 35-38 | The time by which the ticket must be booked, in the format "hhmm". If this field is blank, then this indicates that the ticket is available for booking up to the time that bookings close on the day indicated by the AP_DATA field. This field will be set to spaces if CHECK_TYPE = '1'. |

## Relationships
- `TICKET_CODE` links to `ticket_type`.
- `RESTRICTION_CODE` links to `restriction_header`.
- `TOC_ID` links to `toc`.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TAP
- **Typical Size:** 2Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 