import { isMainThread, parentPort, workerData } from 'worker_threads';
import * as utils from './misc/utils.js';
import { ThreadMessage, IPushRequest, Config } from './misc/protocol.js';
import { decode, encode } from './misc/message.js';
import geoIpModule from './modules/geo-ip.js';


const workerId = workerData ? workerData.workerId : 0;
const logger = utils.getLogger(`worker-${workerId}`);

if (isMainThread || !workerData) {
  logger.error('worker is MainThread');
  process.exit(1);
}

const config:Config = workerData.config;

type ModuleHandler = (data: IPushRequest, logger?: utils.Logger) => void;
const handlers: ModuleHandler[] = [];

function registerHandler(handler: ModuleHandler) {
  if (utils.isAsyncFunction(handler)) {
    throw new Error('handler must be synchronous');
  }
  handlers.push(handler);
}

async function loadModules() {
  const enabled = config.enabled_modules;

  if (enabled === '*' || enabled.includes('geo-ip')) {
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
  logger.error('parentPort not exists');
  process.exit(1);
}

parentPort.on('message', async function({ data, id, type }: ThreadMessage) {
  if (type === 'DATA_INPUT') {
    let retData = null;

    if (utils.isUint8Array(data)) {
      data = Buffer.from(data);
    }

    if (utils.isBuffer(data)) {
      try {
        await untilModulesLoaded;
        retData = await processLogStream(data);
      } catch (e) {
        logger.error('error when processLogStream', e.message);
      }
    } else {
      logger.error('invalid input type');
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
