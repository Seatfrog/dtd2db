# TOC Specific Tickets

**Description:**  
Defines tickets that are specific to particular Train Operating Companies (TOCs).

## TOC Specific Ticket Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'T'. |
| TICKET_CODE | Ticket code (links to ticket_type). |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| RESTRICTION_FLAG | Restriction flag indicator. |
| DIRECTION | Direction indicator. |
| TOC_ID | TOC ID (links to toc). |
| TOC_TYPE | TOC type indicator. |
| END_DATE | End date for the TOC specific ticket. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the TOC specific ticket. Format is ddmmyyyy. |
| SLEEPER_MKR | Sleeper marker indicator. |
| INC_EXC_STOCK | Include/exclude stock indicator. |
| STOCK_LIST | List of stock codes. |

## Relationships
- `TICKET_CODE` links to `ticket_type`.
- `RESTRICTION_CODE` links to `restriction_header`.
- `TOC_ID` links to `toc`. 