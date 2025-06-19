# Rail Rovers

**Description:**  
Defines rover tickets (special tickets for unlimited travel in a region) with their validity periods and travel rules.

## Rail Rover Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| ROVER_CODE | Rover code (primary key). |
| END_DATE | End date for the rover ticket. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the rover ticket. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| DESCRIPTION | Description of the rover ticket. |
| TICKET_DESC | Ticket description. |
| CAPRI_TICKET_CODE | CAPRI ticket code. |
| ROVER_ACCOUNTING_CODE | Rover accounting code. |
| DAYS_TRAVEL | Number of days of travel. |
| MONTHS_VALID | Number of months valid. |
| DAYS_VALID | Number of days valid. |

## Rover Price Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'P'. |
| ROVER_CODE | Rover code (links to Rail Rover record). |
| END_DATE | End date for the rover price. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the rover price. Format is ddmmyyyy. |
| ADULT_FARE | Adult fare in pence. |
| CHILD_FARE | Child fare in pence. |
| RAILCARD_CODE | Railcard code (if applicable). |
| CLASS_CODE | Class of travel code. |

## Relationships
- `ROVER_CODE` is referenced in `rover_price` table.
- `CAPRI_TICKET_CODE` may link to ticket definitions.
- `RAILCARD_CODE` links to railcard definitions. 