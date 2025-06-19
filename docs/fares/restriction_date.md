# Restriction Dates

**Description:**  
Defines date-based restrictions for travel, specifying when restrictions are valid and which days of the week they apply.

## Restriction Date Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'D'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| START_DATE | Start date for the restriction. Format is ddmmyyyy. |
| END_DATE | End date for the restriction. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| ATB_DESC | ATB description. |

## Relationships
- Links to restriction_header via the restriction system. 