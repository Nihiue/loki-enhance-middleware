import { utils, workerPool } from './misc/index.mjs';
import config from './config.mjs';
import startServer from './server.mjs';

const logger = utils.getLogger('entry');
logger.info('start with config', config);

const workerOpt = {
  count: config.worker_count,
  params: config,
  file: utils.resolveBy(import.meta.url, 'worker.mjs'),
};

const dispatcher = new workerPool.Dispatcher(workerOpt);
const server = startServer(config, dispatcher);

export function shutdown() {
  server.close();
  dispatcher.terminate();
};
