# Train Operating Companies (TOCs)

**Config file:**
TOC.ts

**Snowflake table name:**
toc

**Description:**  
Defines Train Operating Companies (TOCs) with their names and active status.

**Rate of change:** Infrequent.

## T – TOC Record

| Field Name | Description |
|------------|-------------|
| RECORD_TYPE | Contains 'T'. |
| TOC_ID | TOC identifier. Used in CIF to identify the trains of a particular TOC. |
| TOC_NAME | TOC name. |
| RESERVATION_SYSTEM | Not used at present. Allows a reservation system to be supplied for a particular TOC. |
| ACTIVE_INDICATOR | Indicates whether this is an active entry ('Y' or 'N'). |

## Relationships
- `TOC_ID` is referenced in `toc_fare`, `advance_ticket`, `toc_specific_ticket`, and other tables.
- `TOC_ID` is referenced in `flow` table for fare-setting TOCs.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (T records within TOC file) 