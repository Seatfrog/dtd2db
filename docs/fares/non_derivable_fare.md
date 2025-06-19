# Non-Derivable Fares

**Description:**  
Domestic non-derivable fares, i.e. those which are not included in the flow file, and those which cannot be discounted in the normal way.

**Rate of change:** 3 times per year.

## Non-Derivable Fares Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'N'. |
| ORIGIN_CODE | Origin location code (NLC). |
| DESTINATION_CODE | Destination location code (NLC). |
| ROUTE_CODE | Route code. |
| RAILCARD_CODE | Railcard code. |
| TICKET_CODE | Ticket code (links to ticket_type). |
| ND_RECORD_TYPE | Non-derivable record type. |
| END_DATE | End date for the fare. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the fare. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| SUPPRESS_MKR | Suppress marker. |
| ADULT_FARE | Adult fare amount in pence. |
| CHILD_FARE | Child fare amount in pence. |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| COMPOSITE_INDICATOR | Composite indicator. |
| CROSS_LONDON_IND | Cross-London indicator. |
| PS_IND | PS indicator. |

## Non-Derivable Fare Overrides Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'O'. |
| ORIGIN_CODE | Origin location code (NLC). |
| DESTINATION_CODE | Destination location code (NLC). |
| ROUTE_CODE | Route code. |
| RAILCARD_CODE | Railcard code. |
| TICKET_CODE | Ticket code (links to ticket_type). |
| ND_RECORD_TYPE | Non-derivable record type. |
| END_DATE | End date for the fare override. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the fare override. Format is ddmmyyyy. |
| SUPPRESS_MKR | Suppress marker. |
| ADULT_FARE | Adult fare amount in pence. |
| CHILD_FARE | Child fare amount in pence. |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| COMPOSITE_INDICATOR | Composite indicator. |
| CROSS_LONDON_IND | Cross-London indicator. |
| PS_IND | PS indicator. |

## Relationships
- `ORIGIN_CODE` and `DESTINATION_CODE` link to `location`.
- `ROUTE_CODE` links to `route`.
- `RAILCARD_CODE` links to `railcard`.
- `TICKET_CODE` links to `ticket_type`.
- `RESTRICTION_CODE` links to `restriction_header`.
- Override records take precedence over base non-derivable fare records. 