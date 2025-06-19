# Supplement Rules

**Description:**  
Defines rules that govern the application of supplements to fares.

## Supplement Rule Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| SUPPLEMENT_CODE | Supplement code (links to supplement). |
| END_DATE | End date for the supplement rule. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the supplement rule. Format is ddmmyyyy. |
| RULE_CODE | Rule code. |
| RULE_DESCRIPTION | Rule description. |

## Relationships
- `SUPPLEMENT_CODE` links to `supplement`. 