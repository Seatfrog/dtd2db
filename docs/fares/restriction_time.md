# Time Restrictions

**Config file:**
RST.ts

**Snowflake table name:**
restriction_time

**Description:**  
Defines time-based restrictions for travel, specifying time windows when restrictions apply and which locations they affect.

**Rate of change:** Approximately three times per week.

## TR – Time Restriction Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| RECORD_TYPE | Contains 'TR'. |
| CF_MKR | Either 'C' or 'F'. Used to determine the start and end dates for this record. |
| RESTRICTION_CODE | Alphanumeric restriction code. |
| SEQUENCE_NO | Numeric sequence number. Several time restrictions may apply with the same restriction code; this field is used to uniquely identify them. |
| OUT_RET | 'O' or 'R', to indicate whether the restriction applies to outward journeys or return journeys. |
| TIME_FROM | 4 numeric characters in the format HHMM. Gives the start time at which this time restriction applies. |
| TIME_TO | 4 numeric characters in the format HHMM. Gives the end time until which this time restriction applies. |
| ARR_DEP_VIA | 'A', 'D' or 'V'. Indicates whether the time restriction applies to arrivals at, departures from or changing at the location in LOCATION. |
| LOCATION | CRS code of a location denoting a journey origin/destination or via location at which the restriction may apply. Three spaces in this field means that restriction is not station specific. |
| RSTR_TYPE | 'T' or 'A'. Indicates whether the time restriction relates to the timetable or actual running time of the train. Note: this field is obsolete. Within PMS, this attribute is deprecated. Default value is 'T' for new records. |
| TRAIN_TYPE | Contains a sector code which is used to indicate that the restriction applies to particular train types. |
| MIN_FARE_FLAG | 'Y' or 'N'. 'Y' indicates that if the restriction applies then the fare is valid but a minimum fare must be used. 'N' indicates that if restriction applies then fare is not valid. |

## Relationships
- `RESTRICTION_CODE` links to `restriction_header` table.
- `LOCATION` may link to location tables.
- `SEQUENCE_NO` links to time restriction date bands and TOC restrictions.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.RST
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Multi-record type file (TR records within RST file) 