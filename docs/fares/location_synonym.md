# Location Synonyms

**Description:**  
Defines alternative names or synonyms for locations, allowing stations to be referenced by different names or descriptions.

## Location Synonym Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| UIC_CODE | UIC code of the location. |
| END_DATE | End date for the validity of this synonym. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the validity of this synonym. Format is ddmmyyyy. |
| DESCRIPTION | Alternative name or description for the location. |

## Relationships
- `UIC_CODE` links to the main `location` table. 