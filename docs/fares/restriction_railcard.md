# Restriction Railcards

**Config file:**
RST.ts

**Snowflake table name:**
restriction_railcard

**Description:**  
Defines railcard-specific restrictions, allowing certain railcards to be restricted on specific tickets, routes, or locations.

**Rate of change:** Approximately three times per week.

## RR – Railcard Restriction Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'RR'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RAILCARD_CODE | Railcard code. |
| SEQUENCE_NO | Numeric sequence number. Several railcard restrictions may apply with the same railcard code; this field is used to uniquely identify them. |
| TICKET_CODE | Ticket code. The railcard restriction applies to this ticket code. If spaces, then the railcard restriction applies to all ticket types. |
| ROUTE_CODE | Route code. The railcard restriction applies to this route code. If spaces, then the railcard restriction applies to all routes. |
| LOCATION | CRS code of a location. The railcard restriction applies if the journey originates at this location. If spaces, then the railcard restriction applies to all locations. |
| RESTRICTION_CODE | Restriction which may apply if TOTAL_BAN is not set to 'Y'. If TOTAL_BAN is set to 'Y', then this field will contain spaces. |
| TOTAL_BAN | 'Y' or space. 'Y' indicates that the railcard cannot be used. Space indicates that the restriction code must be checked when this railcard is used. |

## Relationships
- `RAILCARD_CODE` links to railcard definitions.
- `TICKET_CODE` links to `ticket_type` table.
- `RESTRICTION_CODE` links to `restriction_header` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (RR records within RST file) 