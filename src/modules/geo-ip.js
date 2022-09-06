const maxmind = require('maxmind');
const path = require('path');
const lru = require('tiny-lru');

let lookupCity, lookupASN;

async function prepareDB() {
  if (!lookupCity) {
    const option = {
      cache: {
        max: 1000
      }
    };

    const cityFile = path.join(__dirname, '../../mmdb', 'GeoLite2-City.mmdb', option);
    const asnFile = path.join(__dirname, '../../mmdb', 'GeoLite2-ASN.mmdb', option);

    try {
      lookupCity = await maxmind.open(cityFile);
      lookupASN = await maxmind.open(asnFile);
    } catch (e) {
      console.log([
        '*** Cannot load maxmind db files: cityFile, asnFile. ',
        cityFile,
        asnFile,
        '*** Download from https://www.maxmind.com/en/geolite2/signup'
      ].join('\n'));
    }
  }
}

const geoInfoCache = lru(1000, ttl = 0);

function getGeoInfo(ip) {
  if (!lookupCity || !lookupASN) {
    throw new Error('db_not_init');
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
    ret.country = main.country && main.country.names['en'];
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

async function handler(data) {
  await prepareDB();
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
