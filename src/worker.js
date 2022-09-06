const snappy = require('snappy');
const protobuf = require('protobufjs');
const path = require('path');
const geoIp = require('./modules/geo-ip.js');
const config = require('./config.js');

const { isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  logger.fatal('worker is MainThread');
  process.exit(1);
}

const logger = require('pino')({
  name: `worker-${workerData.workerId}`
});

function loadPushRequest() {
  const root = new protobuf.Root();
  root.resolvePath = function (origin, target) {
    return path.join(__dirname, '../proto-path', target);
  }
  root.loadSync('pkg/logproto/logproto.proto');
  return root.lookupType('logproto.PushRequest');
}

const PushRequest = loadPushRequest();
const handlers = [];

if (config.enabled_modules.includes('geo-ip')) {
  handlers.push(geoIp.handler);
}

async function processLogData(raw) {
  if (handlers.length === 0) {
    return raw;
  }

  const decompressed = await snappy.uncompress(raw);
  const data = PushRequest.decode(decompressed);

  for (let i = 0; i < handlers.length; i += 1) {
    await handlers[i](data, logger);
  }

  const compressed = await snappy.compress(PushRequest.encode(data).finish());
  return compressed;
}

parentPort.on('message', async function({ data, id, type }) {
  if (type === 'DATA_INPUT') {
    let retData = null;

    try {
      retData = await processLogData(data);
    } catch (e) {
      logger.error(e, 'Error when processLogData');
    }

    const msg = {
      id,
      type: 'DATA_OUTPUT',
      data: retData
    };
    parentPort.postMessage(msg, retData ? [ retData.buffer ] : undefined);
  }
});
