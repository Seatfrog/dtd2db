# Fare Route Restriction

**Config file:**
FRR.ts

**Snowflake table name:**
fare_route_restriction

**Description:**  
Defines route-specific restrictions for fares, allowing restrictions to be applied to specific routes and directions.

## Fare Route Restriction Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'FRR'. |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| END_DATE | End date for the restriction. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the restriction. Format is ddmmyyyy. |
| ROUTE_CODE | Route code (links to route). |
| DIRECTION | Direction indicator. |
| RESTRICTION_TYPE | Type of restriction applied. |
| RESTRICTION_VALUE | Value associated with the restriction. |

## Relationships
- `RESTRICTION_CODE` links to `restriction_header`.
- `ROUTE_CODE` links to `route` table.
- Used in conjunction with other restriction tables to define comprehensive travel restrictions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.FRR
- **Typical Size:** 14Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 