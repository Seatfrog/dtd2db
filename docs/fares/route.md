# Routes

**Description:**  
Defines routes used in the fares system, including descriptions and UTS (Urban Transport System) information.

## Route Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| ROUTE_CODE | Route code (primary key). |
| END_DATE | End date for the route. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the route. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| DESCRIPTION | Description of the route. |
| ATB_DESC_1 | ATB description 1. |
| ATB_DESC_2 | ATB description 2. |
| ATB_DESC_3 | ATB description 3. |
| ATB_DESC_4 | ATB description 4. |
| CC_DESC | CC description. |
| AAA_DESC | AAA description. |
| UTS_MODE | UTS mode. |
| UTS_ZONE_1 | UTS zone 1 indicator. |
| UTS_ZONE_2 | UTS zone 2 indicator. |
| UTS_ZONE_3 | UTS zone 3 indicator. |
| UTS_ZONE_4 | UTS zone 4 indicator. |
| UTS_ZONE_5 | UTS zone 5 indicator. |
| UTS_ZONE_6 | UTS zone 6 indicator. |
| UTS_NORTH | UTS north coordinate. |
| UTS_EAST | UTS east coordinate. |
| UTS_SOUTH | UTS south coordinate. |
| UTS_WEST | UTS west coordinate. |

## Route Include/Exclude Locations Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'L'. |
| ROUTE_CODE | Route code (links to Route record). |
| END_DATE | End date for the route location. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the route location. Format is ddmmyyyy. |
| LOCATION_CODE | Location code (NLC or UIC). |
| INCLUDE_EXCLUDE | Include/exclude indicator ('I' or 'E'). |

## Relationships
- `ROUTE_CODE` is referenced in `route_location`, `flow`, and other tables.
- `LOCATION_CODE` links to `location` table. 