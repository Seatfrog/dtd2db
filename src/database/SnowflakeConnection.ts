import { Connection, ConnectionOptions, Pool, createPool } from "snowflake-sdk";
import { DatabaseConnection, DatabaseConfiguration } from "./DatabaseConnection";
import { Logger, LogLevel } from "../utils/Logger";
import { Readable } from "stream";

export class SnowflakeConnection implements DatabaseConnection {
  private connection: Connection | null = null;
  private pool: Pool<Connection> | null = null;
  private isConnecting: boolean = false;
  private connectionPromise: Promise<Connection> | null = null;
  public readonly type: "snowflake" = "snowflake";
  private logger: Logger;

  constructor(private config: DatabaseConfiguration, logger?: Logger) {
    this.logger = logger || Logger.getInstance();
    this.logger.debug('SnowflakeConnection constructor called');
    this.logger.debug(`Config: ${JSON.stringify({
      ...config,
      privateKeyPath: config.privateKeyPath ? '***' : 'null'
    })}`);

    const requiredFields = {
      host: "account",
      user: "username",
      privateKeyPath: "private key path",
      database: "database",
      schema: "schema",
      warehouse: "warehouse",
      role: "role"
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => {
        const value = config[key as keyof DatabaseConfiguration];
        return value === undefined || value === null || value === "";
      })
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      const error = `Snowflake configuration requires the following fields to be set: ${missingFields.join(", ")}`;
      this.logger.debug(`Missing required fields: ${JSON.stringify(missingFields)}`);
      throw new Error(error);
    }

    const options: ConnectionOptions = {
      account: config.host,
      username: config.user,
      privateKeyPath: config.privateKeyPath,
      database: config.database,
      schema: config.schema,
      warehouse: config.warehouse,
      role: config.role,
      authenticator: "SNOWFLAKE_JWT"
    };

    this.logger.debug(`Creating Snowflake connection with options: ${JSON.stringify({
      ...options,
      privateKeyPath: options.privateKeyPath ? '***' : 'null'
    })}`);

    try {
      this.pool = createPool(options, {
        max: config.connectionLimit,
        min: 1,
        idleTimeoutMillis: 300000,
        acquireTimeoutMillis: 120000,
      });

      this.pool.on('acquire', () => {
        this.logger.debug('Connection acquired from pool');
      });

      this.pool.on('release', () => {
        this.logger.debug('Connection released back to pool');
      });

      this.pool.on('error', (err) => {
        this.logger.debug(`Pool error: ${err}`);
      });

      this.pool.on('factoryCreateError', (err) => {
        this.logger.debug(`Error creating connection: ${err}`);
      });

      this.pool.on('factoryDestroyError', (err) => {
        this.logger.debug(`Error destroying connection: ${err}`);
      });
    } catch (error) {
      this.logger.debug(`Error creating Snowflake pool: ${error}`);
      throw error;
    }
  }

  async getConnection(): Promise<DatabaseConnection> {
    if (this.connection) {
      return this;
    }

    if (this.isConnecting) {
      this.logger.debug('Connection already in progress, waiting...');
      await this.connectionPromise;
      return this;
    }

    try {
      this.logger.debug('Attempting to acquire connection from pool...');
      this.isConnecting = true;
      this.connectionPromise = this.pool!.acquire();
      this.connection = await this.connectionPromise;
      this.logger.debug('Successfully acquired connection');
      return this;
    } catch (error) {
      this.logger.debug(`Failed to acquire connection: ${error}`);
      if (error instanceof Error) {
        this.logger.debug(`Error details: ${JSON.stringify({
          name: error.name,
          message: error.message,
          stack: error.stack
        })}`);
      }
      throw error;
    } finally {
      this.isConnecting = false;
      this.connectionPromise = null;
    }
  }

  async query<RowType = unknown>(sql: string, parameters?: any[]): Promise<[RowType[], any]> {
    const connection = await this.getConnection();
    
    this.logger.debug(`Executing SQL query: ${sql}`);
    if (parameters) {
      this.logger.debug(`With parameters: ${JSON.stringify(parameters)}`);
    }
    
    return new Promise((resolve, reject) => {
      this.connection!.execute({
        sqlText: sql,
        binds: parameters,
        complete: (err, stmt, rows) => {
          if (err) {
            this.logger.debug(`SQL execution failed: ${err.message}`);
            this.logger.debug(`Error details: ${JSON.stringify(err)}`);
            reject(err);
            return;
          }
          resolve([rows as RowType[], stmt]);
        }
      });
    });
  }

  async stream(sql: string): Promise<Readable> {
    const connection = await this.getConnection();
    
    this.logger.debug(`Creating stream for SQL: ${sql}`);
    
    return new Promise((resolve, reject) => {
      this.connection!.execute({
        sqlText: sql,
        streamResult: true,
        complete: (err, stmt) => {
          if (err) {
            this.logger.debug(`Stream creation failed: ${err.message}`);
            this.logger.debug(`Error details: ${JSON.stringify(err)}`);
            reject(err);
            return;
          }
          // Create a readable stream from the statement
          const stream = new Readable({
            objectMode: true,
            read() {
              stmt.streamRows()
                .on('data', (row) => this.push(row))
                .on('end', () => this.push(null))
                .on('error', (err) => this.emit('error', err));
            }
          });
          resolve(stream);
        }
      });
    });
  }

  async end(): Promise<void> {
    if (this.connection) {
      try {
        await new Promise<void>((resolve) => {
          this.connection!.destroy(() => resolve());
        });
      } catch (error) {
        this.logger.debug('Error destroying connection:');
        this.logger.debug(error instanceof Error ? error.message : JSON.stringify(error));
      } finally {
        this.connection = null;
      }
    }
  }

  async release(): Promise<void> {
    if (this.connection && this.pool) {
      await this.pool.release(this.connection);
      this.logger.debug('Connection released back to pool');
      this.connection = null;
    }
  }
} 
