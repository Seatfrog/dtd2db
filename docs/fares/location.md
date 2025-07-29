# Location

**Config file:**
LOC.ts

**Snowflake table name:**
location

**Description:**  
This file holds details of locations. It contains 6 record types: 'Location' records, 'Associated Stations' records, 'Railcard Geography' records, 'TT Group Location' records, 'Group Members' records and 'Synonym' records.

**Rate of change:** Approximately 12 times per month.

## L – Location Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'L'. |
| UIC_CODE | A unique code which identifies this location. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be queried. Format is ddmmyyyy. |
| ADMIN_AREA_CODE | Administrative area code (e.g. '70 ' = Britain). |
| NLC_CODE | National location code, for British locations only. No value is output in this field for non-GB locations. |
| DESCRIPTION | Location description. All Plusbus locations include '+BUS' or '+BUSWM' somewhere in the description. |
| CRS_CODE | Where present, gives the CRS code. Contains spaces for locations with no CRS code. |
| RESV_CODE | The international reservation code. |
| ERS_COUNTRY | Along with the ERS Code this forms a reference to the location for use by Eurostar Reservation System. |
| ERS_CODE | Along with the ERS Country this forms a reference to the location for use by Eurostar Reservation System. |
| FARE_GROUP | LOC-FARE-GROUP is always populated for BR locations. It is the same as LOC-NLC for locations which are not a member of a fare group, otherwise it contains a group NLC code, e.g. '1072' = London. |
| COUNTY | Used to decide if a location is in Scotland, England & Wales or elsewhere. County codes on the mainland are all numeric values. Other values are 'NI' (Northern Ireland), 'IR' (Ireland), 'CI' (Channel Islands). |
| PTE_CODE | Code for the transport authority associated with the location (e.g. 'GM' = Greater Manchester). Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| ZONE_NO | NLC code that matches a Zone location where the ZONE-IND = 1 to 6. Other values are not used. Spaces are permitted. |
| ZONE_IND | The Zone number. Permitted values are 1, 2, 3, 4, 5, 6, R, U and space. Where ZONE-IND is not space, then ZONE-NO is an NLC code, representing a travelcard location. |
| REGION | Identifies the region using a code: '0' = non-BR or LUL, '1' = ER, '2' = LMR, '3' = SCR, '4' = SR, '5' = WR and '6' = LUL. |
| HIERARCHY | Where the location fits in the hierarchy of location types (e.g. major station, minor station). Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| CC_DESC_OUT | Location description for credit card size tickets for the outward journey from this location. |
| CC_DESC_RTN | Location description for credit card size tickets for the return journey to this location. |
| ATB_DESC_OUT | Location description for ATB (airline) size tickets for the outward journey from this location. |
| ATB_DESC_RTN | Location description for ATB (airline) size tickets for the return journey to this location. |
| SPECIAL_FACILITIES | Indicates the facilities available at the location, each character represents a special facility. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| LUL_DIRECTION_IND | Values '0', '1', '2', '3' or space. Used for LUL magnetic stripe encoding. |
| LUL_UTS_MODE | Used to indicate which transport modes are encoded in the ticket (LUL magnetic stripe encoding). |
| LUL_ZONE_1 | Value = 'Y' or 'N', used for LUL magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| LUL_ZONE_2 | Value = 'Y' or 'N', used for LUL magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| LUL_ZONE_3 | Value = 'Y' or 'N', used for LUL magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| LUL_ZONE_4 | Value = 'Y' or 'N', used for LUL magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| LUL_ZONE_5 | Value = 'Y' or 'N', used for LUL magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| LUL_ZONE_6 | Value = 'Y' or 'N', used for LUL magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| LUL_UTS_LONDON_STN | Values are '0' or '1'. Indicates whether the station is a London station. Used for LUL magnetic stripe encoding. Please note that this information is supplied from the source system, and is not validated by DTD. |
| UTS_CODE | Location code for UTS. Used for LUL magnetic stripe encoding. |
| UTS_A_CODE | Alternative UTS code. Used for LUL magnetic stripe encoding. |
| UTS_PTR_BIAS | Used for LUL magnetic stripe encoding. |
| UTS_OFFSET | Used for LUL magnetic stripe encoding. |
| UTS_NORTH | Used for LUL magnetic stripe encoding. |
| UTS_EAST | Used for LUL magnetic stripe encoding. |
| UTS_SOUTH | Used for LUL magnetic stripe encoding. |
| UTS_WEST | Used for LUL magnetic stripe encoding. |

## Related Record Types

The LOCATIONS file contains 6 record types:

1. **L** – Location record (this table)
2. **A** – Associated Stations record (deprecated)
3. **R** – Railcard Geography record
4. **G** – Location Group record
5. **M** – Group Members record
6. **S** – Synonym record

## Relationships
- `UIC_CODE` is the primary identifier used across the fares system.
- `NLC_CODE` links to British railway locations.
- `CRS_CODE` provides standard station codes.
- Links to `location_association`, `location_railcard`, `location_group_member`, and `location_synonym` tables.
- Referenced by `flow` table for origin and destination codes.
- Used in restriction tables for route definitions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.LOC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (L records within LOC file) 