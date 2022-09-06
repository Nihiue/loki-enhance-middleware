module.exports = {
  loki_host: process.env.LOKI_HOST || 'http://loki:3100',
  worker_count: parseInt(process.env.WORKER_COUNT || 1, 10),
  listen_port: parseInt(process.env.PORT || 3100, 10),
  enabled_modules: ['geo-ip'],
};