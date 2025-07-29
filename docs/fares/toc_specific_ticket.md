# TOC Specific Tickets

**Config file:**
TSP.ts

**Snowflake table name:**
toc_specific_ticket

**Description:**  
This file contains details of tickets which may only be used on the trains of specific TOCs.

**Rate of change:** Once per month (estimate)

## TOC Specific Ticket Record

| Field Name | Description |
|------------|-------------|
| TICKET_CODE | Ticket Code |
| RESTRICTION_CODE | Restriction code or spaces. |
| RESTRICTION_FLAG | Values are '0', '1' or '2'. '0' indicates that the TOC Specific Ticket details apply to this ticket/restriction code (above). '1' indicates that the TOC Specific Ticket details apply to this ticket when it is not restricted. '2' indicates that the TOC Specific Ticket details apply to this ticket regardless of restriction. |
| DIRECTION | 'O', 'R' or 'B', to indicate that the TOC Specific Ticket details apply to Outward journeys, Return journeys or Both. |
| TOC_ID | TOC code or spaces. Spaces indicate that the TOC Specific Ticket details in this record apply to all (connecting) TOCs. This field will not be spaces if the TOC_TYPE is set to 'M'. |
| TOC_TYPE | 'M' indicates a Main TOC. This ticket can be used only where the trains used on the journey include a Main TOC. 'C' indicates a Connecting TOC. This ticket can be used on the trains of a connecting TOC, provided that the journey includes a train of one of the main TOCs. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| SLEEPER_MKR | 'Y' or 'N'. Indicates whether sleeper accommodation is required on the leg provided by this TOC. |
| INC_EXC_STOCK | 'I' or 'E'. 'I' indicates that the TOC Specific Ticket details apply only to the stock types in the STOCK_LIST. If the STOCK_LIST field is empty, then the TOC Specific Ticket details apply to all stock types. 'E' indicates that the TOC Specific Ticket details apply to all stock types except those in the STOCK_LIST. A value will be supplied for STOCK_LIST whenever this field is set to 'E'. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'I' for new records. |
| STOCK_LIST | A comma separated list of stock types. Valid stock types are currently 'DMU','HST','DME','DMS','DMA','D','E','ED','DEM','EMU','EML'. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |

## Relationships
- `TICKET_CODE` links to `ticket_type`.
- `RESTRICTION_CODE` links to `restriction_header`.
- `TOC_ID` links to `toc`.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TSP
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 