import axios from 'axios';
import { equal, strictEqual, throws, notStrictEqual, rejects } from 'node:assert';
import { encode, decode } from '../src/misc/message.js';

process.env.NODE_ENV = 'test';

let appModule:any;

describe('server test suite', function () {
  it('should server start', async function() {
    appModule = await import('../src/index.js');
    await axios.default.get('http://localhost:3100/ready');
  });

  it('should server rejects unknown requests', async function() {
    await rejects(
      axios.default.post('http://localhost:3100/foo'),
      (e:Error) => e.message.includes('status code 404')
    );
  });

});


describe('message test suite', function () {

});

describe('geo-ip test suite', function () {

});

describe('clean up', function() {
  it('should exit', async function() {
    appModule.shutdown();
  });
})