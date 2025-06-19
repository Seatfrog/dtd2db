# Route Locations

**Description:**  
Links routes to specific locations, defining which stations are included or excluded from each route.

## Route Location Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'L'. |
| ROUTE_CODE | Route code (links to route). |
| END_DATE | End date for the route-location link. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| ADMIN_AREA_CODE | Administrative area code. |
| NLC_CODE | National Location Code. |
| CRS_CODE | CRS code. |
| INCL_EXCL | Include/exclude indicator ('I' for include, 'E' for exclude). |

## Relationships
- `ROUTE_CODE` links to `route`.
- `NLC_CODE` and `CRS_CODE` link to `location`. 