import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export class Logger {
  private static instance: Logger;
  private logStream: fs.WriteStream | null = null;
  private logLevel: LogLevel = LogLevel.INFO;
  private timezone: string = 'Europe/London';

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public initialize(logPath: string, logLevel: LogLevel = LogLevel.INFO, timezone: string = 'Europe/London'): void {
    this.logLevel = logLevel;
    this.timezone = timezone;
    
    try {
      // Create directory if it doesn't exist
      const logDir = path.dirname(logPath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      // Clear existing log file
      this.clearLog(logPath);

      // Create or append to log file
      this.logStream = fs.createWriteStream(logPath, { flags: 'a' });
      
      // Ensure the file is created
      fs.writeFileSync(logPath, '');
    } catch (error) {
      console.error(`Failed to initialize logger: ${error}`);
      throw error;
    }
  }

  public clearLog(logPath: string): void {
    try {
      if (fs.existsSync(logPath)) {
        fs.writeFileSync(logPath, '');
      }
    } catch (error) {
      console.error(`Failed to clear log file: ${error}`);
      throw error;
    }
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const now = new Date();
    const timestamp = now.toLocaleString('en-GB', { 
      timeZone: this.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
    
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level}: ${message}${metaStr}\n`;
  }

  private log(level: LogLevel, message: string, meta?: any): void {
    if (this.shouldLog(level)) {
      try {
        const formattedMessage = this.formatMessage(level, message, meta);
        if (this.logStream) {
          this.logStream.write(formattedMessage);
        }
        // Also log to console for development
        console.log(formattedMessage.trim());
      } catch (error) {
        console.error(`Failed to write log: ${error}`);
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  public getLogLevel(): LogLevel {
    return this.logLevel;
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  public debug(message: string, meta?: any): void {
    this.log(LogLevel.DEBUG, message, meta);
  }

  public info(message: string, meta?: any): void {
    this.log(LogLevel.INFO, message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.log(LogLevel.WARN, message, meta);
  }

  public error(message: string, meta?: any): void {
    this.log(LogLevel.ERROR, message, meta);
  }

  public close(): void {
    try {
      if (this.logStream) {
        this.logStream.end();
        this.logStream = null;
      }
    } catch (error) {
      console.error(`Failed to close logger: ${error}`);
    }
  }
} 