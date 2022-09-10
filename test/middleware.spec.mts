import * as snappy from 'snappy';
import { strictEqual, throws, rejects } from 'node:assert';
import { message, request } from '../src/misc/index.mjs';
import { shutdown } from '../src/index.mjs'

describe('server test suite', function () {
  it('should server start', async function() {
    await request('http://localhost:3100/ready', {
      method: 'GET'
    });
  });

  it('should server rejects unknown requests', async function() {
    await rejects(
      request('http://localhost:3100/foo', {
        method: 'POST'
      }),
      (e:Error) => e.message.includes('status 404')
    );
  });

});


describe('message test suite', function () {
  it('should reject invalid input', async function() {

    throws(() => {
      message.unpack(Buffer.from('Foo'));
    }, (e:Error) => e.message.includes('snappy: corrupt input'))

    throws(() => {
      message.unpack(snappy.compressSync(Buffer.from('lazydog')));
    });

    throws(() => {
      message.unpack(snappy.compressSync(Buffer.from(new Uint8Array([256]))));
    });

    throws(
      () => {
        message.pack({ streams: 1 } as any);
      },
      (e:Error) => e.message.includes('streams:')
    );

    throws(
      () => {
        message.pack({
          streams: [{
            labels: -1
          }]
        } as any);
      },
      (e:Error) => e.message.includes('streams.labels:')
    );

    throws(
      () => {
        const payload = {
          streams: [{
            entries: [{
              line: []
            }]
          }]
        } as any;
        message.pack(payload);
      },
      (e:Error) => e.message.includes('streams.entries.line:')
    );

  });

  it('should encode and decode', async function() {
    const payload: message.IPushRequest = {
      streams: [{
        hash: 0,
        labels: 'bar',
        entries: [{
          line: 'foo'
        }]
      }]
    };
    const ret = message.unpack(message.pack(payload));
    strictEqual(ret.streams?.length, 1);
    strictEqual(ret.streams?.[0].hash, 0);
    strictEqual(ret.streams?.[0].entries?.[0].line, 'foo');
  });
});

describe('module unit test', async function() {
  it('should get geo info', async function() {
    const resp = await request('http://localhost:3100/x/unit-test?name=geo-ip&input=114.92.1.1', {
      method: 'GET'
    });
    const info = resp.data.value;
    strictEqual([
      'geo_ip_asn=',
      'geo_ip_city_geoname_id=',
      'geo_ip_country_iso_code=',
      'geo_ip_longitude=',
      'geo_ip_city='
    ].every(s => info.includes), true);
  });

  it('should get ua info', async function() {
    const ua = 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
    const resp = await request(`http://localhost:3100/x/unit-test?name=ua-detect&input=${encodeURIComponent(ua)}`, {
      method: 'GET'
    });
    const info = resp.data.value;
    strictEqual([
      'ua_client==',
      'ua_device=',
      'ua_os='
    ].every(s => info.includes), true);
  });

});

describe('e2e test suite', function () {
  const payload = {
    streams: [{
      hash: 0,
      labels: 'foo',
      entries: [{
        line: 'foo'
      }]
    }, {
      hash: 1,
      labels: 'bar',
      entries: [{
        line: 'bar'
      }, {
        line: 'bar2'
      }]
    }]
  };

  it('should proxy request', async function() {
    const resp = await request('http://localhost:3100/loki/api/v1/push', {
      method: 'POST',
      body: message.pack(payload),
      headers: {
        'user-agent': 'my-test-agent',
        'content-type': 'application/x-protobuf'
      }
    });
    const { rawInHex, headers } = resp.data.$echo;

    strictEqual(resp.status, 200);
    strictEqual(headers['content-type'], 'application/x-protobuf');
    strictEqual(headers['user-agent'], 'my-test-agent');

    const ret = message.unpack(Buffer.from(rawInHex, 'hex'));

    strictEqual(ret.streams?.[0].hash, 0);
    strictEqual(ret.streams?.[1].entries?.[1].line, 'bar2');
  });

  it('should injects geoIP & UA info', async function() {
    payload.streams[0].entries[0].line = 'foo=bar GeoIP_Source="114.92.1.1" Device_UA_Source="Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36"';
    payload.streams[1].entries[1].line = 'foo=bar GeoIP_Source="52.144.59.143" Device_UA_Source="Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"';

    const resp = await request('http://localhost:3100/loki/api/v1/push', {
      method: 'POST',
      body: message.pack(payload),
      headers: {
        'content-type': 'application/x-protobuf'
      }
    });
    const { rawInHex } = resp.data.$echo;
    const ret = message.unpack(Buffer.from(rawInHex, 'hex')) as (typeof payload);
    strictEqual(ret.streams[0].entries[0].line.includes('geo_ip_longitude='), true);
    strictEqual(ret.streams[0].entries[0].line.includes('ua_client='), true);

    strictEqual(ret.streams[1].entries[1].line.includes('geo_ip_country='), true);
    strictEqual(ret.streams[1].entries[1].line.includes('ua_client='), true);

  });
});

describe('clean up', function() {
  it('should exit', async function() {
    shutdown();
  });
})