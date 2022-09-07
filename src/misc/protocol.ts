import config from '../config.js';
export { IPushRequest } from './message.js';

export interface ThreadMessage {
  type: 'DATA_INPUT' | 'DATA_OUTPUT' | 'STOP_WORKER';
  data: Uint8Array | Buffer | Record<string, any> | null;
  id?: number;
};

export type RequestDisptcher = (raw: Buffer) => Promise<Buffer|null> | null;
export type LokiSender = (raw: Buffer, headers?: Record<string, string>) => Promise<{ data: any, status: number}>
export type Config = typeof config;


