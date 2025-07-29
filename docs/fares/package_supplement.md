# Package Supplements

**Config file:**
TPK.ts

**Snowflake table name:**
package_supplement

**Description:**  
Links packages to supplements, defining which supplements are available for each package. Package Supplement records are linked to the associated Package record using the PACKAGE_CODE and END_DATE fields.

**Rate of change:** Approximately 6-10 times per month.

## Package Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| PACKAGE_CODE | 3-character package code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| SUPPLEMENT_CODE | Supplement code identifying a supplement contained in the package. |
| DIRECTION | Valid values are 'O', 'R', 'B' or 'E' (Outward, Return, Both or Either) and denotes on which part of the journey the supplement is available. |
| PACK_NUMBER | Indicates the number of supplements 'per package' (regardless of the number of passengers). |
| ORIGIN_FACILITY | A code to indicate a facility which must exist at the journey origin for the supplement to be available. The journey origin is deemed to be the origin of the Outward journey. May be a space. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| DEST_FACILITY | A code to indicate a facility which must exist at the journey destination for the supplement to be available. The journey destination is deemed to be the destination of the Outward journey. May be a space. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |

## Relationships
- `PACKAGE_CODE` links to `package` table.
- `SUPPLEMENT_CODE` links to `supplement` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TPK
- **Typical Size:** 2Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (S records within TPK file) 