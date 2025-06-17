import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { Logger, LogLevel } from '@utils/Logger';

describe('Logger', () => {
  const logPath = 'logs/test.log';
  let logger: Logger;

  beforeEach(() => {
    // Create logs directory if it doesn't exist
    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs');
    }

    // Clear any existing test log
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
    }

    logger = Logger.getInstance();
    logger.initialize(logPath, LogLevel.DEBUG);
  });

  afterEach(() => {
    logger.close();
    // Clean up test log
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
    }
  });

  it('should create and write to log file', async () => {
    const testMessage = 'Test log message';
    logger.info(testMessage);

    await waitForLogFlush(logger);

    expect(fs.existsSync(logPath)).to.be.true;
    const content = fs.readFileSync(logPath, 'utf8');
    expect(content).to.include(testMessage);
  });

  it('should format timestamps in London timezone', async () => {
    logger.info('Test timezone');
    await waitForLogFlush(logger);
    const content = fs.readFileSync(logPath, 'utf8');
    const timestamp = content.match(/\[(.*?)\]/)?.[1];
    
    // Verify timestamp format (DD/MM/YYYY HH:mm:ss)
    expect(timestamp).to.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
  });

  it('should respect log levels', async () => {
    logger.setLogLevel(LogLevel.WARN);
    
    logger.debug('Debug message');
    logger.info('Info message');
    logger.warn('Warn message');
    logger.error('Error message');

    await waitForLogFlush(logger);

    const content = fs.readFileSync(logPath, 'utf8');
    expect(content).to.not.include('Debug message');
    expect(content).to.not.include('Info message');
    expect(content).to.include('Warn message');
    expect(content).to.include('Error message');
  });

  it('should handle meta objects', async () => {
    const meta = { key: 'value', number: 42 };
    logger.info('Test meta', meta);

    await waitForLogFlush(logger);

    const content = fs.readFileSync(logPath, 'utf8');
    expect(content).to.include(JSON.stringify(meta));
  });

  it('should clear log file on initialization', async () => {
    // Write some content
    logger.info('First message');
    await waitForLogFlush(logger);

    // Close before reinitializing
    logger.close();

    // Reinitialize logger
    logger.initialize(logPath);

    // Write new message
    logger.info('Second message');
    await waitForLogFlush(logger);

    const content = fs.readFileSync(logPath, 'utf8');
    expect(content).to.not.include('First message');
    expect(content).to.include('Second message');
  });
});

function waitForLogFlush(logger: Logger): Promise<void> {
  return new Promise((resolve) => {
    // @ts-ignore
    if (logger['logStream']) {
      // @ts-ignore
      logger['logStream'].once('finish', resolve);
      // @ts-ignore
      logger['logStream'].end();
    } else {
      resolve();
    }
  });
} 