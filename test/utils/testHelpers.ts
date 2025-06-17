import * as sinon from 'sinon';
import { MockLogger } from './MockLogger';
import { Logger } from '@utils/Logger';

let mockLogger: MockLogger;

export function setupMockLogger(): MockLogger {
  mockLogger = new MockLogger();
  
  // Create a proxy that will intercept all calls to the logger
  const proxy = new Proxy(mockLogger, {
    get(target, prop) {
      if (prop in target) {
        return target[prop as keyof MockLogger];
      }
      return target.debugStub; // Default to debug stub for any unknown methods
    }
  });

  // Stub the getInstance method to return our proxy
  sinon.stub(Logger, 'getInstance').returns(proxy as any);
  
  return mockLogger;
}

export function teardownMockLogger(): void {
  sinon.restore();
  mockLogger = null as any;
} 