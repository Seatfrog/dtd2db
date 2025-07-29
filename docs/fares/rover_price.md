# Rover Prices

**Config file:**
TRR.ts

**Snowflake table name:**
rover_price

**Description:**  
Defines pricing for rover tickets, which allow unlimited travel within specified areas for a set period. This is the 'P' record type within the Rail Rovers file.

**Rate of change:** Approximately twice per month.

## Rover Price Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'P'. |
| ROVER_CODE | 3-character rail rover code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| RAILCARD_CODE | Railcard code. The fare in this record is that which applies when this railcard is used. Spaces mean that no railcard is being used. |
| ROVER_CLASS | The class of the rail rover ticket: "1" first class, "2" standard, "9" undefined class – used for non-travel products, such as car park tickets and some supplements. |
| ADULT_FARE | The adult fare for the rail rover with the supplied railcard, in pence. A value of 99999999 means that there is no adult fare for this rail rover/railcard combination. |
| CHILD_FARE | The child fare for the rail rover with the supplied railcard, in pence. A value of 99999999 means that there is no child fare for this rail rover/railcard combination. |
| RESTRICTION_CODE | 2-character restriction code. May be spaces. |

## Relationships
- `ROVER_CODE` links to `rover` table.
- `RAILCARD_CODE` links to `railcard` table.
- `RESTRICTION_CODE` links to `restriction_header` table.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.TRR
- **Typical Size:** 8Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (P records within TRR file) 