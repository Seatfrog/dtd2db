# Ticket Types

**Config file:**
TTY.ts

**Snowflake table name:**
ticket_type

**Description:**  
This file contains details of all the ticket codes included in the flow file and the non-derivable fares overrides file.

**Rate of change:** Approximately 4 times per week.

## Ticket Types Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| TICKET_CODE | Alphanumeric ticket code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be queried. Format is ddmmyyyy. |
| DESCRIPTION | Ticket description. |
| TKT_CLASS | The class of travel for this ticket: "1" first class, "2" standard, "9" undefined class – used for non-travel products, such as car park tickets and some supplements. |
| TKT_TYPE | Ticket type; single, return or season ('S', 'R' or 'N'). |
| TKT_GROUP | Ticket group; First, Standard, Promotion or Euro ('F', 'S', 'P' or 'E'). Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'S' for new records. |
| LAST_VALID_DAY | Last date on which travel using this ticket is valid. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| MAX_PASSENGERS | Defines the maximum number of passengers who can travel on one ticket. |
| MIN_PASSENGERS | Defines the minimum number of passengers who can travel on one ticket. |
| MAX_ADULTS | Defines the maximum number of adults who can travel on one ticket. |
| MIN_ADULTS | Defines the minimum number of adults who can travel on one ticket. |
| MAX_CHILDREN | Defines the maximum number of children who can travel on one ticket. |
| MIN_CHILDREN | Defines the minimum number of children who can travel on one ticket. |
| RESTRICTED_BY_DATE | 'Y' or 'N' to indicate whether the ticket is restricted to particular dates. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'N' for new records. |
| RESTRICTED_BY_TRAIN | 'Y' or 'N' to indicate whether the ticket is restricted to particular trains. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'N' for new records. |
| RESTRICTED_BY_AREA | 'Y' or 'N' to indicate whether the ticket is restricted to a particular area. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'N' for new records. |
| VALIDITY_CODE | Validity code. |
| ATB_DESCRIPTION | Description to be printed on ATB (airline) type tickets. |
| LUL_XLONDON_ISSUE | Number of gate passes to issue. Permitted values are '0', '1' or '2'. |
| RESERVATION_REQUIRED | Indicates whether reservation is required when using this ticket. Values are: 'N' (no), 'O' (reservation required on outward journey), 'R' (reservation required on return journey), 'B' (reservation required on both outward and return journey), 'E' (reservation required either outward or return journey). |
| CAPRI_CODE | CAPRI code. |
| LUL_93 | Used for ticket issue. This field is used when encoding the end date of the ticket. Valid values are 'Y', 'N' and space, but please note that this information is supplied from the source system and is not validated by DTD. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| UTS_CODE | Used in LUL magnetic stripe encoding to indicate the ticket type (e.g. '98' = season). Permitted values are ' 0', '00', '04', '29' or '98'. |
| TIME_RESTRICTION | Contains a numeric value recognised by the underground gate to indicate the earliest time at which the gate can be operated with this ticket. Permitted values are '0', '1', '2' or '3'. Used in magnetic stripe encoding. |
| FREE_PASS_LUL | Used for package fares only. Indicates whether 'free passengers' in the package get LUL travel included as part of the package. Permitted values are 'Y', 'N' or space if the ticket type is not a package. Note – this field is obsolete. Within PMS, this attribute is deprecated. Default value is Spaces for new records. |
| PACKAGE_MKR | Indicates whether this ticket is a package. 'N' = Not a package, 'S' = Supplements package, 'F'= Fares package, 'P' = both fares and supplements package. |
| FARE_MULTIPLIER | Multiplication factor used when calculating package fares. |
| DISCOUNT_CATEGORY | Discount category. Used when a ticket is discounted to find the discount amount in the appropriate railcard's status discount record. |

## Relationships
- `TICKET_CODE` is referenced in `fare` table fare records.
- `VALIDITY_CODE` links to `ticket_validity` table.
- `CAPRI_CODE` may link to CAPRI system definitions.
- Referenced by various restriction tables for ticket-specific restrictions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TTY
- **Typical Size:** 5Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 