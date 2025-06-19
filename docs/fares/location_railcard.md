# Location Railcards

**Description:**  
Links locations to railcard codes, indicating which railcards are valid at specific stations or locations.

## Location Railcard Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'R'. |
| UIC_CODE | UIC code of the location. |
| RAILCARD_CODE | Railcard code that is valid at this location. |
| END_DATE | End date for the validity of this railcard link. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |

## Relationships
- `UIC_CODE` links to the main `location` table.
- `RAILCARD_CODE` links to railcard definitions in other tables. 