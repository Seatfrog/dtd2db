# Railcard Minimum Fares

**Description:**  
Defines minimum fare requirements for railcards, ensuring that railcard discounts cannot reduce fares below specified minimums.

## Railcard Minimum Fare Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'M'. |
| RAILCARD_CODE | Railcard code (links to railcard). |
| END_DATE | End date for the minimum fare. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the minimum fare. Format is ddmmyyyy. |
| MINIMUM_FARE | Minimum fare amount in pence. |

## Relationships
- `RAILCARD_CODE` links to `railcard`. 