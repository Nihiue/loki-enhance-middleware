
import * as utils from './misc/utils.js';
import config from './config.js';
import { initDispatcher, dispatchProcessReq } from './dispatcher.js';
import startServer from './server.js';

const logger = utils.getLogger('entry');
logger.info('start with config', config);

const stopWorkers = initDispatcher(config);
const stopServer = startServer(config, dispatchProcessReq);

export function shutdown() {
  stopServer();
  stopWorkers();
};
