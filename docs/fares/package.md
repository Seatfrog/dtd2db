# Packages

**Description:**  
Defines travel packages that include additional facilities or services beyond basic rail travel.

## Package Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'P'. |
| PACKAGE_CODE | Package code (primary key). |
| END_DATE | End date for the package. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the package. Format is ddmmyyyy. |
| QUOTE_DATE | Date the quote was generated. Format is ddmmyyyy. |
| RESTRICTION_CODE | Restriction code (links to restriction_header). |
| ORIGIN_FACILITIES | Facilities available at origin. |
| DESTINATION_FACILITIES | Facilities available at destination. |

## Package Supplement Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'S'. |
| PACKAGE_CODE | Package code (links to Package record). |
| END_DATE | End date for the package supplement. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the package supplement. Format is ddmmyyyy. |
| SUPPLEMENT_CODE | Supplement code. |
| SUPPLEMENT_PRICE | Supplement price in pence. |

## Relationships
- `PACKAGE_CODE` is referenced in `package_supplement`.
- `RESTRICTION_CODE` links to `restriction_header`.
- `SUPPLEMENT_CODE` links to `supplement` table. 