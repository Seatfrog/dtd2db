# Location Group Members

**Description:**  
Links individual locations to location groups, defining which stations belong to which groups.

## Location Group Member Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'M'. |
| GROUP_UIC_CODE | UIC code of the group. |
| END_DATE | End date for the validity of this membership. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| MEMBER_UIC_CODE | UIC code of the member location. |
| MEMBER_CRS_CODE | CRS code of the member location. |

## Relationships
- `GROUP_UIC_CODE` links to the `location_group` table.
- `MEMBER_UIC_CODE` links to the main `location` table. 