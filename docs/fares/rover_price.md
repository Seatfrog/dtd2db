# Rover Prices

**Description:**  
Defines pricing for rover tickets, which allow unlimited travel within specified areas for a set period.

## Rover Price Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'P'. |
| ROVER_CODE | Rover code (links to rover). |
| END_DATE | End date for the rover price. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| RAILCARD_CODE | Railcard code (links to railcard). |
| ROVER_CLASS | Rover class indicator. |
| ADULT_FARE | Adult fare in pence. |
| CHILD_FARE | Child fare in pence. |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |

## Relationships
- `ROVER_CODE` links to `rover`.
- `RAILCARD_CODE` links to `railcard`.
- `RESTRICTION_CODE` links to `restriction_header`. 