import { IncomingMessage } from 'http';
import * as url from 'url';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ],
  silent: process.env.NODE_ENV === 'test'
});

export type Logger = winston.Logger;
export function getLogger(name ?: string):any {
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

export function getDirName(u:string) {
  return url.fileURLToPath(new URL('.', u));
}
