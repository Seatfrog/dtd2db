# Restriction Train Quotas

**Description:**  
Defines quota restrictions for specific trains at specific locations, allowing restrictions on seat availability and quota management.

## Restriction Train Quota Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'SQ'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| TRAIN_NO | Train number (links to restriction_train). |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| LOCATION | Location code where quota applies. |
| QUOTA_IND | Quota indicator. |
| ARR_DEP | Arrival/Departure indicator ('A' for arrival, 'D' for departure). |

## Relationships
- `RESTRICTION_CODE` and `TRAIN_NO` link to `restriction_train`.
- `LOCATION` links to location tables. 