# Supplements

**Description:**  
Defines supplements that can be added to tickets, providing additional services or facilities beyond basic rail travel.

## Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| SUPPLEMENT_CODE | Supplement code (primary key). |
| END_DATE | End date for the supplement. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the supplement. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| DESCRIPTION | Description of the supplement. |
| SHORT_DESC | Short description. |
| SUPPL_TYPE | Supplement type. |
| PRICE | Price of the supplement in pence. |
| CPF_TICKET_TYPE | CPF ticket type. |
| MIN_GROUP_SIZE | Minimum group size. |
| MAX_GROUP_SIZE | Maximum group size. |
| PER_LEG_OR_DIR | Per leg or direction indicator. |
| CLASS_TYPE | Class type. |
| CAPRI_CODE | CAPRI code. |
| SEP_TKT_IND | Separate ticket indicator. |
| RESVN_TYPE | Reservation type. |
| SUNDRY_CODE | Sundry code. |

## Supplement Rule Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| SUPPLEMENT_CODE | Supplement code (links to Supplement record). |
| END_DATE | End date for the supplement rule. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the supplement rule. Format is ddmmyyyy. |
| RULE_CODE | Rule code. |
| RULE_DESCRIPTION | Rule description. |

## Rule Applies Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'A'. |
| SUPPLEMENT_CODE | Supplement code (links to Supplement record). |
| RULE_CODE | Rule code (links to Supplement Rule record). |
| END_DATE | End date for the rule application. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the rule application. Format is ddmmyyyy. |
| APPLIES_TO | Indicates what the rule applies to. |

## Rule Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'U'. |
| SUPPLEMENT_CODE | Supplement code (links to Supplement record). |
| RULE_CODE | Rule code (links to Supplement Rule record). |
| END_DATE | End date for the rule supplement. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the rule supplement. Format is ddmmyyyy. |
| RELATED_SUPPLEMENT | Related supplement code. |

## Relationships
- `SUPPLEMENT_CODE` is referenced in `supplement_rule_supplement`, `supplement_override`, and other tables.
- `RULE_CODE` links supplement rules to their applications and related supplements. 