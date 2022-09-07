import { Config } from "./misc/protocol.js";

const {
  WORKER_COUNT = '1',
  PORT = '3100',
  LOKI_HOST = 'http://loki:3100',
  ENABLED_MODULES = '*'
} = process.env;

const cfg:Config = {
  loki_host: LOKI_HOST,
  worker_count: parseInt(WORKER_COUNT, 10),
  listen_port: parseInt(PORT, 10),
  enabled_modules: ENABLED_MODULES,
};

export default cfg;