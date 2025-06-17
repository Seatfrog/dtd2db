import { DatabaseConnection } from "./DatabaseConnection";
import { Readable } from "stream";

export interface MySQLConnection extends DatabaseConnection {
  // MySQL specific methods can be added here if needed
}

export interface DatabaseConfiguration {
  host: string;
  user: string;
  password: string | null;
  database: string;
  port: number;
  connectionLimit: number;
  multipleStatements: boolean;
  schema?: string;
  warehouse?: string;
  role?: string;
}

export class MySQLConnectionImpl implements MySQLConnection {
  private connection: any = null;
  private pool: any = null;
  public readonly type: "mysql" = "mysql";

  constructor(private config: DatabaseConfiguration) {
    this.pool = require('mysql2/promise').createPool({
      ...config,
      //debug: ['ComQueryPacket', 'RowDataPacket']
    });
  }

  async getConnection(): Promise<MySQLConnection> {
    if (!this.connection) {
      this.connection = await this.pool.getConnection();
    }
    return this;
  }

  async query<RowType = unknown>(sql: string, parameters?: any[]): Promise<[RowType[], any]> {
    const connection = await this.getConnection();
    const [rows, fields] = await this.connection.query(sql, parameters);
    return [rows as RowType[], fields];
  }

  async stream(sql: string): Promise<Readable> {
    const connection = await this.getConnection();
    return this.connection.query(sql).stream();
  }

  async end(): Promise<void> {
    if (this.connection) {
      await this.connection.release();
      this.connection = null;
    }
  }

  async release(): Promise<void> {
    if (this.connection) {
      await this.connection.release();
      this.connection = null;
    }
  }
} 