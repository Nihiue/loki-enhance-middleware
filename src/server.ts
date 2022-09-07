import Koa from 'koa';

import { getLogger, readIncomingMessage } from './misc/utils.js';
import { Config, RequestDisptcher, LokiSender } from './misc/protocol.js';

const logger = getLogger('server');

const app = new Koa();

export default function startServer(config: Config, dispatchReq: RequestDisptcher, sendToLoki: LokiSender) {

  async function logStreamHandler(ctx: Koa.Context) {
    try {
      const raw = await readIncomingMessage(ctx.req);
      const result = await dispatchReq(raw);

      if (!result) {
        throw new Error('Empty result');
      }

      const { data, status } = await sendToLoki(result, {
        'content-type': ctx.request.headers['content-type'] || 'application/x-protobuf',
        'user-agent': ctx.request.headers['user-agent'] || 'loki enhance middleware'
      });

      ctx.body = data;
      ctx.status = status;

    } catch (e) {
      logger.error(e, 'Unable to proxy request');
      if (e.response) {
        ctx.body = e.response.data;
        ctx.status = e.response.status;
      } else {
        ctx.body = 'middleware error: ' + e.toString();
        ctx.status = 500;
      }
    }
  }

  async function defaultHandler(ctx: Koa.Context) {
      ctx.body = 'Not Found - loki-enhance-middleware'
      ctx.status = 404;
      logger.warn({
        method: ctx.method,
        url: ctx.url
      }, 'Ignore request');
  }

  async function readyHandler(ctx: Koa.Context) {
    ctx.body = 'ok';
  }

  app.use(function router(ctx) {
    switch (ctx.url) {
      case '/loki/api/v1/push':
        if (ctx.method === 'POST') {
          return logStreamHandler(ctx);
        }
      case '/ready':
        return readyHandler(ctx);
      default:
        return defaultHandler(ctx);
    }
  });

  const server = app.listen(config.listen_port);
  logger.info(`listen on ${config.listen_port}`);

  return function() {
    server.close();
    logger.info('server stopped');
  };
}
