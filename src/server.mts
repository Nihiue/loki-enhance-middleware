import Koa from 'koa';
import { protocol, utils, request } from './misc/index.mjs';
const logger = utils.getLogger('server');

let dispatchReq: protocol.RequestDisptcher;
let lokiSender: protocol.LokiSender;

const app = new Koa();

async function logStreamHandler(ctx: Koa.Context) {
  try {
    const raw = await utils.readIncomingMessage(ctx.req);
    const result = await dispatchReq(raw);

    if (!result) {
      throw new Error('Empty result');
    }

    const { data, status, contentType } = await lokiSender(result, {
      'content-type': ctx.request.headers['content-type'] || 'application/x-protobuf',
      'user-agent': ctx.request.headers['user-agent'] || 'loki enhance middleware'
    });

    ctx.set('content-type', contentType);
    ctx.body = data;
    ctx.status = status;

  } catch (e) {
    if (e.response) {
      logger.error('target reject', {
        message: e.toString(),
        data: e.response.data.toString(),
        status: e.response.status
      });

      ctx.body = e.response.data;
      ctx.status = e.response.status;
    } else {
      logger.error('Unable to proxy request', e.message);
      ctx.body = 'middleware error: ' + e.toString();
      ctx.status = 500;
    }
  }
}

async function defaultHandler(ctx: Koa.Context) {
    ctx.body = 'Not Found - loki-enhance-middleware'
    ctx.status = 404;
    logger.warn('Ignore request', ctx.method, ctx.url);
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

export default function startServer(config: protocol.Config, dispatch: protocol.RequestDisptcher) {
  lokiSender = request.getLokiSender(config.loki_host, logger);
  dispatchReq = dispatch;

  const server = app.listen(config.listen_port);
  logger.info(`listen on ${config.listen_port}`);

  return function kill() {
    server.close();
    logger.info('server stopped');
  };
}
