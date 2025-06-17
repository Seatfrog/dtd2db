
export interface DatabaseConnection {
  type: "mysql" | "snowflake";
  query<RowType = unknown>(sql: string, parameters?: any[]): Promise<[RowType[], any]>;
  stream(sql: string): Promise<any>;
  end(): Promise<void>;
  getConnection(): Promise<DatabaseConnection>;
  release(): Promise<void>;
}

export interface DatabaseConfiguration {
  host: string;
  user: string;
  password?: string | null;
  privateKeyPath?: string;
  database: string;
  port: number;
  connectionLimit: number;
  multipleStatements: boolean;
  schema?: string;
  warehouse?: string;
  role?: string;
}
