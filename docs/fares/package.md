# Packages

**Config file:**
TPK.ts

**Snowflake table name:**
package

**Description:**  
Defines travel packages that include additional facilities or services beyond basic rail travel.

**Rate of change:** Approximately 6-10 times per month.

## Package Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'P'. |
| PACKAGE_CODE | 3-character package code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be queried. Format is ddmmyyyy. |
| RESTRICTION_CODE | 2-character restriction code. May contain spaces if no restriction applies to this package. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| ORIGIN_FACILITIES | Up to 26 values, each of which may be space. Any which are not space are compared with the facilities at the journey origin. If the journey origin does not have this facility, then the package is not available. The journey origin is deemed to be the origin of the Outward or Return journey, as appropriate. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| DESTINATION_FACILITIES | Up to 26 values, each of which may be space. Any which are not space are compared with the facilities at the journey destination. If the journey destination does not have this facility, then the package is not available. The journey destination is deemed to be the destination of the Outward or Return journey, as appropriate. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |

## Relationships
- `PACKAGE_CODE` links between `package` and `package_supplement` tables.
- `RESTRICTION_CODE` links to `restriction_header` table.
- `SUPPLEMENT_CODE` links to `supplement` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TPK
- **Typical Size:** 2Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (P and S records) 