import fetch from 'node-fetch';
import { RequestInit } from 'node-fetch';
import { LokiSender } from './protocol.js';

export default async function request(url: string, opts: RequestInit) {
  const resp = await fetch(url, opts);

  if (!resp.ok) {
    throw new Error(`request failed with status ${resp.status}`);
  }

  const contentType = resp.headers.get('content-type') || '';
  let data: Object | string | any;

  if (contentType.includes('json')) {
    data = (await resp.json()) as any;
  } else if (contentType.includes('text')) {
    data = await resp.text();
  } else {
    data = Buffer.from(await resp.arrayBuffer());
  }

  return {
    contentType,
    data,
    status: resp.status
  };
}

export function getLokiSender(loki_host: string, logger:any): LokiSender {
  if (process.env.NODE_ENV === 'test') {
    logger.warn('test env, using echo sender');
    return function echoSender(raw, headers) {
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          data: JSON.stringify({
            $echo: {
              rawInHex: raw.toString('hex'),
              headers
            }
          }),
          contentType: 'application/json'
        });
      })
    }
  }

  return function proxySender(raw, headers) {
    return request(`${loki_host}/loki/api/v1/push`, {
     body: raw,
     method: 'POST',
     headers: headers || {}
   });
  }
}

