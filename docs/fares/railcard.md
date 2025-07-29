# Railcards

**Config file:**
RLC.ts

**Snowflake table name:**
railcard

**Description:**  
Defines railcard types with their validity periods, restrictions, pricing, and passenger limits.


**Rate of change:** Approximately 3 times per month.

## Railcard Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'C'. |
| RAILCARD_CODE | 3-character railcard code. If the railcard code is 3 spaces, then this means 'no railcard', and the record is only used to obtain status values required to calculate child and AAA fares where no railcard has been supplied. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be quoted. Format is ddmmyyyy. |
| HOLDER_TYPE | 'A' for Adult, 'C' for Child. |
| DESCRIPTION | Railcard description. |
| RESTRICTED_BY_ISSUE | Value 'Y' or 'N'. Indicates whether the railcard is restricted issue. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'N' for new records. |
| RESTRICTED_BY_AREA | Value 'Y' or 'N'. Indicates whether the railcard is restricted by area (i.e. it can only be used in areas denoted by the Railcard Geography held in the Locations file). |
| RESTRICTED_BY_TRAIN | Value 'Y' or 'N'. Indicates whether the railcard is restricted to particular trains. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'N' for new records. |
| RESTRICTED_BY_DATE | Value 'Y' or 'N'. Indicates whether the railcard is restricted by date. |
| MASTER_CODE | The master railcard code, used when discounting fares using this railcard. With the introduction of PMS this is always the same code as the RAILCARD_CODE field. |
| DISPLAY_FLAG | Indicates whether the railcard must be displayed when a ticket is purchased. |
| MAX_PASSENGERS | 0-999 – the maximum number of passengers whose fares may be discounted using 1 railcard. |
| MIN_PASSENGERS | 0-999 – the minimum number of passengers required for fares to be discounted using 1 railcard. |
| MAX_HOLDERS | 0-999 – the maximum number of railcard holders required to qualify for a discount with this railcard. |
| MIN_HOLDERS | 0-999 – the minimum number of railcard holders required to qualify for a discount with this railcard. |
| MAX_ACC_ADULTS | 0-999 – the maximum number of accompanied adults whose fares may be discounted using 1 railcard. |
| MIN_ACC_ADULTS | 0-999 – the minimum number of accompanied adults whose fares may be discounted using 1 railcard. |
| MAX_ADULTS | 0-999 – the maximum number of adults whose fares may be discounted using 1 railcard. |
| MIN_ADULTS | 0-999 – the minimum number of adults whose fares may be discounted using 1 railcard. |
| MAX_CHILDREN | 0-999 – the maximum number of accompanied children whose fares may be discounted using 1 railcard. |
| MIN_CHILDREN | 0-999 – the minimum number of accompanied children whose fares may be discounted using 1 railcard. |
| PRICE | Railcard price in pence. |
| DISCOUNT_PRICE | Discount price, in pence, to be charged to holders of other selected railcards. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is '00000000' for new records. |
| VALIDITY_PERIOD | The validity period of this railcard in the format mmdd (months/days). Will be spaces if the record contains a value for last valid date. |
| LAST_VALID_DATE | The last date on which this railcard is valid. Format is ddmmyyyy. Will be spaces if the record contains a validity period. |
| PHYSICAL_CARD | 'Y' or 'N' to indicate whether the railcard is a physical document. |
| CAPRI_TICKET_TYPE | CAPRI Ticket code. |
| ADULT_STATUS | Status code to be used when calculating adult fares with this railcard. |
| CHILD_STATUS | Status code to be used when calculating child fares with this railcard. |
| AAA_STATUS | Status code to be used when calculating AAA fares with this railcard. Note: AAA Fares no longer allowed. Ignore any data content in this field. |

## Relationships
- `RAILCARD_CODE` is referenced in `railcard_minimum_fare`, `rover_price`, and other tables.
- `MASTER_CODE` may link to other railcard records.
- `ADULT_STATUS`, `CHILD_STATUS`, and `AAA_STATUS` link to status definitions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RLC
- **Typical Size:** 2Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 