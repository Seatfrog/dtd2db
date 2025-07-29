# Railcard Minimum Fares

**Config file:**
RCM.ts

**Snowflake table name:**
railcard_minimum_fare

**Description:**  

Defines minimum fares which apply when railcards are used on certain trains (determined by the train restriction). Minimum fares apply to adult fares only.

**Rate of change:** Approximately 2/3 times per month.

## Railcard Minimum Fare Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'M'. |
| RAILCARD_CODE | 3-character railcard code. |
| TICKET_CODE | 3-character ticket code. The minimum fare applies to the railcard/ticket combination. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| MINIMUM_FARE | The minimum fare, in pence, to be charged for this ticket/railcard combination when minimum fares apply. |

## Relationships
- `RAILCARD_CODE` links to `railcard` table.
- `TICKET_CODE` links to `ticket_type` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RCM
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 