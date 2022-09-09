import LRU from 'tiny-lru';
import { ModuleImp } from '../worker.mjs';
import DeviceDetector from 'device-detector-js';
const deviceDetector = new DeviceDetector({
  versionTruncation: null
});

function genUAResult (ua: string) {
  if (!ua) {
    return '';
  }
  const parsed = deviceDetector.parse(ua);
  const ret: Record<string, string | number> = {};

  if (parsed.bot) {
    ret.bot = parsed.bot.name;
  }
  if (parsed.client) {
    ret.client = `${parsed.client?.name}, ${parsed.client.version}`;
  }
  if (parsed.device) {
    ret.device = `${parsed.device?.brand}, ${parsed.device.model}`;
  }
  if (parsed.os) {
    ret.os = `${parsed.os.name}, ${parsed.os.version ||parsed.os.platform}`;
  }

  return Object.keys(ret).map(k => `ua_${k}="${ret[k]}"`).join(' ');
}

const uaInfoCache = LRU<string>(500, 0);

function getUAInfo(ua: string) {
  let uaResult = uaInfoCache.get(ua);
  if (!uaResult) {
    uaResult = genUAResult(ua);
    uaInfoCache.set(ua, uaResult);
  }
  return uaResult;
}

const uaRegx = /Device_UA_Source="([^"]+)"/;

const entry:ModuleImp = function handler(data) {
  data.streams && data.streams.forEach(function(stream) {
    stream.entries && stream.entries.forEach(function(entry) {
      const res = entry.line && entry.line.match(uaRegx);
      if (res && entry.line) {
        const uaInfo = getUAInfo(res[1]);
        entry.line = entry.line.replace(uaRegx, uaInfo);
      }
    });
  });
}

export default {
  getUAInfo,
  entry
};