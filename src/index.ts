import * as fs from 'fs';
import * as path from 'path';
import moment from 'moment-timezone';

// Helper function to get London time
function getLondonTime() {
  return moment().tz('Europe/London').format('YYYY-MM-DD HH:mm:ss.SSS');
}

// Clear debug.log at startup
const debugLogFile = path.join(process.cwd(), 'debug.log');
try {
  fs.writeFileSync(debugLogFile, ''); // Clear the file
  fs.appendFileSync(debugLogFile, `[${getLondonTime()}] === Application Start ===\n`);
} catch (error) {
  process.stderr.write(`Error clearing debug.log: ${error}\n`);
}

// Early debug logging
process.stderr.write(`[DEBUG] Starting application at ${getLondonTime()}\n`);
process.stderr.write(`[DEBUG] Current working directory: ${process.cwd()}\n`);
process.stderr.write(`[DEBUG] Command line arguments: ${process.argv.join(' ')}\n`);

import {Container} from "@cli/Container";

const container = new Container();

container
  .getCommand(process.argv[2])
  .then(c => c.run(process.argv));