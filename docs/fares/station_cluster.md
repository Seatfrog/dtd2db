# Station Clusters

**Config file:**
FSC.ts

**Snowflake table name:**
station_cluster

**Description:**  
Cluster codes, and the stations included in the station cluster.

**Rate of change:** Approximately 15 times per year.

## Station Clusters Record

| Field Name | Description |
|------------|-------------|
| UPDATE_MARKER | In a 'changes only' update file, indicates whether the record is to be inserted, amended or deleted ('I'/'A'/'D'). For a full file refresh all update markers in the file will be set to 'R'. |
| CLUSTER_ID | 4-character code (alphanumeric) representing the NLC code at which the cluster fares are set. |
| CLUSTER_NLC | NLC code of a location which is a member of the cluster (it may also be a zone code or a county code). The fares for this location may be set using the Cluster NLC instead of this NLC. A member may exist in several clusters. |
| END_DATE | Last date for which this record can be used. Format is ddmmyyyy. A high date (31122999) is used to indicate records which have no defined end date. |
| START_DATE | First date for which this record can be used. Format is ddmmyyyy. |

## Relationships
- `CLUSTER_ID` is used as the NLC code in `flow` table for origin and destination codes.
- `CLUSTER_NLC` links to `location` table via NLC codes.
- Multiple cluster records can exist for the same `CLUSTER_ID`, representing different member stations.

## File Information
- **File Type:** Fixed-width text file
- **Filename Pattern:** RJFAtnnn.FSC
- **Typical Size:** 1Kb (full file)
- **Update Frequency:** Available as 'changes only' updates
- **Record Type:** Single record type file 