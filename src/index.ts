
import axios from 'axios';
import { getLogger } from './misc/utils.js';
import { LokiSender } from './misc/protocol.js';
import config from './config.js';

import { startWorker, dispatchProcessReq } from './dispatcher.js';
import startServer from './server.js';

const logger = getLogger('entry');
logger.info(config, 'start with config');

let lokiSender:LokiSender;

if (process.env.NODE_ENV === 'test') {
  logger.warn('test env, using echo sender');
  lokiSender = function echo(raw, headers) {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        data: {
          echo: {
            raw,
            headers
          }
        }
      });
    })
  };
} else {
  lokiSender = function sendByHTTP(raw, headers) {
    return axios.default.post(`${config.loki_host}/loki/api/v1/push`, raw, {
      headers: headers || {}
    });
  };
}

const stopWorkers = startWorker(config.worker_count);
const stopServer = startServer(config, dispatchProcessReq, lokiSender);

export function shutdown() {
  stopServer();
  stopWorkers();
}