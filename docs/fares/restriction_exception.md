# Restriction Exceptions

**Description:**  
Defines exception codes that can be used to override or modify standard restrictions.

## Restriction Exception Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'EC'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| EXCEPTION_CODE | Exception code. |
| DESCRIPTION | Description of the exception. |

## Relationships
- Exception codes may be referenced in other restriction tables. 