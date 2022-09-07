import * as snappy from 'snappy';
import pkg from './push-request.cjs';

export const PushRequest = pkg.PushRequestOnlyPackage.PushRequest;

export interface IPushRequest extends pkg.PushRequestOnlyPackage.IPushRequest {};

export function decode(raw: Buffer): IPushRequest  {
  const decompressed = snappy.uncompressSync(raw, {
    asBuffer: true
  }) as Buffer;

  return PushRequest.decode(decompressed);
}

export function encode(logPayload: IPushRequest) {
  const packed = PushRequest.encode(logPayload).finish();
  return snappy.compressSync(Buffer.from(packed.buffer));
}
