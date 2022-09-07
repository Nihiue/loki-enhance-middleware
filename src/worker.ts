

import { isMainThread, parentPort, workerData } from 'worker_threads';

import config from './config.js';
import { getLogger, isAsyncFunction } from './misc/utils.js';
import { ThreadMessage } from './misc/protocol.js';
import { decode, encode } from './misc/message.js';

const workerId = workerData ? workerData.workerId : 0;
const logger = getLogger(`worker-${workerId}`);

if (isMainThread) {
  logger.fatal('worker is MainThread');
  process.exit(1);
}

const handlers: Function[] = [];

function registerHandler(handler: Function) {
  if (isAsyncFunction(handler)) {
    throw new Error('handler must be synchronous');
  }
  handlers.push(handler);
}

async function loadModules() {
  const enabled = config.enabled_modules;

  if (enabled === '*' || enabled.includes('geo-ip')) {
    const geoIpModule = await import('./modules/geo-ip.js');
    await geoIpModule.init(logger);
    registerHandler(geoIpModule.handler)
  }

  logger.info('worker ready');
}

const untilModulesLoaded = loadModules();

async function processLogStream(raw: Buffer) {
  if (handlers.length === 0) {
    return raw;
  }
  const logPayload = decode(raw);
  for (let i = 0; i < handlers.length; i += 1) {
    await handlers[i](logPayload, logger);
  }
  return encode(logPayload);
}

if (!parentPort) {
  logger.fatal('parentPort not exists');
  process.exit(1);
}

parentPort.on('message', async function({ data, id, type }: ThreadMessage) {
  if (type === 'DATA_INPUT') {
    let retData = null;

    try {
      await untilModulesLoaded;
      retData = await processLogStream(data);
    } catch (e) {
      logger.error(e, 'error when processLogStream');
    }

    const msg: ThreadMessage = {
      id,
      type: 'DATA_OUTPUT',
      data: retData
    };

    parentPort?.postMessage(msg, retData ? [ retData.buffer ] : undefined);
  }
  if (type === 'STOP_WORKER') {
    logger.info('worker stopped');
    process.exit();
  }
});
