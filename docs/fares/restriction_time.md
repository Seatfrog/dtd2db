# Time Restrictions

**Description:**  
Defines time-based restrictions for travel, specifying time windows when restrictions apply and which locations they affect.

## TR – Time Restriction Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TR'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code (links to restriction_header). |
| SEQUENCE_NO | Sequence number for ordering restrictions. |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| TIME_FROM | Start time for the restriction (HHMM format). |
| TIME_TO | End time for the restriction (HHMM format). |
| ARR_DEP_VIA | Arrival/Departure/Via indicator ('A' for arrival, 'D' for departure, 'V' for via). |
| LOCATION | Location code affected by the restriction (NLC or UIC). |
| RSTR_TYPE | Restriction type. |
| TRAIN_TYPE | Train type indicator. |
| MIN_FARE_FLAG | Minimum fare flag. |

## TD – Time Restriction Date Bands Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TD'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code (links to restriction_header). |
| SEQUENCE_NO | Sequence number (links to Time Restriction record). |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| END_DATE | End date for the date band. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the date band. Format is ddmmyyyy. |
| DAY_MASK | Day mask indicating which days of the week the restriction applies. |

## TT – Time Restriction TOC Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TT'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code (links to restriction_header). |
| SEQUENCE_NO | Sequence number (links to Time Restriction record). |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| TOC_CODE | TOC code to which the restriction applies. |

## Relationships
- `RESTRICTION_CODE` links to `restriction_header`.
- `LOCATION` may link to location tables.
- `TOC_CODE` links to `toc` table.
- `SEQUENCE_NO` links time restriction records to their date bands and TOC restrictions. 