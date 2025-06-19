# Restriction Header Dates

**Description:**  
Defines date bands for restriction headers, specifying when restrictions are valid and which days of the week they apply.

## Restriction Header Date Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'H'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| DATE_FROM | Date from (MMDD format). |
| DATE_TO | Date to (MMDD format). |
| MONDAY | Monday indicator. |
| TUESDAY | Tuesday indicator. |
| WEDNESDAY | Wednesday indicator. |
| THURSDAY | Thursday indicator. |
| FRIDAY | Friday indicator. |
| SATURDAY | Saturday indicator. |
| SUNDAY | Sunday indicator. |
| START_DATE | Start date. Format is ddmmyyyy. |
| END_DATE | End date. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |

## Relationships
- `RESTRICTION_CODE` links to `restriction_header`. 