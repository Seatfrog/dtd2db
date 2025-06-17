import { LogLevel } from '@utils/Logger';
import * as sinon from 'sinon';

export class MockLogger {
  public debugStub: sinon.SinonStub;
  public infoStub: sinon.SinonStub;
  public warnStub: sinon.SinonStub;
  public errorStub: sinon.SinonStub;
  public initializeStub: sinon.SinonStub;
  public closeStub: sinon.SinonStub;

  constructor() {
    this.debugStub = sinon.stub();
    this.infoStub = sinon.stub();
    this.warnStub = sinon.stub();
    this.errorStub = sinon.stub();
    this.initializeStub = sinon.stub();
    this.closeStub = sinon.stub();
  }

  public debug(message: string, meta?: any): void {
    this.debugStub(message, meta);
  }

  public info(message: string, meta?: any): void {
    this.infoStub(message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.warnStub(message, meta);
  }

  public error(message: string, meta?: any): void {
    this.errorStub(message, meta);
  }

  public initialize(logPath: string, logLevel: LogLevel = LogLevel.INFO, timezone: string = 'Europe/London'): void {
    this.initializeStub(logPath, logLevel, timezone);
  }

  public close(): void {
    this.closeStub();
  }

  public static getInstance(): MockLogger {
    return new MockLogger();
  }
} 