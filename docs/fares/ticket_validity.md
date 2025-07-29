# Ticket Validity

**Config file:**
TVL.ts

**Snowflake table name:**
ticket_validity

**Description:**  
This file contains details of the validity periods for particular ticket types.

**Rate of change:** Approximately once per month.

## Ticket Validity Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'V'. |
| VALIDITY_CODE | A 2-digit validity code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | The first date for which this record can be used. Format is ddmmyyyy. |
| DESCRIPTION | Textual description of the validity. |
| OUT_DAYS | Numeric value 0-30. Indicates the number of days outward validity, i.e. the ticket can be used for n days for outward travel. |
| OUT_MONTHS | Numeric value 0-12. Indicates the number of months outward validity, i.e. the ticket can be used for n months for outward travel. |
| RET_DAYS | Numeric value 0-30. Indicates the number of days return validity, i.e. the ticket can be used for n days for return travel. |
| RET_MONTHS | Numeric value 0-12. Indicates the number of months return validity, i.e. the ticket can be used for n months for return travel. |
| RET_AFTER_DAYS | Numeric value 0-30. Indicates the number of days which must elapse before a return journey is permitted, from the outward travel date. |
| RET_AFTER_MONTHS | Numeric value 0-12. Indicates the number of months which must elapse before a return journey is permitted, from the outward travel date. |
| RET_AFTER_DAY | Permitted values are 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU' or spaces. Indicates that return travel is not permitted until the day specified has passed. Spaces indicate that this is not relevant. |
| BREAK_OUT | Indicates whether a break of journey is permitted on the outward journey. Permitted values are 'Y' or 'N'. |
| BREAK_RTN | Indicates whether a break of journey is permitted on the return journey. Permitted values are 'Y' or 'N'. |
| OUT_DESCRIPTION | Short description of outward validity, printed on the ticket. Spaces permitted. |
| RTN_DESCRIPTION | Short description of return validity, printed on the ticket. Spaces permitted. |

## Relationships
- `VALIDITY_CODE` is referenced in ticket type definitions and fare calculations.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TVL
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 