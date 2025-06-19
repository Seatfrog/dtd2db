# Location Associations

**Description:**  
Defines associations between different locations (stations). This allows one location to be linked to another, typically for fare calculation purposes where certain stations are treated as equivalent or grouped together.

## Location Association Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'A'. |
| UIC_CODE | UIC code of the primary location. |
| END_DATE | End date for the validity of this association. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| ASSOC_UIC_CODE | UIC code of the associated location. |
| ASSOC_CRS_CODE | CRS code of the associated location. |

## Relationships
- `UIC_CODE` links to the main `location` table.
- `ASSOC_UIC_CODE` links to another record in the `location` table. 