import { utils, workerPool, message } from './misc/index.mjs';
import { Config } from './config.mjs';
export type ModuleImp = (data: message.IPushRequest, logger?: utils.Logger) => void;

import geoIpModule from './modules/geo-ip.mjs';
import uaDetectModule from './modules/ua-detect.mjs';

class ModuleManager {
  modules: ModuleImp[] = [];
  loadPromise: Promise<void> | null = null;
  constructor(enabled_modules: string) {
    this.loadPromise = this.loadModules(enabled_modules);

    workerEntry.registerHandler(async (type, payload) => {
      let ret: workerPool.Payload = null;
      await this.loadPromise;
      switch (type) {
        case 'log-stream':
          if (utils.isBuffer(payload)) {
            ret = await this.processLogStream(payload);
          } else {
            throw new Error('log-stream: invalid payload type')
          }
          break;
        case 'test':
          const testParams = payload as Record<string, string>;
          if (testParams.action === 'geo_info') {
            ret = {
              geoInfo: geoIpModule.getGeoInfo(testParams['ip'])
            }
          }
          if (testParams.action === 'ua_info') {
            ret = {
              uaInfo: uaDetectModule.getUAInfo(testParams['ua'])
            }
          }
          break;
      }
      return ret;
    });
  }

  addModule(module: ModuleImp) {
    if (utils.isAsyncFunction(module)) {
      throw new Error('module must be synchronous');
    }
    this.modules.push(module);
  }

  async loadModules(enabled: string) {
    if (enabled === '*' || enabled.includes('geo-ip')) {
      await geoIpModule.init(logger);
      this.addModule(geoIpModule.entry)
    }
    if (enabled === '*' || enabled.includes('ua-detect')) {
      this.addModule(uaDetectModule.entry);
    }
    logger.info('worker ready');
  }

  async processLogStream(raw: Buffer) {
    const { modules } = this;
    if (modules.length === 0) {
      return raw;
    }
    const logPayload = message.unpack(raw);
    for (let i = 0; i < modules.length; i += 1) {
      await modules[i](logPayload, logger);
    }
    return message.pack(logPayload);
  }


}

const workerEntry = new workerPool.WorkerEntry();
const logger = utils.getLogger(`worker-${workerEntry.workerId}`);
const config:Config = workerEntry.getWorkerData();

new ModuleManager(config.enabled_modules);