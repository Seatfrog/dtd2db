# Status

**Description:**  
Defines status codes used in the fares system, including descriptions and fare limits for different ticket statuses.

## Status Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| STATUS_CODE | Status code (primary key). |
| END_DATE | End date for the status. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the status. Format is ddmmyyyy. |
| ATB_DESC | ATB description. |
| CC_DESC | CC description. |
| UTS_CODE | UTS code. |
| FIRST_SINGLE_MAX_FLAT | First class single maximum flat fare in pence. |
| FIRST_RETURN_MAX_FLAT | First class return maximum flat fare in pence. |
| STD_SINGLE_MAX_FLAT | Standard class single maximum flat fare in pence. |
| STD_RETURN_MAX_FLAT | Standard class return maximum flat fare in pence. |
| FIRST_LOWER_MIN | First class lower minimum fare in pence. |
| FIRST_HIGHER_MIN | First class higher minimum fare in pence. |
| STD_LOWER_MIN | Standard class lower minimum fare in pence. |
| STD_HIGHER_MIN | Standard class higher minimum fare in pence. |
| FS_MKR | First single marker. |
| FR_MKR | First return marker. |
| SS_MKR | Standard single marker. |
| SR_MKR | Standard return marker. |

## Status Discount Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'D'. |
| STATUS_CODE | Status code (links to Status record). |
| END_DATE | End date for the status discount. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the status discount. Format is ddmmyyyy. |
| DISCOUNT_CODE | Discount code. |
| DISCOUNT_AMOUNT | Discount amount in pence. |

## Relationships
- `STATUS_CODE` is referenced in `status_discount` and other tables.
- `STATUS_CODE` is referenced in `flow` table for fare status codes. 