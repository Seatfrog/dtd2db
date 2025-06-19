# Non-Standard Discounts

**Description:**  
Defines non-standard discount rules for specific origin-destination pairs, routes, railcards, and ticket types.

## Non-Standard Discount Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'N'. |
| ORIGIN_CODE | Origin location code (NLC). |
| DESTINATION_CODE | Destination location code (NLC). |
| ROUTE_CODE | Route code. |
| RAILCARD_CODE | Railcard code. |
| TICKET_CODE | Ticket code (links to ticket_type). |
| END_DATE | End date for the discount. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the discount. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| USE_NLC | Use NLC indicator. |
| ADULT_NODIS_FLAG | Adult no discount flag. |
| ADULT_ADD_ON_AMOUNT | Adult add-on amount in pence. |
| ADULT_REBOOK_FLAG | Adult rebook flag. |
| CHILD_NODIS_FLAG | Child no discount flag. |
| CHILD_ADD_ON_AMOUNT | Child add-on amount in pence. |
| CHILD_REBOOK_FLAG | Child rebook flag. |

## Relationships
- `ORIGIN_CODE` and `DESTINATION_CODE` link to `location`.
- `ROUTE_CODE` links to `route`.
- `RAILCARD_CODE` links to `railcard`.
- `TICKET_CODE` links to `ticket_type`. 