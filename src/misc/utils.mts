import * as url from 'url';
import * as path from 'path';
import { IncomingMessage } from 'http';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ],
  silent: process.env.NODE_ENV === 'test'
});

export function getLogger(name ?: string) {
  return logger.child({ name });
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

export function resolveBy(u:string, ...args: string[]): string {
  return path.join(url.fileURLToPath(new URL('.', u)), ...args);
}

export function pick(data: Record<string, any>, props: [string, any][]) {
  const ret:Record<string, any> = {};
  for (let i = 0; i < props.length; i += 1) {
    const [k, d] = props[i];
    if (typeof data[k] === 'undefined') {
      ret[k] = d;
    } else {
      ret[k] = data[k];
    }
  }
  return ret;
}

export type Logger = winston.Logger;