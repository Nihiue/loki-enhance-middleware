import { utils, workerPool, message } from './misc/index.mjs';
import { Config } from './config.mjs';
import LRU, { Lru } from 'tiny-lru';

export interface ModuleImp {
  name: string;
  matcher: string;
  replacer: (input:string) => string;
  init: (lg: utils.Logger) => Promise<any>;
}

interface LoadedModule {
  name: string;
  regx: RegExp;
  handler: (fullMatch:string, value:string) => string;
}

type Payload = workerPool.Payload;

import geoIpModule from './modules/geo-ip.mjs';
import uaDetectModule from './modules/ua-detect.mjs';

const moduleSource = [ geoIpModule, uaDetectModule ];

class ModuleManager {
  modules: LoadedModule[] = [];
  loadPromise: Promise<void> | null = null;
  constructor(enabled_modules: string) {
    this.loadPromise = this.loadModules(enabled_modules);
    workerEntry.registerHandler(this.jobHandler.bind(this));
  }

  async jobHandler(type:string, payload: Payload) {
    let ret: Payload = null;

    await this.loadPromise;
    switch (type) {
      case 'log-stream':
        if (utils.isBuffer(payload)) {
          ret = this.processLog(payload);
        } else {
          throw new Error('log-stream: invalid payload type')
        }
        break;
      case 'test':
        const testParams = (payload || {}) as Record<string, string>;
        const module = this.modules.find(m => m.name === testParams.name);
        ret = {
          value: module ? module.handler('', testParams.input) : 'not_found'
        }
        break;
    }
    return ret;
  }

  async loadModules(enabled: string) {
    for (let i = 0; i < moduleSource.length; i += 1) {
      const module = moduleSource[i];
      if (enabled === '*' || enabled.includes(module.name)) {
        if (utils.isAsyncFunction(module.replacer)) {
          logger.error('module replacer must be synchronous')
          continue;
        }
        await module.init(logger);
        const mCache = LRU<string>(1000, 0);
        this.modules.push({
          name: module.name,
          regx: new RegExp(`${module.matcher}="((\\"|[^"])+?)"`),
          handler(fullMatch:string, input:string) {
            let ret = mCache.get(input);
            if (!ret) {
              ret = module.replacer(input);
              mCache.set(input, ret);
            }
            return ret;
          }
        });
      }
    }
    logger.info('modules ready');
  }

  processLog(raw: Buffer) {
    const { modules } = this;
    if (modules.length === 0) {
      return raw;
    }
    const logPayload = message.unpack(raw);
    if (!logPayload.streams) {
      return raw;
    }

    for (const stream of logPayload.streams) {
      if (!stream.entries) {
        continue;
      }
      for (const entry of stream.entries) {
        if (entry.line) {
          for (const module of modules) {
            try {
              entry.line = entry.line.replace(module.regx, module.handler);
            } catch (e) {
              logger.error(e, 'processLog error');
            }
          }
        }
      }
    }
    return message.pack(logPayload);
  }
}

const workerEntry = new workerPool.WorkerEntry();
const logger = utils.getLogger(`worker-${workerEntry.workerId}`);
const config:Config = workerEntry.getWorkerData();

new ModuleManager(config.enabled_modules);