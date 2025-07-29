# Supplement Rule Applies

**Config file:**
SUP.ts

**Snowflake table name:**
supplement_rule_applies

**Description:**  
Defines which supplement rules apply to which supplements and under what conditions. Rule applies records are linked to the associated Rule record using the RULE_NUMBER and END_DATE fields. Records with duplicate keys are included.

**Rate of change:** Approximately 10 times per month.

## Supplement Rule Applies Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'A'. |
| RULE_NUMBER | 3-character rule number. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| IE_MARKER | 'I' to indicate "Includes", 'E' to indicate "Excludes". |
| CONDITION_TYPE | Indicates what the Include/Exclude marker refers to: 'A' indicates that the Railcard in IE_CODE is included in/excluded from the rule, 'E' indicates that the Restriction in IE_CODE is included in/excluded from the rule, 'I' indicates that the Ticket in IE_CODE is included in/excluded from the rule, 'O' indicates that the TOC in IE_CODE is included in/excluded from the rule. |
| IE_CODE | A ticket, railcard, restriction or TOC code, depending on the value of CONDITION_TYPE. Note that ticket codes can include '*' (e.g. 'SR*') to allow matching on several tickets. |

## Relationships
- `RULE_NUMBER` links to `supplement_rule` table.
- `IE_CODE` links to various tables depending on `CONDITION_TYPE` value.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.SUP
- **Typical Size:** 8Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (A records within SUP file) 