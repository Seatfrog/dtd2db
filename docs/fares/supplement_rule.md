# Supplement Rules

**Config file:**
SUP.ts

**Snowflake table name:**
supplement_rule

**Description:**  
Defines rules that govern the application of supplements to fares. These rules specify the conditions under which supplements can be applied, including train characteristics, accommodation types, and passenger categories.

**Rate of change:** Approximately 10 times per month.

## Supplement Rule Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| RULE_NUMBER | 3-character rule number. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |
| QUOTE_DATE | First date on which this record can be queried. Format is ddmmyyyy. |
| TRAIN_UID | Train identifier (actually 6 alphanumeric characters followed by a space). 7 spaces if not applicable. |
| TRAIN_UID_DESC | Train description. |
| FARE_CLASS | Single character class (values '1', '2', '9' or '*'). Asterisk means the class is not significant. |
| QUOTA | Values 'Y', 'N' or '*' to indicate that the rule applies if the train is quota'd, does not apply if the train is quota'd or applies regardless of whether or not the train is quota'd. |
| WEEKEND_FIRST | Values 'Y', 'N' or '*' to indicate that the rule applies if the train has Weekend First accommodation, does not apply if the train has Weekend First accommodation or applies regardless of whether or not train has Weekend First accommodation. |
| SILVER_STANDARD | Values 'Y', 'N' or '*' to indicate that the rule applies if the train has Silver Standard accommodation, does not apply if the train has Silver Standard accommodation or applies regardless of whether or not the train has Silver Standard accommodation. |
| RAILCARD | Values 'Y', 'N' or '*' to indicate that the rule applies if a railcard is used, does not apply if a railcard is used or applies regardless of whether or not a railcard is used. |
| CATERING_CODE | Catering code, space or '*'. These values are used to compare with the catering available on the train. |
| SLEEPER | Values 'F', 'S', 'B' or space or '*'. Indicates whether the rule applies if the train has first class, standard class or both first and standard class sleeper accommodation, or that the rule applies regardless of the sleeper accommodation available on the train. |
| ACCOM_CLASS | Values 'F', 'S', 'B' or space or '*'. Indicates whether the rule applies if the train has first class, standard class or both first and standard class accommodation, or that the rule applies regardless of the accommodation available on the train. |
| STATUS | Values 'A', 'C' or 'B'. Indicates whether the rule applies to Adults, Children or Both. |
| RESERVATION_STATUS | Up to 3 reservation status codes, or spaces. Indicates which reservation statuses the rule applies to. |
| SECTORS | Up to 3 train sector codes, or spaces. Indicates which sector codes the rule applies to. |

## Relationships
- `RULE_NUMBER` links to `supplement_rule_applies` and `supplement_rule_supplement` tables.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.SUP
- **Typical Size:** 8Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (R records within SUP file) 