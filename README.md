# DTD2DB

An import tool for the British rail fares, routeing and timetable feeds into a database.

Although both the timetable and fares feed are open data you will need to obtain the fares feed via the [ATOC website](http://data.atoc.org/fares-data). The formal specification for the data inside the feed also available on the [ATOC website](http://data.atoc.org/sites/all/themes/atoc/files/SP0035.pdf).

The tool supports both MySQL and Snowflake databases.

# SNOWFLAKE ONLY WORKS FOR FARES RIGHT NOW

## Download / Install

### Prerequisites
- Node.js version 20 or higher
- npm (comes with Node.js)

### Option 1: Install from Private Repository

```bash
npm install git+https://github.com/seatfrog/dtd2db.git
```

Or add to your package.json:
```json
{
  "dependencies": {
    "dtd2db": "github:seatfrog/dtd2db"
  }
}
```

This will install the `dtd2db` command, which can be used with either MySQL or Snowflake databases by setting the `DATABASE_TYPE` environment variable.

### Option 2: Install Locally

1. Clone the repository:
```bash
git clone git@github.com:seatfrog/dtd2db.git
cd dtd2db
```

2. Install dependencies and build:
```bash
npm install
npm run prepublishOnly
```

3. Link it locally (optional, for development):
```bash
npm link
```

4. In your project, you can then either:
   - Add it as a local dependency in your package.json:
     ```json
     {
       "dependencies": {
         "dtd2db": "file:/path/to/dtd2db"
       }
     }
     ```
   - Or install directly from the local path:
     ```bash
     npm install /path/to/dtd2db
     ```

### When to build (via running prepublishOnly)

You need to run `npm run prepublishOnly` in the following situations:

1. After making any changes to TypeScript source files
2. After pulling new changes from the repository that include TypeScript modifications
3. After installing new dependencies that affect TypeScript compilation
4. When you see TypeScript-related errors in the console that suggest the compiled JavaScript is out of sync with the source

The command compiles TypeScript files into JavaScript in the `dist/` directory, which is what actually gets executed when you run `dtd2db`. Without running this command after changes, you might be running outdated code.

## Database Configuration

The `DATABASE_TYPE` environment variable is required for all operations and must be set to either `mysql` or `snowflake`.

### MySQL Configuration
Required environment variables:
```
DATABASE_TYPE=mysql
DATABASE_HOSTNAME=localhost
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database
DATABASE_PORT=3306
```

### Snowflake Configuration
Required environment variables:
```
DATABASE_TYPE=snowflake
DATABASE_NAME=your_database
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PRIVATE_KEY_PATH=/path/to/private_key.p8
SNOWFLAKE_SCHEMA=your_schema
SNOWFLAKE_WAREHOUSE=your_warehouse
SNOWFLAKE_ROLE=your_role
```

Note: For Snowflake, key pair authentication is required and password authentication is not supported. You'll need to:
1. Generate an RSA key pair
2. Add the public key to your Snowflake user
3. Store the private key securely and provide its path via `SNOWFLAKE_PRIVATE_KEY_PATH`

For more information on setting up key pair authentication with Snowflake, refer to the [official documentation](https://docs.snowflake.com/en/user-guide/key-pair-auth).

### Snowflake Connection Architecture

The application creates two separate Snowflake connections for different purposes:

1. **General-purpose Connection**: Used for regular database operations like schema management, queries, and table operations.
2. **Streaming Connection**: Used specifically for data streaming operations and bulk data loading.

This dual-connection architecture provides several benefits:
- Prevents streaming operations from blocking regular database operations
- Allows for better resource management
- Provides isolation between different types of database operations
- Enables parallel processing of data streams and regular queries

You'll see log messages indicating which type of connection is being created during execution.


### Snowflake-Specific Considerations

When working with Snowflake:
- Column names and identifiers are automatically converted to uppercase
- Quoted identifiers are avoided to maintain compatibility with Snowflake's case-sensitivity rules
- Snowflake-specific record implementations are used for optimal performance
- The application uses Snowflake's native ID generation mechanisms instead of MySQL-style auto-increment

## Usage

All commands require the `DATABASE_TYPE` environment variable to be set to either `mysql` or `snowflake`.

### Fares 

#### Import
Import the fares into a database, creating the schema if necessary. This operation is destructive and will remove any existing data.

```
dtd2db --fares /path/to/RJFAFxxx.ZIP
```

#### Clean 
Removes expired data and invalid fares, corrects railcard passenger quantities, adds full date entries to restriction date records. This command will occasionally fail due to a database timeout (depending on hardware), re-running the command should correct the problem.

```
dtd2db --fares-clean
```

#### Record Action Codes
The fares feed uses the following short codes to indicate the action to take for each record:

| Code | Action |
|------|--------|
| I    | Insert |
| U    | Update |
| D    | Delete |

These codes are used in the first column of each record in the fares feed to indicate whether the record should be inserted, updated, or deleted in the database.

### Timetables
#### Import
Import the timetable information into a database, creating the schema if necessary. This operation is destructive and will remove any existing data.

```
dtd2db --timetable /path/to/RJTTFxxx.ZIP
```

#### Convert to GTFS
Convert the DTD/TTIS version of the timetable (up to 3 months into the future) to GTFS. 

```
dtd2db --timetable /path/to/RJTTFxxx.ZIP
dtd2db --gtfs-zip filename-of-gtfs.zip
```

### Routeing Guide
#### Import
```
dtd2db --routeing /path/to/RJRGxxxx.ZIP
dtd2db --nfm64 /path/to/nfm64.zip
```

### Download from SFTP server

The download commands will take the latest full refresh from an SFTP server (by default the DTD server).

Requires the following environment variables:

```
SFTP_USERNAME=dtd_username
SFTP_PASSWORD=dtd_password
SFTP_HOSTNAME=dtd_hostname (this will default to dtd.atocrsp.org)
```

There is a command for each feed:

```
dtd2db --download-fares /path/
dtd2db --download-timetable /path/
dtd2db --download-routeing /path/
dtd2db --download-nfm64 /path/
```

Or download and process in one command:

```
dtd2db --get-fares
dtd2db --get-timetable
dtd2db --get-routeing
dtd2db --get-nfm64
```

## Notes
### null values

Values marked as all asterisks, empty spaces, or in the case of dates - zeros, are set to null. This is to preserve the integrity of the column type. For instance a route code is numerical although the data feed often uses ***** to signify any so this value is converted to null. 

### keys
Although every record format has a composite key defined in the specification an `id` field is added as the fields in the composite key are sometimes null. This is no longer supported in modern versions of MariaDB or MySQL.

### missing data
At present journey segments, class legends, rounding rules, print formats  and the fares data feed meta data are not imported. They are either deprecated or irrelevant. Raise an issue or PR if you would like them added.

### timetable format

The timetable data does not map to a relational database in a very logical fashion so all LO, LI and LT records map to a single `stop_time` table.

### GTFS feed cutoff date

Only schedule records that **start** up to 3 months into the future (using date of import as a reference point) are exported to GTFS for performance reasons.
This will cause any data after that point to be either incomplete or incorrect, as override/cancellation records after that will be ignored as well.

## Dev and Testing

```
git clone git@github.com:seatfrog/dtd2db
npm install --dev
npm test
```

## RecordAction Short Codes

The following short codes are used in the codebase to represent different record actions:

- **I**: Insert
- **A**: Update
- **D**: Delete
- **DI**: DelayedInsert

These codes are used in logging and throughout the codebase for clarity and consistency.

## RecordAction Short Codes

The following short codes are used in the codebase to represent different record actions:

- **I**: Insert
- **A**: Update
- **D**: Delete
- **DI**: DelayedInsert

These codes are used in logging and throughout the codebase for clarity and consistency.

