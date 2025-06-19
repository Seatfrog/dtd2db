# Train Operating Companies (TOCs)

**Description:**  
Defines Train Operating Companies (TOCs) with their names and active status.

## TOC Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'T'. |
| TOC_ID | TOC identifier (primary key). |
| END_DATE | End date for the TOC. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the TOC. Format is ddmmyyyy. |
| TOC_NAME | Name of the Train Operating Company. |
| ACTIVE | Active status indicator. |

## Fare TOC Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'F'. |
| TOC_ID | TOC identifier (links to TOC record). |
| END_DATE | End date for the fare TOC. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | Start date for the fare TOC. Format is ddmmyyyy. |
| FARE_TOC_NAME | Fare TOC name. |

## Relationships
- `TOC_ID` is referenced in `toc_fare`, `advance_ticket`, `toc_specific_ticket`, and other tables.
- `TOC_ID` is referenced in `flow` table for fare-setting TOCs. 