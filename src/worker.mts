import { Config } from './config.mjs';
import { utils, workerPool } from './misc/index.mjs';
import { ModuleManager } from './module-manager.mjs';

const workerEntry = new workerPool.WorkerEntry();
const config:Config = workerEntry.getWorkerData();
const logger = utils.getLogger(`worker-${workerEntry.workerId}`);
const manager = new ModuleManager(config.enabled_modules, logger);

workerEntry.registerHandler(manager.jobHandler.bind(manager));
