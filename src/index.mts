
import { utils } from './misc/index.mjs';
import config from './config.mjs';
import * as dispatcher from './dispatcher.mjs';
import startServer from './server.mjs';

const logger = utils.getLogger('entry');
logger.info('start with config', config);

const killDispatcher = dispatcher.init(config);
const killServer = startServer(config, dispatcher.dispatch);

export function shutdown() {
  killDispatcher();
  killServer();
};
