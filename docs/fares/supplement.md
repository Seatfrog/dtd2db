# Supplements

**Config file:**
SUP.ts

**Snowflake table name:**
supplement

**Description:**  
Defines supplements that can be added to tickets, providing additional services or facilities beyond basic rail travel.

**Rate of change:** Approximately 10 times per month.

## Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| SUPPLEMENT_CODE | 3-character supplement code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be queried. Format is ddmmyyyy. |
| DESCRIPTION | Textual description of the supplement. |
| SHORT_DESC | Short description of the supplement. |
| SUPPL_TYPE | 3-character supplement type code. |
| PRICE | Price of the supplement in pence. |
| CPF_TICKET_TYPE | Permitted values are '00' and '01', used when making reservations for this supplement. 00 = Other, 01 = Sleeper Solo: Note. The only gender that should be used for the reservation request is 'Solo'. No other gender request should be made. This performs a special function in RARS2 as it prevents any other beds in the room from being sold. Also, if two tickets are purchased these will be placed in separate rooms not together in the same room. |
| MIN_GROUP_SIZE | Minimum group size for the supplement. |
| MAX_GROUP_SIZE | Maximum group size for the supplement. |
| PER_LEG_OR_DIR | Per leg or direction indicator. |
| CLASS_TYPE | Class type indicator. |
| CAPRI_CODE | CAPRI code for the supplement. |
| SEP_TKT_IND | Separate ticket indicator. |
| RESVN_TYPE | Reservation type code. |
| SUNDRY_CODE | Accounting code for supplement recognised by accounting system. Note that if CAPRI code is supplied then sundry code will be spaces. |

#

## Relationships
- `SUPPLEMENT_CODE` links to various supplement-related tables.
- `RULE_NUMBER` links supplement rules to their applications and related supplements.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.SUP
- **Typical Size:** 8Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (S, R, A, M, O records) 