# Status Discounts

**Description:**  
Defines discounts that apply to specific status codes, allowing for status-based fare reductions.

## Status Discount Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'D'. |
| STATUS_CODE | Status code (links to status). |
| END_DATE | End date for the status discount. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| DISCOUNT_CATEGORY | Discount category code. |
| DISCOUNT_INDICATOR | Discount indicator. |
| DISCOUNT_PERCENTAGE | Discount percentage. |

## Relationships
- `STATUS_CODE` links to `status`. 