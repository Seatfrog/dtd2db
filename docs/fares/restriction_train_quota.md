# Restriction Train Quotas

**Config file:**
RST.ts

**Snowflake table name:**
restriction_train_quota

**Description:**  
Defines quota restrictions for specific trains at specific locations, allowing restrictions on seat availability and quota management. These records are linked to the associated Train Restriction record using the CF_MKR, RESTRICTION_CODE, TRAIN_NO and OUT_RET fields.

**Rate of change:** Approximately three times per week.

## SQ – Train Restriction Quota Exemption Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'SQ'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code. |
| TRAIN_NO | Train UID. |
| OUT_RET | 'O' or 'R', to indicate whether the restriction applies to outward journeys or return journeys. |
| LOCATION | CRS code indicating a location at which the fare is restricted or quota controlled if this train restriction applies. Note: this field is obsolete and will be set to a space for all new restrictions. |
| QUOTA_IND | 'Q', 'R' or space. 'Q' indicates quota controlled, 'R' indicates restricted. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| ARR_DEP | 'A', 'D' or 'B' to indicate whether the restriction applies to arrivals at this location, departures from this location, or both. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |

## Relationships
- `CF_MKR`, `RESTRICTION_CODE`, `TRAIN_NO` and `OUT_RET` link to `restriction_train` table.
- `LOCATION` links to location tables.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (SQ records within RST file) 