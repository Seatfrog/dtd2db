# Restriction Time TOCs

**Description:**  
Links time-based restrictions to specific Train Operating Companies (TOCs), allowing restrictions to be applied only to certain operators.

## Restriction Time TOC Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TT'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| SEQUENCE_NO | Sequence number (links to restriction_time). |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| TOC_CODE | Train Operating Company code. |

## Relationships
- `RESTRICTION_CODE` and `SEQUENCE_NO` link to `restriction_time`.
- `TOC_CODE` links to TOC definitions. 