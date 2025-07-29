# Non-Standard Discounts

**Config file:**
FNS.ts

**Snowflake table name:**
non_standard_discount

**Description:**  
This file contains the add-on amounts for domestic fares where non-standard discounts apply. It is not used for non-discounted adult fares, which are included in the flow file.

**Rate of change:** Approximately 30 times per year.

**Important Note:** Where a discounted fare is required, and the entry in the flow file has the marker set to indicate that non-standard discounts apply, then this file is used when calculating the fare. The non-standard discount record contains an alternative origin or destination code for which a fare should be calculated, and an add-on amount to be added to the alternative fare to produce the fare required.

## Non-Standard Discount Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| ORIGIN_CODE | A code representing the flow origin, either NLC, Location Zone No or Location County, or '****' (4 asterisks). '****' indicates that this record applies from all origins to the destination supplied in the destination code, except where a record exists for an explicit origin. |
| DESTINATION_CODE | A code representing the flow destination, either NLC or Location County, or '****' (4 asterisks). '****' indicates that this record applies to all destinations from the origin supplied in the origin code, except where a record exists for an explicit destination. |
| ROUTE_CODE | Contains either a 5-digit route code or '*****' (5 asterisks). '*****' indicates that this record applies to all routes between the origin and destination, except where a record exists for an explicit route. |
| RAILCARD_CODE | Contains a railcard code, or 3 spaces or '***' (3 asterisks). '***' indicates that this record applies to all railcards, except where a record exists for an explicit railcard. 3 spaces indicates that this record should be used where no railcard is required for the fare calculation (e.g. when calculating a child fare). |
| TICKET_CODE | Contains a ticket code, '***' (3 asterisks). '***' indicates that this record applies to all tickets, except where a record exists for an explicit ticket. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record is available for query. Format is ddmmyyyy. |
| USE_NLC | The NLC code to be used to find an alternative fare. The add-on amount will be added to this alternative fare to produce the fare price. This field will contain spaces if ADULT_NODIS_FLAG is 'X' and CHILD_NODIS_FLAG is 'X'. |
| ADULT_NODIS_FLAG | Indicates whether the adult add on should be applied. 'N' indicates that the adult fare should be calculated as normal (i.e. this non-standard discount record can be ignored for the adult fare), and no add-on amount is to be added. 'X' indicates that no adult fare can be calculated. 'D' indicates that a discounted adult fare cannot be calculated. A space indicates that the adult fare should be calculated using the USE_NLC, and the add-on amount added. |
| ADULT_ADD_ON_AMOUNT | The add-on amount, in pence, to be added to adult fares, if applicable. Contains spaces if the ADULT_NODIS_FLAG is not space, or if the ADULT_REBOOK_FLAG is 'Y' or 'S'. |
| ADULT_REBOOK_FLAG | Values are 'N', 'Y' or 'S'. If the adult rebook flag is set to 'Y' or 'S', then no fare can be calculated. The rebook values are used to determine which rebook message is output to the end user. 'Y' indicates that a ticket should be issued to the interchange, and the customer should be advised to rebook. 'S' indicates that a separate ticket should be issued for the Rail and Private Settlement portions of the journey. Note that if adult and child fares are required, but the adult and child rebook flags are different, then the customer should be referred to paper based documentation. |
| CHILD_NODIS_FLAG | Indicates whether the child add on should be applied. 'N' indicates that the child fare should be calculated as normal (i.e. this non-standard discount record can be ignored for the child fare), and no add-on amount is to be added. 'X' indicates that no child fare can be calculated. 'D' indicates that a discounted child fare cannot be calculated. A space indicates that the child fare should be calculated using the USE_NLC, and the add-on amount added. |
| CHILD_ADD_ON_AMOUNT | The add-on amount, in pence, to be added to child fares, if applicable. Contains spaces if the CHILD_NODIS_FLAG is not space, or if the CHILD_REBOOK_FLAG is 'Y' or 'S'. |
| CHILD_REBOOK_FLAG | Values are 'N', 'Y' or 'S'. If the child rebook flag is set to 'Y' or 'S', then no fare can be calculated. The rebook values are used to determine which rebook message is output to the end user (see ADULT_REBOOK_FLAG). |

## Relationships
- `ORIGIN_CODE` and `DESTINATION_CODE` link to `location`.
- `ROUTE_CODE` links to `route`.
- `RAILCARD_CODE` links to `railcard`.
- `TICKET_CODE` links to `ticket_type`.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.FNS
- **Typical Size:** 260Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 