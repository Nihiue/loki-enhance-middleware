import { Worker, isMainThread } from 'worker_threads';
import { protocol, utils } from './misc/index.mjs';

const logger = utils.getLogger('dispatcher');
const workerFilePath = utils.resolveBy(import.meta.url, 'worker.mjs');
const pendingJobs: Map<number, {
  resolve: Function;
  reject: Function;
}> = new Map();
const workers: Worker[] = [];
let jobIdCounter = 0;

function workerMsgHandler({ type, id, data, error }: protocol.ThreadMessage) {
  if (type === 'DATA_OUTPUT' && typeof id === 'number') {
    const record = pendingJobs.get(id);

    if (!record) {
      return;
    }

    pendingJobs.delete(id);
    if (utils.isUint8Array(data)) {
      data = Buffer.from(data);
    }

    if (error) {
      record.reject(new Error(error));
    } else {
      record.resolve(data);
    }
  }
}

export const dispatch: protocol.RequestDisptcher = function (raw: any) {
    if (workers.length === 0) {
      logger.error('no workers');
      return null;
    }

    const id = (jobIdCounter += 1);

    if (id % 10 === 0) {
      logger.info('New job', { jobId: id, pendingCount: pendingJobs.size });
    }

    return new Promise<Buffer|null>(function(resolve, reject) {
      pendingJobs.set(id, {
        resolve,
        reject
      });
      const msg: protocol.ThreadMessage = {
        type: 'DATA_INPUT',
        id,
        data: raw
      };
      workers[id % workers.length].postMessage(msg, [ raw.buffer ]);
    });
  }

export function init(config: protocol.Config) {
  if (!isMainThread) {
    logger.error('dispatcher must run in MainThread');
    process.exit(1);
  }

  while (workers.length < config.worker_count) {
    const wkr = new Worker(workerFilePath, {
      workerData: config
    });
    wkr.on('message', workerMsgHandler);
    workers.push(wkr);
  }

  return function kill() {
    workers.forEach(wk => wk.terminate());
    workers.splice(0, workers.length);
    logger.info('dispatcher stopped');
  };
}
