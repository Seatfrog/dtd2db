# Restriction Time TOCs

**Config file:**
RST.ts

**Snowflake table name:**
restriction_time_toc

**Description:**  
Links time-based restrictions to specific Train Operating Companies (TOCs), allowing restrictions to be applied only to certain operators. These records are linked to the associated Time Restriction record using the CF_MKR, RESTRICTION_CODE and SEQUENCE_NO fields.

**Rate of change:** Approximately three times per week.

## Restriction Time TOC Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TT'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code. |
| SEQUENCE_NO | Numeric sequence number. Several time restrictions may apply with the same restriction code; this field is used to uniquely identify them. |
| OUT_RET | 'O' or 'R', to indicate whether the restriction applies to outward journeys or return journeys. |
| TOC_CODE | TOC code. The time restriction only applies to trains provided by this TOC. |

## Relationships
- `CF_MKR`, `RESTRICTION_CODE` and `SEQUENCE_NO` link to `restriction_time` table.
- `TOC_CODE` links to TOC definitions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (TT records within RST file) 