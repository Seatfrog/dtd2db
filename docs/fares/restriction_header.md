# Restriction Header

**Description:**  
Part of the RESTRICTIONS file which contains the restriction information. The file includes 19 record types, including those for the ticket/supplement calendars (i.e. those things restricted by date).

**Rate of change:** Approximately three times per week.

## RH – Restriction Header Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'RH'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code. |
| DESCRIPTION | Restriction description. |
| DESC_OUT | Description text for the restriction for an outward journey. Spaces are permitted. |
| DESC_RTN | Description text for the restriction for a return journey. Spaces are permitted. |
| TYPE_OUT | 'P' or 'N'. Indicates how the train restrictions associated with this restriction are to be applied to an outward journey – 'P' = positive restriction, 'N' = negative restriction. |
| TYPE_RTN | 'P' or 'N'. Indicates how the train restrictions associated with this restriction are to be applied to a return journey – 'P' = positive restriction, 'N' = negative restriction. |
| CHANGE_IND | 'Y' or 'N'. Indicates whether a change of trains is allowed. |

## Related Record Types

The RESTRICTIONS file contains 19 record types:

1. **RD** – Restriction Dates record
2. **RH** – Restriction Header record (this table)
3. **HD** – Restriction Header Date Bands record
4. **HL** – Restriction Header Route Locations record
5. **HC** – Restriction Header Allowed Changes record
6. **HA** – Restriction Header Additional Restriction record
7. **TR** – Time Restriction record
8. **TD** – Time Restriction Date Bands record
9. **TT** – Time Restriction TOC record
10. **TP** – Time Restriction Privilege Data record
11. **TE** – Time Restriction Privilege Pass Exceptions record
12. **SR** – Train Restriction record
13. **SD** – Train Restriction Date Bands record
14. **SQ** – Train Restriction Quota Exemption record
15. **SP** – Train Restriction Privilege Data record
16. **SE** – Train Restriction Privilege Pass Exceptions record
17. **RR** – Railcard Restriction record
18. **EC** – Exception Codes record
19. **CA** – Ticket Calendar record

## Relationships
- `RESTRICTION_CODE` is referenced in `flow` table fare records.
- Links to various restriction detail tables (dates, times, trains, etc.) via the `RESTRICTION_CODE` field.
- `CF_MKR` links to restriction date records for validity periods. 