import * as snappy from 'snappy';
import { PushRequestPackage } from './push-request.mjs';

export const PushRequest = PushRequestPackage.PushRequest;
export type IPushRequest = PushRequestPackage.IPushRequest;

export function unpack(raw: Buffer): IPushRequest  {
  const decompressed = snappy.uncompressSync(raw, {
    asBuffer: true
  }) as Buffer;
  return PushRequest.toObject(PushRequest.decode(decompressed), {
    longs: Number,
    enums: String,
    bytes: String,
  });
}

export function pack(logPayload: IPushRequest) {
  const err = PushRequest.verify(logPayload);
  if (err) {
    throw new Error(err);
  }
  const bin = PushRequest.encode(logPayload).finish();
  return snappy.compressSync(Buffer.from(bin));
}
