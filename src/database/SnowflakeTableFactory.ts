import { SnowflakeTable } from '@database/SnowflakeTable';
import { DatabaseConnection } from '@database/DatabaseConnection';
import { Logger } from '@utils/Logger';
import { Record as FeedRecord } from '@feed/record/Record';

export class SnowflakeTableFactory {
  private static instance: SnowflakeTableFactory;
  private tableCache: Map<string, SnowflakeTable> = new Map();

  private constructor() {}

  public static getInstance(): SnowflakeTableFactory {
    if (!SnowflakeTableFactory.instance) {
      SnowflakeTableFactory.instance = new SnowflakeTableFactory();
    }
    return SnowflakeTableFactory.instance;
  }

  public getTable(
    db: DatabaseConnection,
    tableName: string,
    schemaName: string,
    databaseName: string,
    flushLimit: number = 5000,
    record?: FeedRecord,
    logger?: Logger
  ): SnowflakeTable {
    const key = `${databaseName}.${schemaName}.${tableName}`;
    if (!this.tableCache.has(key)) {
      this.tableCache.set(key, new SnowflakeTable(db, tableName, schemaName, databaseName, flushLimit, record, logger));
    }
    return this.tableCache.get(key)!;
  }

  public clearCache(): void {
    this.tableCache.clear();
  }
} 