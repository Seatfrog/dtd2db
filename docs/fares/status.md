# Status

**Config file:**
DIS.ts

**Snowflake table name:**
status

**Description:**  
Defines status codes used in the fares system, including descriptions and fare limits for 
different ticket statuses. 

**Rate of change:** Approximately once per month.

## Status Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| STATUS_CODE | 3-character status code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| ATB_DESC | Description to be printed on ATB size (airline) tickets. Spaces are permitted. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| CC_DESC | Description to be printed on credit card size tickets. Spaces are permitted. |
| UTS_CODE | UTS code, used in LUL magnetic stripe encoding. |
| FIRST_SINGLE_MAX_FLAT | Contains either the maximum fare to be charged following discount for a first-class single ticket, or a first class single flat fare, depending on how the discount is applied, in pence. Contains zero if neither of the above is applicable. |
| FIRST_RETURN_MAX_FLAT | Contains either the maximum fare to be charged following discount for a first class return ticket, or a first class return flat fare, depending on how the discount is applied, in pence. Contains zero if neither of the above is applicable. |
| STD_SINGLE_MAX_FLAT | Contains either the maximum fare to be charged following discount for a standard class single ticket, or a standard class single flat fare, depending on how the discount is applied, in pence. Contains zero if neither of the above is applicable. |
| STD_RETURN_MAX_FLAT | Contains either the maximum fare to be charged following discount for a standard class return ticket, or a standard class return flat fare, depending on how the discount is applied, in pence. Contains zero if neither of the above is applicable. |
| FIRST_LOWER_MIN | First class lower minimum fare in pence. |
| FIRST_HIGHER_MIN | First class higher minimum fare in pence. |
| STD_LOWER_MIN | Standard class lower minimum fare in pence. |
| STD_HIGHER_MIN | Standard class higher minimum fare in pence. |
| FS_MKR | First single marker. |
| FR_MKR | First return marker. |
| SS_MKR | Standard single marker. |
| SR_MKR | Standard return marker. |

## Relationships
- `STATUS_CODE` links to `status_discount` table.
- `STATUS_CODE` is referenced in `flow` table for fare status codes.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.DIS
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (S records within DIS file) 