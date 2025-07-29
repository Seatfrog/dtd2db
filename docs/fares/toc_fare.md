# TOC Fares

**Config file:**
TOC.ts

**Snowflake table name:**
toc_fare

**Description:**  
Defines fare TOC details. These records are used in the Flow file to identify which TOC is responsible for the fares on a flow.

**Rate of change:** Infrequent.

## F – Fare TOC Record

| Field Name | Description |
|------------|-------------|
| RECORD_TYPE | Contains 'F'. |
| FARE_TOC_ID | TOC identifier. Used in Flow file to identify which TOC is responsible for the fares on this flow. |
| TOC_ID | TOC identifier. Used in CIF to identify the trains of a particular TOC. This field may be blank if the Fare TOC id does not relate to a specific carrier. |
| FARE_TOC_NAME | TOC name. |

## Relationships
- `FARE_TOC_ID` is referenced in `flow` table for fare-setting TOCs.
- `TOC_ID` links to the `toc` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (F records within TOC file) 