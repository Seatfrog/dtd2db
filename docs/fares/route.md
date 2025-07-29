# Routes

**Config file:**
RTE.ts

**Snowflake table name:**
route

**Description:**  
Defines routes used in the fares system, including descriptions and UTS (Urban Transport System) information.

**Rate of change:** Approximately 6 times per month.

## R – Route Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| ROUTE_CODE | 5-digit route code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be queried. Format is ddmmyyyy. |
| DESCRIPTION | Route description. |
| ATB_DESC_1 | First line of route description to be printed on ATB tickets. |
| ATB_DESC_2 | Second line of route description to be printed on ATB tickets. |
| ATB_DESC_3 | Third line of route description to be printed on ATB tickets. |
| ATB_DESC_4 | Fourth line of route description to be printed on ATB tickets. |
| CC_DESC | Route description to be printed on credit card size tickets. |
| AAA_DESC | Alternative Availability description for season tickets (those which allow travel from more than one station). Spaces are permitted. |
| UTS_MODE | Used for magnetic stripe encoding. Values are 'U' (underground only), 'R' (rail, underground and bus), 'B' (bus only) or space where none of the above apply. Any other values in this field should be treated as space (this information is supplied from the source system, and is not validated by DTD). |
| UTS_ZONE_1 | Values 'Y' or 'N' to indicate whether a fare with this route includes travel in this zone. Values used in magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| UTS_ZONE_2 | Values 'Y' or 'N' to indicate whether a fare with this route includes travel in this zone. Values used in magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| UTS_ZONE_3 | Values 'Y' or 'N' to indicate whether a fare with this route includes travel in this zone. Values used in magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| UTS_ZONE_4 | Values 'Y' or 'N' to indicate whether a fare with this route includes travel in this zone. Values used in magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| UTS_ZONE_5 | Values 'Y' or 'N' to indicate whether a fare with this route includes travel in this zone. Values used in magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| UTS_ZONE_6 | Values 'Y' or 'N' to indicate whether a fare with this route includes travel in this zone. Values used in magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| UTS_NORTH | Contains a code used in LUL magnetic stripe encoding. |
| UTS_EAST | Contains a code used in LUL magnetic stripe encoding. |
| UTS_SOUTH | Contains a code used in LUL magnetic stripe encoding. |
| UTS_WEST | Contains a code used in LUL magnetic stripe encoding. |

## Relationships
- `ROUTE_CODE` is referenced in `route_location`, `flow`, and other tables.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RTE
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (R records within RTE file) 