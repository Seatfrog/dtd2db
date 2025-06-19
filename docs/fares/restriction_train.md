# Train Restrictions

**Description:**  
Defines train-specific restrictions, allowing restrictions to be applied to specific train numbers.

## Train Restriction Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'T'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code (links to restriction_header). |
| TRAIN_NO | Train number. |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| QUOTA_IND | Quota indicator. |
| SLEEPER_IND | Sleeper indicator. |

## Train Restriction Date Bands Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'D'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code (links to restriction_header). |
| TRAIN_NO | Train number (links to Train Restriction record). |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| END_DATE | End date for the date band. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the date band. Format is ddmmyyyy. |
| DAY_MASK | Day mask indicating which days of the week the restriction applies. |

## Train Restriction Quota Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'Q'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code (links to restriction_header). |
| TRAIN_NO | Train number (links to Train Restriction record). |
| OUT_RET | Outbound/Return indicator ('O' for outbound, 'R' for return). |
| QUOTA_AMOUNT | Quota amount. |

## Relationships
- `RESTRICTION_CODE` links to `restriction_header`.
- `TRAIN_NO` links train restriction records to their date bands and quota restrictions. 