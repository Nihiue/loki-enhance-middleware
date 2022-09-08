export { IPushRequest } from './message.mjs';
import * as winston from 'winston';

export type Logger = winston.Logger;

export interface ThreadMessage {
  type: 'DATA_INPUT' | 'DATA_OUTPUT';
  data: Uint8Array | Buffer | null;
  id?: number;
  error?: string;
};

export type RequestDisptcher = (raw: Buffer) => Promise<Buffer|null> | null;

export type LokiSender = (raw: Buffer, headers?: Record<string, string>) => Promise<{ data: any, status: number, contentType: string }>

export type Config = {
  loki_host: string;
  worker_count: number;
  listen_port: number;
  enabled_modules: string;
};
