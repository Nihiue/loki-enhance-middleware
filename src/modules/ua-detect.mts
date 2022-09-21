import DeviceDetector from 'device-detector-js';
import { ModuleImp } from '../module-manager.mjs';

const deviceDetector = new DeviceDetector({
  versionTruncation: null
});

function replacer (ua: string) {
  if (!ua) {
    return '';
  }
  const parsed = deviceDetector.parse(ua);
  const ret: Record<string, string | number> = {};

  if (parsed.bot) {
    ret.bot = parsed.bot.name;
  }
  if (parsed.client) {
    ret.client = `${parsed.client?.name || parsed.client.type};${parsed.client.version}`;
  }
  if (parsed.device) {
    ret.device = `${parsed.device?.brand  || parsed.device.type };${parsed.device.model}`;
  }
  if (parsed.os) {
    ret.os = `${parsed.os.name || parsed.os.platform};${parsed.os.version}`;
  }

  return Object.keys(ret).map(k => `ua_${k}="${ret[k]}"`).join(' ');
}

const module:ModuleImp = {
  name: 'ua-detect',
  matcher: 'Device_UA_Source',
  init: async () => {},
  replacer,
};


export default module;