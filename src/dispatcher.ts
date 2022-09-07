import { Worker, isMainThread } from 'worker_threads';
import { ThreadMessage, RequestDisptcher, Config } from './misc/protocol.js';
import * as path from 'path';

import * as utils from './misc/utils.js';

const logger = utils.getLogger('dispatcher');
const workerFilePath = path.join(utils.getDirName(import.meta.url), 'worker.js');
const pendingJobs: Map<number, Function> = new Map();
const workers: Worker[] = [];
let jobIdCounter = 0;

function workerMsgHandler({ type, id, data }: ThreadMessage) {
  if (typeof id === 'number' && type === 'DATA_OUTPUT' && pendingJobs.has(id)) {

    if (utils.isUint8Array(data)) {
      data = Buffer.from(data);
    }

    (pendingJobs.get(id) as Function)(data);
    pendingJobs.delete(id);
    return;
  }
}

export const dispatchProcessReq:RequestDisptcher = function (raw: any) {
    if (workers.length === 0) {
      logger.error('no workers');
      return null;
    }

    if (!utils.isBuffer(raw)) {
      logger.error('input is not Buffer');
      return null;
    }

    const id = (jobIdCounter += 1);

    if (id % 10 === 0) {
      logger.info('New job', { jobId: id, pendingCount: pendingJobs.size });
    }

    return new Promise<Buffer|null>(function(resolve, reject) {
      pendingJobs.set(id, resolve);
      const msg: ThreadMessage = {
        type: 'DATA_INPUT',
        id,
        data: raw
      };
      workers[id % workers.length].postMessage(msg, [ raw.buffer ]);
    });
  }

export function initDispatcher(config: Config) {
  if (!isMainThread) {
    logger.error('dispatcher must run in MainThread');
    process.exit(1);
  }

  while (workers.length < config.worker_count) {
    const wkr = new Worker(workerFilePath, {
      workerData: {
        workerId: workers.length,
        config,
      }
    });
    wkr.on('message', workerMsgHandler);
    wkr.on('exit', function () {
      const idx = workers.indexOf(wkr);
      if (idx > -1) {
        workers.splice(idx, 1);
      }
    });
    workers.push(wkr);
  }

  return function() {
    const stopMsg: ThreadMessage =  {
      type: 'STOP_WORKER',
      data: {
        reason: 'shutdown'
      }
    }
    workers.forEach(wk => wk.postMessage(stopMsg));
  };
}
