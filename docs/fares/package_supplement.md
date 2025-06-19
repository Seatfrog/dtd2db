# Package Supplements

**Description:**  
Links packages to supplements, defining which supplements are available for each package.

## Package Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| PACKAGE_CODE | Package code (links to package). |
| END_DATE | End date for the package supplement. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the package supplement. Format is ddmmyyyy. |
| SUPPLEMENT_CODE | Supplement code. |
| SUPPLEMENT_PRICE | Supplement price in pence. |

## Relationships
- `PACKAGE_CODE` links to `package`.
- `SUPPLEMENT_CODE` links to `supplement`. 