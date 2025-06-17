import { CleanFaresCommand } from "@cli/CleanFaresCommand";
import { DatabaseConnection } from "@database/DatabaseConnection";

/**
 * Snowflake-specific implementation of CleanFaresCommand
 */
export class SnowflakeCleanFaresCommand extends CleanFaresCommand {
  constructor(db: DatabaseConnection) {
    super(db);
  }

  /**
   * Override the date function to use Snowflake's CURRENT_DATE() instead of MySQL's CURDATE()
   */
  protected getDateFunction(): string {
    return "CURRENT_DATE()";
  }

  /**
   * Override the date comparison to use Snowflake's date comparison syntax
   */
  protected getDateComparison(column: string, date: string): string {
    return `${column} < ${date}`;
  }
} 