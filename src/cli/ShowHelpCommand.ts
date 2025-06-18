import {CLICommand} from "@cli/CLICommand";

export class ShowHelpCommand implements CLICommand {

  public run(argv: string[]): Promise<void> {
    console.log(`
Usage: dtd2db [COMMAND] [FILE]
Import a DTD feed into a database (MySQL or Snowflake)

  --fares [FILE]             import the fares feed 
  --fares-clean              remove old and irrelevant data
  --timetable [FILE]         import the timetable feed 
  --routeing [FILE]          import the routeing guide data
  --nfm64 [FILE]             import the nfm64 data
  --gtfs [DIR]               convert timetable data to GTFS and output txt files in DIR
  --gtfs-zip [FILE]          convert timetable data to GTFS and output zip
  --gtfs-import [DIR]        import the GTFS files in the DIR to a database
  --download-fares [DIR]     download latest fares refresh from DTD
  --download-timetable [DIR] download latest timetable refresh from DTD
  --download-routeing [DIR]  download latest routeing refresh from DTD
  --nfm64 [DIR]              download nfm64 data
  --get-fares [DIR]          download and process latest fares refresh from DTD
  --get-timetable [DIR]      download and process latest timetable refresh from DTD
  --get-routeing [DIR]       download and process latest routeing refresh from DTD
  --get-nfm64 [DIR]          download and process latest nfm64 file
  
The following environment properties are expected to be set:
  
For MySQL:
  DATABASE_USERNAME          mysql username (defaults to root)
  DATABASE_PASSWORD          mysql password (defaults to none)
  DATABASE_NAME              mysql database name
  DATABASE_HOSTNAME          mysql database host (defaults to localhost)

For Snowflake:
  DATABASE_USERNAME         Snowflake username
  DATABASE_PASSWORD         Snowflake password
  DATABASE_NAME             Snowflake database name
  SNOWFLAKE_ACCOUNT         Snowflake account identifier
  SNOWFLAKE_ROLE            Snowflake role
  SNOWFLAKE_WAREHOUSE       Snowflake warehouse name
  SNOWFLAKE_SCHEMA          Snowflake schema name (defaults to PUBLIC)
  
The --get-* and --download-* commands require SFTP environment properties:

  SFTP_USERNAME              SFTP username
  SFTP_PASSWORD              SFTP password
  SFTP_HOSTNAME              SFTP hostname (defaults to dtd.atocrsp.org)

The --gtfs and --gtfs-zip commands take the following environment properties:

  GTFS_RANGE                 A database interval expression for the schedules to include. This is NOT SANITIZED so it cannot be untrusted user input (defaults to '3 MONTH')
  
`);

    return Promise.resolve();
  }

}
