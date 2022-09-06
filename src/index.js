const { Worker, isMainThread } = require('worker_threads');
const path = require('path');
const { startServer } = require('./server.js');
const config  = require('./config.js');

const logger = require('pino')({
  name: 'master'
});

if (!isMainThread) {
  logger.fatal('master must run as MainThread');
  process.exit(1);
}

logger.info(config, 'Start with config');

const pendingJobs = new Map();

const workers = [];

function workerMsgHandler({ type, id, data }) {
  if (type === 'DATA_OUTPUT' && pendingJobs.has(id)) {
    pendingJobs.get(id)(data);
    pendingJobs.delete(id);
    return;
  }
  if (type === 'LOG') {
    const { from, level, args } = data;
    logger[level](...args, from);
  }
}

for (let i = 0; i < config.worker_count; i += 1) {
  const wkr = new Worker(path.join(__dirname, 'worker.js'), {
    workerData: {
      workerId: i
    }
  });
  wkr.on('message', workerMsgHandler);
  workers.push(wkr);
}


let jobIdCounter = 0;

function bodyHandler(raw) {
  if (!raw instanceof Buffer) {
    throw new Error('input not Buffer');
  }
  const id = (jobIdCounter += 1);

  if (id % 10 === 0) {
    logger.info({ jobId: id, pendingCount: pendingJobs.size }, 'On new job');
  }

  return new Promise(function(resolve, reject) {
    pendingJobs.set(id, resolve);
    const msg = {
      type: 'DATA_INPUT',
      id,
      data: raw
    };
    workers[id % workers.length].postMessage(msg, [ raw.buffer ]);
  });
}

startServer(bodyHandler);