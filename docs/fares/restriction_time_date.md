# Restriction Time Dates

**Description:**  
Defines date ranges and day-of-week restrictions for specific time-based restrictions, allowing time restrictions to be applied only on certain days within certain date ranges.

## Restriction Time Date Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TD'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| SEQUENCE_NO | Sequence number (links to restriction_time). |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
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
- `RESTRICTION_CODE` and `SEQUENCE_NO` link to `restriction_time`. 