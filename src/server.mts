import Koa from 'koa';
import { utils, workerPool, request } from './misc/index.mjs';
import { Config } from './config.mjs';
import { Dispatcher } from './misc/worker-pool.mjs';
const logger = utils.getLogger('server');

export default function startServer(config: Config, dispatcher: workerPool.Dispatcher) {
  const app = new Koa();
  const routerTable: Record<string, Function> = {
    'POST:/loki/api/v1/push': logHandlerFactory(dispatcher, config),
    'GET:/ready': readyHandlerFactory(),
    'GET:/x/unit-test': testHandlerFactory(dispatcher)
  };

  app.use(async function router(ctx) {
    const handler = routerTable[`${ctx.method}:${ctx.path}`];

    if (handler) {
      await handler(ctx);
    } else {
      ctx.body = 'Not Found - loki-enhance-middleware'
      ctx.status = 404;
      logger.warn('Ignore request', ctx.method, ctx.url);
    }
  });

  const server = app.listen(config.listen_port);
  logger.info(`listen on ${config.listen_port}`);

  return server;
}

function logHandlerFactory(dispatcher: workerPool.Dispatcher, config: Config) {

  let sendProxyRequest = function sendToLoki(raw: Buffer, sourceHeaders: Record<string, any> = {}) {
    const headers = utils.pick(sourceHeaders, [
      ['content-type', 'application/x-protobuf'],
      ['user-agent', 'loki-enhance-mw'],
    ]);

    return request(`${config.loki_host}/loki/api/v1/push`, {
      body: raw,
      method: 'POST',
      headers
    });
  };

  if (process.env.NODE_ENV === 'test') {
    logger.warn('test env, using echo');
    sendProxyRequest = function echo(raw: Buffer, originalHeaders: Record<string, any> = {}) {
      const ret = {
        status: 200,
        data: JSON.stringify({
          $echo: {
            rawInHex: raw.toString('hex'),
            headers: originalHeaders
          }
        }),
        contentType: 'application/json'
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(ret);
        }, 100);
      });

    }
  }

  return async function (ctx: Koa.Context) {
    try {
      const raw = await utils.readIncomingMessage(ctx.req);
      const result = await dispatcher.dispatch('log-stream', raw);
      if (!result) {
        throw new Error('Empty result');
      }
      const { data, status, contentType } = await sendProxyRequest(result as Buffer, ctx.request.headers);
      ctx.set('content-type', contentType);
      ctx.body = data;
      ctx.status = status;
    } catch (e) {
      if (e.response) {
        logger.error('target reject', e.toString(), e.response.data.toString());
        ctx.body = e.response.data;
        ctx.status = e.response.status;
      } else {
        logger.error('Unable to proxy request', e.message);
        ctx.status = 500;
      }
    }
  };
}

function readyHandlerFactory() {
  return function(ctx: Koa.Context) {
    ctx.body = 'ok';
  }
}

function testHandlerFactory(dispatcher: workerPool.Dispatcher) {
  return async function(ctx: Koa.Context) {
    ctx.body = await dispatcher.dispatch('test', ctx.query);
  }
}