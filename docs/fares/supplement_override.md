# Supplement Overrides

**Description:**  
Defines overrides for supplement records, allowing specific supplements to be overridden for certain conditions.

## Supplement Override Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'O'. |
| SUPPLEMENT_CODE | Supplement code (links to supplement). |
| END_DATE | End date for the override. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the override. Format is ddmmyyyy. |
| OVERRIDE_TYPE | Type of override. |
| OVERRIDE_VALUE | Value for the override. |

## Relationships
- `SUPPLEMENT_CODE` links to `supplement`. 