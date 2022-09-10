import { utils, workerPool, message } from './misc/index.mjs';
import { Config } from './config.mjs';
import LRU, { Lru } from 'tiny-lru';

export interface ModuleImp {
  name: string;
  matcher: string;
  replacer: (input:string) => string;
  init: (lg: utils.Logger) => Promise<any>;
}

interface LoadedModule extends ModuleImp {
  cache: Lru<string>;
  regx: RegExp;
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
          ret = await this.processLog(payload);
        } else {
          throw new Error('log-stream: invalid payload type')
        }
        break;
      case 'test':
        const testParams = (payload || {}) as Record<string, string>;
        const module = this.modules.find(m => m.name === testParams.name);
        ret = {
          value: module ? module.replacer(testParams.input) : 'not_found'
        }
        break;
    }
    return ret;
  }

  async loadModules(enabled: string) {
    for (let i = 0; i < moduleSource.length; i += 1) {
      const source = moduleSource[i];
      if (enabled === '*' || enabled.includes(source.name)) {
        if (utils.isAsyncFunction(source.replacer)) {
          logger.error('module replacer must be synchronous')
          continue;
        }
        await source.init(logger);
        this.modules.push(Object.assign({
          cache: LRU<string>(1000, 0),
          regx: new RegExp(`${source.matcher}="((\\"|[^"])+?)"`)
        }, source));
      }
    }
    logger.info('modules ready');
  }

  async processLog(raw: Buffer) {
    const { modules } = this;
    if (modules.length === 0) {
      return raw;
    }
    const logPayload = message.unpack(raw);
    logPayload.streams && logPayload.streams.forEach(function(stream) {
      stream.entries && stream.entries.forEach(function(entry) {
        if (!entry.line) {
          return;
        }
        modules.forEach(function(module) {
          try {
            entry.line = entry.line?.replace(module.regx, function(full, inputVal) {
              let ret = module.cache.get(inputVal);
              if (!ret) {
                ret = module.replacer(inputVal);
                module.cache.set(inputVal, ret);
              }
              return ret;
            });
          } catch (e) {
            logger.error(e, 'processLog error');
          }
        });
      });
    });


    return message.pack(logPayload);
  }
}

const workerEntry = new workerPool.WorkerEntry();
const logger = utils.getLogger(`worker-${workerEntry.workerId}`);
const config:Config = workerEntry.getWorkerData();

new ModuleManager(config.enabled_modules);