import * as snappy from 'snappy';
import pkg from './push-request.cjs';

export const PushRequest = pkg.PushRequestPackage.PushRequest;
export type IPushRequest = pkg.PushRequestPackage.IPushRequest;

export function decode(raw: Buffer): IPushRequest  {
  const decompressed = snappy.uncompressSync(raw, {
    asBuffer: true
  }) as Buffer;

  return PushRequest.toObject(PushRequest.decode(decompressed), {
    longs: Number,
    enums: String,
    bytes: String,
  });
}

export function encode(logPayload: IPushRequest) {
  const err = PushRequest.verify(logPayload);
  if (err) {
    throw new Error(err);
  }
  const packed = PushRequest.encode(logPayload).finish();
  return snappy.compressSync(Buffer.from(packed));
}
