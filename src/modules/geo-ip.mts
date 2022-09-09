import maxmind from 'maxmind';
import LRU from 'tiny-lru';
import { Reader, AsnResponse, CityResponse } from 'maxmind';
import { utils } from '../misc/index.mjs';
import { ModuleImp } from '../worker.mjs';

let lookupCity: Reader<CityResponse> | null = null;
let lookupASN: Reader<AsnResponse> | null = null;

async function init(logger: utils.Logger) {
  if (lookupCity) {
    return;
  }

  const cityFile = utils.resolveBy(import.meta.url, '../../../mmdb/', 'GeoLite2-City.mmdb');
  const asnFile = utils.resolveBy(import.meta.url, '../../../mmdb/', 'GeoLite2-ASN.mmdb');

  const mmOption = {
    cache: {
      max: 100
    }
  };

  try {
    lookupCity = await maxmind.open(cityFile, mmOption);
    lookupASN = await maxmind.open(asnFile, mmOption);
  } catch (e) {
    logger.error('Missing maxmind DB files', {
      cityFile,
      asnFile,
      source: 'Please download from https://www.maxmind.com/en/geolite2/signup'
    });
    throw new Error('Maxmind DB not ready');
  }
}

function genGeoStr (ip: string) {
  if (!ip || !lookupASN || !lookupCity) {
    return '';
  }

  const asn = lookupASN.get(ip);
  const main = lookupCity.get(ip);

  const ret: Record<string, string | number> = {};

  if (asn) {
    ret.asn = asn.autonomous_system_organization;
  }

  if (main) {
    if (main.continent) {
      ret.continent = main.continent.names['en'];
    }

    if (main.city) {
      ret.city = main.city.names['en'];
      ret.city_geoname_id = main.city.geoname_id;
    }

    if (main.country) {
      ret.country = main.country.names['en'];
      ret.country_geoname_id = main.country.geoname_id;
      ret.country_iso_code = main.country.iso_code;
    }

    if (main.location) {
      ret.latitude = main.location.latitude;
      ret.longitude = main.location.longitude;
    }
  }

  return Object.keys(ret).map(k => `geo_ip_${k}="${ret[k]}"`).join(' ');
}

const geoInfoCache = LRU<string>(2000, 0);

function getGeoInfo(ip: string) {
  if (!lookupCity || !lookupASN) {
    throw new Error('maxmind: db not ready');
  }
  let geoStr = geoInfoCache.get(ip);
  if (!geoStr) {
    geoStr = genGeoStr(ip);
    geoInfoCache.set(ip, geoStr);
  }
  return geoStr;
}

const geoRegx = /GeoIP_Source=([\w:.]+)/;

const entry:ModuleImp = function handler(data) {
  data.streams && data.streams.forEach(function(stream) {
    stream.entries && stream.entries.forEach(function(entry) {
      const res = entry.line && entry.line.match(geoRegx);
      if (res && entry.line) {
        const geoInfo = getGeoInfo(res[1].toLowerCase());
        entry.line = entry.line.replace(geoRegx, geoInfo);
      }
    });
  });
}

export default {
  init,
  entry,
  getGeoInfo
};