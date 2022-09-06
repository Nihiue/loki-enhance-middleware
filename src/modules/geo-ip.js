const maxmind = require('maxmind');
const path = require('path');

let lookupCity, lookupASN;

async function prepareDB() {
  if (!lookupCity) {
    lookupCity = await maxmind.open(path.join(__dirname, '../../mmdb', 'GeoLite2-City.mmdb'));
    lookupASN = await maxmind.open(path.join(__dirname, '../../mmdb', 'GeoLite2-ASN.mmdb'));
  }
}

function getGeoInfo(ip) {
  if (!lookupCity || !lookupASN) {
    throw new Error('db_not_init');
  }

  if (!ip) {
    return '';
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
  return Object.keys(ret).map(function(k) {
    if (ret[k]) {
      return `geo_ip_${k}="${ret[k]}"`
    }
  }).filter(l => l).join(' ');
}

const geoRegx = /GeoIP_Source=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;

async function handler(data) {
  await prepareDB();
  data.streams.forEach(function(stream) {
    stream.entries.forEach(function(entry) {
      const res = entry.line && entry.line.match(geoRegx);
      if (res) {
        const geoInfo = getGeoInfo(res[1]);
        entry.line = entry.line.replace(geoRegx, geoInfo);
      }
    });
  });
}

module.exports = {
  handler
};
