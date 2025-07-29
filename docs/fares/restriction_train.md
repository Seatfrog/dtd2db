# Train Restrictions

**Config file:**
RST.ts

**Snowflake table name:**
restriction_train

**Description:**  
Defines train-specific restrictions, allowing restrictions to be applied to specific train numbers.

**Rate of change:** Approximately three times per week.

## SR – Train Restriction Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'SR'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code. |
| TRAIN_NO | Train UID. |
| OUT_RET | 'O' or 'R', to indicate whether the restriction applies to outward journeys or return journeys. |
| QUOTA_IND | 'Y' or 'N'. Used with Train Restriction quota data records to determine whether the fare is restricted or quota controlled. Note – this field is obsolete. Within PMS, the attribute is deprecated and will be set to 'N' for all new restrictions. |
| SLEEPER_IND | 'Y' or 'N' to indicate whether the restriction applies to sleeper only trains. |

## Relationships
- `RESTRICTION_CODE` links to `restriction_header` table.
- `TRAIN_NO` links to train restriction date bands and quota restrictions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (SR records within RST file) 