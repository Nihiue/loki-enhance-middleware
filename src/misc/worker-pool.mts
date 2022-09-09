import * as utils from './utils.mjs';
import { Worker, isMainThread, parentPort, workerData, threadId } from 'worker_threads';
const logger = utils.getLogger(`worker-pool-${threadId}`);

export type Payload = Buffer | Record<string, any> | null;

interface WorkerMessage {
  id: number;
  type: string;
  payload: Payload;
  errorMessage?: string;
};

type JobRecord = {
  resolve: Function;
  reject: Function;
};

export type JobHandler = (type: string, payload: Payload) => Promise<Payload>;

type WorkerOption = {
  count: number;
  file: string;
  params: any;
};

function normalizePayload(payload: Payload): Buffer | Record<string, any> | null {
  if (!utils.isBuffer(payload) && utils.isUint8Array(payload)) {
    return Buffer.from(payload);
  }
  return payload;
}

function getTransterList(msg: WorkerMessage) {
  if (utils.isUint8Array(msg.payload)) {
    return [ msg.payload.buffer ];
  }
}

export class Dispatcher {
  workers: Worker[] = []
  pendingJobs: Map<number, JobRecord> = new Map()
  jobIdCounter: number = 0

  constructor(workerOpt: WorkerOption) {
    if (!isMainThread) {
      throw new Error('is not main thread');
    }

    const workers = this.workers;
    const msgHandler = this.onWorkerMsg.bind(this);

    while (workers.length < workerOpt.count) {
      const wkr = new Worker(workerOpt.file, {
        workerData: workerOpt.params
      });
      wkr.on('message', msgHandler);
      workers.push(wkr);
    }
  }

  dispatch(type: string, payload: Payload) {
    const { workers, pendingJobs } = this;
    if (workers.length === 0) {
      logger.error('no workers');
      return null;
    }

    const id = (this.jobIdCounter += 1);

    if (id % 10 === 0) {
      logger.info('dispatch job', { jobId: id, pendingCount: pendingJobs.size });
    }

    return new Promise<Payload>(function(resolve, reject) {
      pendingJobs.set(id, { resolve, reject });

      const msg: WorkerMessage = {
        id,
        type,
        payload,
      };

      workers[id % workers.length].postMessage(msg, getTransterList(msg));
    });
  }

  onWorkerMsg({ id, type ,payload, errorMessage }: WorkerMessage) {
    const { pendingJobs } = this;

    const jobRecord = pendingJobs.get(id);

    if (!jobRecord) {
      return logger.error(`jobRecord not found: ${id}`);
    }

    pendingJobs.delete(id);

    if (errorMessage) {
      jobRecord.reject(new Error(errorMessage));
    } else {
      jobRecord.resolve(normalizePayload(payload));
    }
  }

  terminate() {
    const { workers } = this;
    workers.forEach(wk => wk.terminate());
    workers.splice(0, workers.length);
    logger.info('dispatcher terminated');
  }
}

export class WorkerEntry {
  jobHandler: JobHandler | null = null
  workerId: number = -1
  constructor() {
    if (isMainThread || !parentPort) {
      throw new Error('is main thread');
    }
    this.workerId = threadId;
    parentPort.on('message', this.onDispatcherMsg.bind(this));
  }

  getWorkerData() {
    return workerData;
  }

  registerHandler(jobHandler: JobHandler) {
    if (this.jobHandler) {
      throw new Error('jobHandler exists');
    }
    this.jobHandler = jobHandler;
  }

  async onDispatcherMsg({ id, type, payload }: WorkerMessage) {
    if (!this.jobHandler) {
      return;
    }
    const retMsg: WorkerMessage = {
      id,
      type,
      payload: null
    };

    try {
      retMsg.payload = await this.jobHandler(type, normalizePayload(payload));
    } catch (e) {
      retMsg.errorMessage = e.message;
    }
    parentPort?.postMessage(retMsg, getTransterList(retMsg));
  }
}