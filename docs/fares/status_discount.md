# Status Discounts

**Config file:**
DIS.ts

**Snowflake table name:**
status_discount

**Description:**  
Contains the discount information required for applying railcard, child and AAA discounts to the fares in the flow filex, allowing for status-based fare reductions. Status discount records are linked to the associated Status record using the STATUS_CODE and END_DATE fields.

**Rate of change:** Approximately once per month.

## Status Discount Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'D'. |
| STATUS_CODE | 3-character status code. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| DISCOUNT_CATEGORY | A value from 1 to 20 to indicate the discount category for which the following fields apply. |
| DISCOUNT_INDICATOR | Indicates whether a discount applies for this discount category. Permitted values are: '0' – Discount the fare by the amount in DISCOUNT_PERCENTAGE, 'F' – Use the appropriate flat fare for the status from FIRST_SINGLE_MAX_FLAT/FIRST_RETURN_MAX_FLAT/STD_SINGLE_MAX_FLAT/STD_RETURN_MAX_FLAT (depending on whether the ticket is standard or first, single or return), 'M' – Discount the fare by the amount in discount percentage. If the fare after discount is higher than the amount in FIRST_SINGLE_MAX_FLAT/FIRST_RETURN_MAX_FLAT/STD_SINGLE_MAX_FLAT/STD_RETURN_MAX_FLAT (depending on whether the ticket is standard or first, single or return) then the appropriate MAX/FLAT value should be charged, 'H' – Discount the fare by the amount in discount percentage. If the fare after discount is lower than the FIRST/STD_HIGHER_MIN (depending on the ticket class) fare in FIRST/STD_HIGHER_MIN should be charged, 'L' – Discount the fare by the amount in discount percentage. If the fare after discount is lower than the FIRST/STD_LOWER_MIN (depending on the ticket class) fare in FIRST/STD_LOWER_MIN should be charged, 'X' or 'N' – Do not apply any discount. |
| DISCOUNT_PERCENTAGE | The percentage discount which applies when this discount category is used. This is the discount percentage to one decimal place. For example, a value of 300 in this field indicates that the discount percentage is 30.0%. |

## Relationships
- `STATUS_CODE` links to `status` table in conjunction with `END_DATE`.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.DIS
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (D records within DIS file) 