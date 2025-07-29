# Route Locations

**Config file:**
RTE.ts

**Snowflake table name:**
route_location

**Description:**  
Links routes to specific locations, defining which stations are included or excluded from each route. These records are linked to the associated Route record using the ROUTE_CODE and END_DATE fields.

**Rate of change:** Approximately 6 times per month.

## L – Route Include/Exclude Locations Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'L'. |
| ROUTE_CODE | 5-digit route code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| ADMIN_AREA_CODE | Area Admin Code of location which is included in/excluded from this route. |
| NLC_CODE | NLC code of location which is included in/excluded from this route. |
| CRS_CODE | CRS code of location which is included in/excluded from this route. |
| INCL_EXCL | Values are 'I' or 'E', to indicate whether the location is included in or excluded from the route. |

## Relationships
- `ROUTE_CODE` links to the `route` table.
- `NLC_CODE` and `CRS_CODE` link to `location` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RTE
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (L records within RTE file) 