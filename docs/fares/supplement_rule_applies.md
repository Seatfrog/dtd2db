# Supplement Rule Applies

**Description:**  
Defines which supplement rules apply to which supplements and under what conditions.

## Supplement Rule Applies Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'A'. |
| SUPPLEMENT_CODE | Supplement code (links to supplement). |
| RULE_CODE | Rule code (links to supplement rule). |
| END_DATE | End date for the rule application. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the rule application. Format is ddmmyyyy. |
| APPLIES_TO | Indicates what the rule applies to. |

## Relationships
- `SUPPLEMENT_CODE` links to `supplement`.
- `RULE_CODE` links to `supplement_rule`. 