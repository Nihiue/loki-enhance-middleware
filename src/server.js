const axios = require('axios');
const Koa = require('koa');
const config = require('./config.js');

function stream2buffer(stream) {
  return new Promise((resolve, reject) => {
      const timer = setTimeout(reject, 60 * 1000);
      const _buf = [];
      stream.on('data', (chunk) => _buf.push(chunk));
      stream.on('end', () => {
        resolve(Buffer.concat(_buf));
        clearTimeout(timer);
      });
      stream.on('error', (err) => {
        reject(err);
        clearTimeout(timer);
      });
  });
}

module.exports = {
  startServer(bodyHandler) {
    const app = new Koa();

    app.use(async (ctx) => {
      if (ctx.method !== 'POST' || ctx.url !== '/loki/api/v1/push') {
        ctx.body = 'Not Found - loki-enhance-middleware'
        ctx.status = 404;
        return;
      }

      try {
        const raw = await stream2buffer(ctx.req);
        const result = await bodyHandler(raw);

        if (!result) {
          throw new Eeror('Empty result');
        }

        const resp = await axios.post(`${config.loki_host}/loki/api/v1/push`, result, {
          headers: {
            'content-type': ctx.request.headers['content-type'],
            'user-agent': ctx.request.headers['user-agent']
          }
        });
        ctx.body = resp.data;
        ctx.status = resp.status;
      } catch (e) {
        console.log('Proxy Error', e.toString());
        if (e.response) {
          ctx.body = e.response.data;
          ctx.status = e.response.status;
        } else {
          ctx.body = e.toString();
          ctx.status = 500;
        }
      }
    });

    console.log(`listen on ${config.listen_port}`);
    app.listen(config.listen_port);
  }
}