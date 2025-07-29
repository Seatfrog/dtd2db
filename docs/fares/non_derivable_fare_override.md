# Non-Derivable Fare Overrides

**Config file:**
NFO.ts

**Snowflake table name:**
non_derivable_fare_override

**Description:**  
Defines override rules for domestic non-derivable fares, allowing specific fare combinations to override standard fare calculations.

**Rate of change:** Possibly daily.

**Important Note:** This file will contain all non-derivable fares and will be the primary source of non-derivable data. It will contain new non-derivable fares (add records), replacement records and delete records where the fare has been specifically deleted by the data owner. A delete record will not be issued when a non-derivable fare has reached its WEU date unless it is specifically deleted by the data owner.

## Non-Derivable Fare Overrides Record

| Field Name | Length | Position | Description |
|------------|--------|----------|-------------|
| UPDATE_MARKER | 1 | 1-1 | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| ORIGIN_CODE | 4 | 2-5 | A code representing the flow origin, either NLC, Location Zone No or Location County. |
| DESTINATION_CODE | 4 | 6-9 | A code representing the flow destination, either NLC or Location County. Does not include a Location Zone No. |
| ROUTE_CODE | 5 | 10-14 | 5-digit route code. |
| RAILCARD_CODE | 3 | 15-17 | Railcard code. May be spaces if the non-derivable fare applies without a railcard discount. |
| TICKET_CODE | 3 | 18-20 | Fare ticket code. |
| ND_RECORD_TYPE | 1 | 21-21 | Value = 'O' (override). There will not necessarily be an N type record in the non-derivable fares file for each O type record (overrides are also used to add new non-derivable fares). |
| END_DATE | 8 | 22-29 | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | 8 | 30-37 | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | 8 | 38-45 | First date on which this record can be used for queries. Format is ddmmyyyy. |
| SUPPRESS_MKR | 1 | 46-46 | This field is obsolete and is always set to N. |
| ADULT_FARE | 8 | 47-54 | An 8-character numeric fare value, in pence. 99999999 indicates that no adult fare is available for the ticket/railcard combination. |
| CHILD_FARE | 8 | 55-62 | An 8-character numeric fare value, in pence. 99999999 indicates that no child fare is available for the ticket/railcard combination. |
| RESTRICTION_CODE | 2 | 63-64 | 2-character restriction code; may be spaces. |
| COMPOSITE_INDICATOR | 1 | 65-65 | A single character, either 'Y' or 'N'. If this value is set to 'Y', then this record should be used when calculating fares. Otherwise this record should not be used, as the fare is already included in the flow file. |
| CROSS_LONDON_IND | 1 | 66-66 | Indicates whether this is a cross London fare ('Y' or 'N'). |
| PS_IND | 1 | 67-67 | Indicates whether private settlement applies to this fare ('Y' or 'N'). |

## Date Capping Rules
Fares dates will be adjusted, where necessary, according to the date capping rules specified below, to ensure fares are not duplicated and to reduce the number of discrete historic WEF dates.

WEF dates will be adjusted as follows:
When PMS writes the NDF record to the NDF Cluster file and/or NDF Point to Point file, if the record's WEF date is older than the Travel From date of the previous FSR then the NDF record's WEF date will be set to the Travel From date of the previous FSR.

**Examples:**

*Extract date = 7th April 2017:*
- Previous FSR's Travel From date is 2nd January 2017
- NDF record WEF = 16/12/2015, WEU=UFN
- PMS will write the record out to the NDF files (Cluster and Point to Point) with WEF=02/01/2017, WEU=31/12/2999.

*Extract date = 5th June 2017:*
- Previous FSR's Travel From date is 22nd May 2017
- NDF record WEF = 16/12/2015, WEU=UFN
- PMS will write the record out to the NDF files (Cluster and Point to Point) with WEF=22/05/2017, WEU=31/12/2999.

## Relationships
- `ORIGIN_CODE` and `DESTINATION_CODE` link to `location`.
- `ROUTE_CODE` links to `route`.
- `RAILCARD_CODE` links to `railcard`.
- `TICKET_CODE` links to `ticket_type`.
- `RESTRICTION_CODE` links to `restriction_header`.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.NDO
- **Typical Size:** 3.8Mb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 