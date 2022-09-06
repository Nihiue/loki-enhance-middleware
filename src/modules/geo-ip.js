const maxmind = require('maxmind');
const path = require('path');
const lru = require('tiny-lru');

let lookupCity, lookupASN;

async function prepareDB(log) {
  if (lookupCity) {
    return;
  }

  const cityFile = path.join(__dirname, '../../mmdb', 'GeoLite2-City.mmdb');
  const asnFile = path.join(__dirname, '../../mmdb', 'GeoLite2-ASN.mmdb');

  const option = {
    cache: {
      max: 1000
    }
  };

  try {
    lookupCity = await maxmind.open(cityFile, option);
    lookupASN = await maxmind.open(asnFile, option);
  } catch (e) {
    log('fatal', {
      cityFile,
      asnFile,
      downloadFrom: 'https://www.maxmind.com/en/geolite2/signup'
    }, 'Missing maxmind DB files');

    throw new Error('Maxmind DB not ready');

  }
}

const geoInfoCache = lru(1000, ttl = 0);

function getGeoInfo(ip) {
  if (!lookupCity || !lookupASN) {
    throw new Error('maxmind: db not ready');
  }

  if (!ip) {
    return '';
  }

  let geoStr = geoInfoCache.get(ip);
  if (geoStr) {
    return geoStr;
  }

  const asn = lookupASN.get(ip);
  const main = lookupCity.get(ip);

  const ret = {};
  if (asn) {
    ret.asn = asn.autonomous_system_organization;
  }
  if (main) {
    ret.continent = main.continent && main.continent.names['en'];

    ret.city = main.city && main.city.names['en'];
    ret.city_geoname_id = main.city && main.city.geoname_id;

    ret.country = main.country && main.country.names['en'];
    ret.country_geoname_id = main.country && main.country.geoname_id;
    ret.country_iso_code = main.country && main.country.iso_code;

    ret.latitude = main.location && main.location.latitude;
    ret.longitude = main.location && main.location.longitude;
  }

  geoStr = Object.keys(ret).map(function(k) {
    if (ret[k]) {
      return `geo_ip_${k}="${ret[k]}"`
    }
  }).filter(l => l).join(' ');


  geoInfoCache.set(ip, geoStr);
  return geoStr;
}

const geoRegx = /GeoIP_Source=([\w:.]+)/;

async function handler(data, log) {
  await prepareDB(log);
  data.streams.forEach(function(stream) {
    stream.entries.forEach(function(entry) {
      const res = entry.line && entry.line.match(geoRegx);
      if (res) {
        const geoInfo = getGeoInfo(res[1].toLowerCase());
        entry.line = entry.line.replace(geoRegx, geoInfo);
      }
    });
  });
}

module.exports = {
  handler
};
