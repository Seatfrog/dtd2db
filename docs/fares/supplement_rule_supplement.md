# Supplement Rule Supplement

**Description:**  
Links supplement rules to specific supplements, defining which supplements are governed by which rules.

## Supplement Rule Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'U'. |
| SUPPLEMENT_CODE | Supplement code (links to supplement). |
| RULE_CODE | Rule code (links to supplement rule). |
| END_DATE | End date for the rule supplement. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the rule supplement. Format is ddmmyyyy. |
| RELATED_SUPPLEMENT | Related supplement code. |

## Relationships
- `SUPPLEMENT_CODE` links to `supplement`.
- `RULE_CODE` links to `supplement_rule`. 