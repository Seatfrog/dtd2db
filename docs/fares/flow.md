# Flow

**Config file:**
FFL.ts

**Snowflake table name:**
flow

**Description:**  
Domestic non-discounted adult fares between all points on the network, where set. The file contains 2 record types: 'Flow' records and 'Fare' records.

**Rate of change:** Possibly daily.

## Flow Record

| Field Name | Length | Position | Description |
|------------|--------|----------|-------------|
| UPDATE_MARKER | 1 | 1-1 | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | 1 | 2-2 | Contains 'F'. |
| ORIGIN_CODE | 4 | 3-6 | A code representing the flow origin (4 digit NLC code, county code, zone code). This may be a cluster NLC, in which case this flow applies to all stations in the cluster. Where DIRECTION = 'R' then this flow may also be used for fares in the reverse direction, in which case ORIGIN-CODE should be used as DESTINATION-CODE in the reverse direction. |
| DESTINATION_CODE | 4 | 7-10 | A code representing the flow destination (4 digit NLC code or county code). This may be a cluster NLC, in which case this flow applies to all stations in the cluster. Where DIRECTION = 'R' then this flow may also be used for fares in the reverse direction, in which case DESTINATION-CODE should be used as ORIGIN-CODE in the reverse direction. |
| ROUTE_CODE | 5 | 11-15 | Route code. |
| STATUS_CODE | 3 | 16-18 | 3-digit status code. This value is used to indicate the status for which the fares on the record apply. Status code for adult fare is '000'. |
| USAGE_CODE | 1 | 19-19 | Permitted values are 'G' or 'A'. 'A' indicates that this is an actual fare set for this flow. 'G' indicates that the flow has been constructed by concatenating two or more other flows (flows produced by agreements). Note: The change in permitted values ('C' records are no longer created and this is no longer a permitted value). |
| DIRECTION | 1 | 20-20 | Values are either 'S' to indicate that the fare applies in a single direction, or 'R' to indicate that the fare applies in both directions (it is reversible). |
| END_DATE | 8 | 21-28 | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | 8 | 29-36 | First date for which this record can be used. Format is ddmmyyyy. |
| TOC | 3 | 37-39 | The Fare TOC code of the TOC setting the fares on the flow. |
| CROSS_LONDON_IND | 1 | 40-40 | Values are '0' to indicate not via London, '1' to indicate via London including Underground, '2' to indicate via London excluding Underground, '3' to indicate via Thameslink. |
| NS_DISC_IND | 1 | 41-41 | Indicates whether non-standard discounts apply to the fares on this flow. '0' = Railway flow, standard discounts to apply, '1' = Railway flow, non-standard discounts apply, '2' = Private settlement, standard discounts apply, '3' = Private settlement, non-standard discounts apply. |
| PUBLICATON_IND | 1 | 42-42 | Values 'Y' or 'N' to indicate whether or not the fares on this flow are published in the National Fares Manual. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'N' for new records. |
| FLOW_ID | 7 | 43-49 | Uniquely identifies this flow. (Links to Fare)|

## Fare Record

Fare records are linked to the associated flow record using the FLOW_ID field.

| Field Name | Length | Position | Description |
|------------|--------|----------|-------------|
| UPDATE_MARKER | 1 | 1-1 | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | 1 | 2-2 | Contains 'T'. |
| FLOW_ID | 7 | 3-9 | Uniquely identifies the flow to which the fare pertains. |
| TICKET_CODE | 3 | 10-12 | 3-character ticket code for the fare. |
| FARE | 8 | 13-20 | Fare in pence. |
| RESTRICTION_CODE | 2 | 21-22 | Restriction code associated with this fare. |

## Relationships
- `ORIGIN_CODE` and `DESTINATION_CODE` link to `location` table.
- `FLOW_ID` is referenced in the fare records within this file.
- `TOC` links to Train Operating Company definitions.
- `ROUTE_CODE` links to route definitions.
- `RESTRICTION_CODE` links to restriction definitions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.FFL
- **Typical Size:** 4Mb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record file (Flow and Fare records) 