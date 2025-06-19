# TOC Fares

**Description:**  
Defines fares that are specific to particular Train Operating Companies (TOCs).

## TOC Fare Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'F'. |
| TOC_CODE | TOC code (links to toc). |
| FARE_CODE | Fare code. |
| FARE_AMOUNT | Fare amount in pence. |

## Relationships
- `TOC_CODE` links to `toc`. 