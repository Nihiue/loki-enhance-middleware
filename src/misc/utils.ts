import { IncomingMessage } from 'http';
import { pino } from 'pino';
import * as url from 'url';

export function getLogger(name ?: string) {
  return pino({
    name,
    level: process.env.NODE_ENV === 'test' ? 'fatal' : 'info',
    formatters: {
      level (label:any, number:any) {
        return { level: label };
      }
    },
    transport: {
      target: 'pino-pretty'
    },
  });
}

export function isBuffer(v:unknown): v is Buffer {
  return v instanceof Buffer;
}

export function isUint8Array(v:unknown): v is Uint8Array {
  return v instanceof Uint8Array;
}

export function readIncomingMessage(stream: IncomingMessage, timeout = 60): Promise<Buffer> {
  const _buf: Buffer[] = [];

  return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('readIncomingMessage timeout'));
      }, timeout * 1000);

      stream.on('data', (chunk: Buffer) => _buf.push(chunk));

      stream.on('end', () => {
        resolve(Buffer.concat(_buf));
        clearTimeout(timer);
      });

      stream.on('error', (err: Error) => {
        reject(err);
        clearTimeout(timer);
      });

  });
}

export function isAsyncFunction(val: Function) {
  return val.constructor.name === 'AsyncFunction';
}

export function getDirName(u:string) {
  return url.fileURLToPath(new URL('.', u));
}