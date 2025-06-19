# Railcards

**Description:**  
Defines railcard types with their validity periods, restrictions, pricing, and passenger limits.

## Railcard Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'C'. |
| RAILCARD_CODE | Railcard code (primary key). |
| END_DATE | End date for the railcard. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the railcard. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| HOLDER_TYPE | Type of holder. |
| DESCRIPTION | Description of the railcard. |
| RESTRICTED_BY_ISSUE | Restricted by issue indicator. |
| RESTRICTED_BY_AREA | Restricted by area indicator. |
| RESTRICTED_BY_TRAIN | Restricted by train indicator. |
| RESTRICTED_BY_DATE | Restricted by date indicator. |
| MASTER_CODE | Master railcard code. |
| DISPLAY_FLAG | Display flag. |
| MAX_PASSENGERS | Maximum number of passengers. |
| MIN_PASSENGERS | Minimum number of passengers. |
| MAX_HOLDERS | Maximum number of holders. |
| MIN_HOLDERS | Minimum number of holders. |
| MAX_ACC_ADULTS | Maximum number of accompanying adults. |
| MIN_ACC_ADULTS | Minimum number of accompanying adults. |
| MAX_ADULTS | Maximum number of adults. |
| MIN_ADULTS | Minimum number of adults. |
| MAX_CHILDREN | Maximum number of children. |
| MIN_CHILDREN | Minimum number of children. |
| PRICE | Railcard price in pence. |
| DISCOUNT_PRICE | Discount price in pence. |
| VALIDITY_PERIOD | Validity period. |
| LAST_VALID_DATE | Last valid date. Format is ddmmyyyy. |
| PHYSICAL_CARD | Physical card indicator. |
| CAPRI_TICKET_TYPE | CAPRI ticket type. |
| ADULT_STATUS | Adult status code. |
| CHILD_STATUS | Child status code. |
| AAA_STATUS | AAA status code. |

## Relationships
- `RAILCARD_CODE` is referenced in `railcard_minimum_fare`, `rover_price`, and other tables.
- `MASTER_CODE` may link to other railcard records.
- `ADULT_STATUS`, `CHILD_STATUS`, and `AAA_STATUS` link to status definitions. 