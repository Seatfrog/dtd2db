# Fare

**Description:**  
Fare records are linked to the associated flow record using the FLOW_ID field. These records define the actual fare amounts for specific flows and ticket types.

## Fare Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'T'. |
| FLOW_ID | Uniquely identifies the flow to which the fare pertains. |
| TICKET_CODE | 3-character ticket code for the fare. |
| FARE | Fare in pence. |
| RESTRICTION_CODE | Restriction code associated with this fare. |

## Relationships
- `FLOW_ID` links to `flow` table.
- `TICKET_CODE` links to `ticket_type` table.
- `RESTRICTION_CODE` links to `restriction_header` table. 