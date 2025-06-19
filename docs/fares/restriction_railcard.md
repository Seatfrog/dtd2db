# Restriction Railcards

**Description:**  
Defines railcard-specific restrictions, allowing certain railcards to be restricted on specific tickets, routes, or locations.

## Restriction Railcard Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'RR'. |
| CF_MKR | Control file marker ('C' for current, 'F' for future). |
| RAILCARD_CODE | Railcard code. |
| SEQUENCE_NO | Sequence number for ordering restrictions. |
| TICKET_CODE | Ticket code that is restricted. |
| ROUTE_CODE | Route code that is restricted. |
| LOCATION | Location code that is restricted. |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| TOTAL_BAN | Total ban indicator. |

## Relationships
- `RAILCARD_CODE` links to railcard definitions.
- `TICKET_CODE` links to `ticket_type`.
- `RESTRICTION_CODE` links to `restriction_header`. 