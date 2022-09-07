import * as snappy from 'snappy';

import { strictEqual, throws, rejects } from 'node:assert';
import { encode, decode, IPushRequest } from '../src/misc/message.js';
import request from '../src/misc/request.js';

process.env.NODE_ENV = 'test';

let appModule:any;

describe('server test suite', function () {
  it('should server start', async function() {
    appModule = await import('../src/index.js');
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
      decode(Buffer.from('Foo'));
    }, (e:Error) => e.message.includes('snappy: corrupt input'))

    throws(() => {
      decode(snappy.compressSync(Buffer.from('lazydog')));
    });

    throws(() => {
      decode(snappy.compressSync(Buffer.from(new Uint8Array([256]))));
    });

    throws(
      () => {
        encode({ streams: 1 } as any);
      },
      (e:Error) => e.message.includes('streams:')
    );

    throws(
      () => {
        encode({
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
        encode(payload);
      },
      (e:Error) => e.message.includes('streams.entries.line:')
    );

  });

  it('should encode and decode', async function() {
    const payload:IPushRequest = {
      streams: [{
        hash: 0,
        labels: 'bar',
        entries: [{
          line: 'foo'
        }]
      }]
    };
    const ret = decode(encode(payload));
    strictEqual(ret.streams?.length, 1);
    strictEqual(ret.streams?.[0].hash, 0);
    strictEqual(ret.streams?.[0].entries?.[0].line, 'foo');
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
      body: encode(payload),
      headers: {
        'user-agent': 'my-test-agent',
        'content-type': 'application/x-protobuf'
      }
    });
    const { rawInHex, headers } = resp.data.$echo;

    strictEqual(resp.status, 200);
    strictEqual(headers['content-type'], 'application/x-protobuf');
    strictEqual(headers['user-agent'], 'my-test-agent');

    const ret = decode(Buffer.from(rawInHex, 'hex'));

    strictEqual(ret.streams?.[0].hash, 0);
    strictEqual(ret.streams?.[1].entries?.[1].line, 'bar2');
  });

  it('should injects geoIP info', async function() {
    payload.streams[0].entries[0].line = 'foo=bar GeoIP_Source=114.92.1.1';
    payload.streams[1].entries[1].line = 'foo=bar GeoIP_Source=52.144.59.143';

    const resp = await request('http://localhost:3100/loki/api/v1/push', {
      method: 'POST',
      body: encode(payload),
      headers: {
        'content-type': 'application/x-protobuf'
      }
    });
    const { rawInHex } = resp.data.$echo;
    const ret = decode(Buffer.from(rawInHex, 'hex')) as (typeof payload);
    strictEqual(ret.streams[0].entries[0].line.includes('geo_ip_longitude='), true);
    strictEqual(ret.streams[1].entries[1].line.includes('geo_ip_country='), true);
  });
});

describe('clean up', function() {
  it('should exit', async function() {
    appModule.shutdown();
  });
})