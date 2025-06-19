# Location Groups

**Description:**  
Defines groups of locations (stations) that are treated as a single entity for fare calculation purposes. This allows multiple stations to be grouped together under a single group identifier.

## Location Group Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'G'. |
| GROUP_UIC_CODE | UIC code for the group (primary key). |
| END_DATE | End date for the validity of this group. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the validity of this group. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| DESCRIPTION | Description of the location group. |
| ERS_COUNTRY | ERS country code. |
| ERS_CODE | ERS code. |

## Relationships
- `GROUP_UIC_CODE` is referenced in `location_group_member` table.
- Individual locations are linked to groups via the `location_group_member` table. 