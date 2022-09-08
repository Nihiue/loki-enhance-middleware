import { isMainThread, parentPort, workerData, threadId } from 'worker_threads';
import { utils, protocol, message } from './misc/index.mjs';
import geoIpModule from './modules/geo-ip.mjs';
const logger = utils.getLogger(`worker-${threadId}`);

if (isMainThread || !workerData) {
  logger.error('worker is MainThread');
  process.exit(1);
}

const config:protocol.Config = workerData;

type ModuleHandler = (data: protocol.IPushRequest, logger?: protocol.Logger) => void;
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
  const logPayload = message.unpack(raw);
  for (let i = 0; i < handlers.length; i += 1) {
    await handlers[i](logPayload, logger);
  }
  return  message.pack(logPayload);
}

if (!parentPort) {
  logger.error('parentPort not exists');
  process.exit(1);
}

parentPort.on('message', async function({ data, id, type }: protocol.ThreadMessage) {
  if (type === 'DATA_INPUT') {
    const retMsg: protocol.ThreadMessage = {
      id,
      type: 'DATA_OUTPUT',
      data: null
    };
    if (utils.isUint8Array(data)) {
      data = Buffer.from(data);
    }

    if (utils.isBuffer(data)) {
      try {
        await untilModulesLoaded;
        retMsg.data = await processLogStream(data);
      } catch (e) {
        retMsg.error = 'processLogStream error: ' + e.message;
      }
    } else {
      retMsg.error = 'invalid input type';
    }

    if (retMsg.error) {
      logger.error(retMsg.error);
    }

    parentPort?.postMessage(retMsg, retMsg.data ? [ retMsg.data.buffer ] : undefined);
  }
});
