import { getLogger, isBuffer, isUint8Array, getDirName } from './misc/utils.js';
import { Worker, isMainThread } from 'worker_threads';
import { ThreadMessage, RequestDisptcher } from './misc/protocol.js';
import * as path from 'path';

const logger = getLogger('dispatcher');
const workerFilePath = path.join(getDirName(import.meta.url), 'worker.js');
const pendingJobs: Map<number, Function> = new Map();
const workers: Worker[] = [];
let jobIdCounter = 0;

function workerMsgHandler({ type, id, data }: ThreadMessage) {
  if (typeof id === 'number' && type === 'DATA_OUTPUT' && pendingJobs.has(id)) {

    if (isUint8Array(data)) {
      data = Buffer.from(data);
    }

    (pendingJobs.get(id) as Function)(data);
    pendingJobs.delete(id);
    return;
  }
}

export const dispatchProcessReq:RequestDisptcher = function (raw: any) {
  if (workers.length === 0) {
    logger.fatal('no workers');
    return null;
  }

  if (!isBuffer(raw)) {
    logger.fatal('input is not Buffer');
    return null;
  }

  const id = (jobIdCounter += 1);

  if (id % 10 === 0) {
    logger.info({ jobId: id, pendingCount: pendingJobs.size }, 'New job');
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

export function startWorker(worker_count: number) {
  if (!isMainThread) {
    logger.fatal('dispatcher must run in MainThread');
    process.exit(1);
  }

  while (workers.length < worker_count) {
    const wkr = new Worker(workerFilePath, {
      workerData: {
        workerId: workers.length
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
  }
}
