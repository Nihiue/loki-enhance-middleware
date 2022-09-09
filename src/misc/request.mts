import fetch from 'node-fetch';
import { RequestInit } from 'node-fetch';

export default async function request(url: string, opts: RequestInit) {
  const resp = await fetch(url, opts);

  const contentType = resp.headers.get('content-type') || '';
  let data: Object | string | any;

  if (contentType.includes('json')) {
    data = (await resp.json()) as any;
  } else if (contentType.includes('text')) {
    data = await resp.text();
  } else {
    data = Buffer.from(await resp.arrayBuffer());
  }

  const response = {
    contentType,
    data,
    status: resp.status
  };

  if (!resp.ok) {
    const error:any = new Error(`request failed with status ${resp.status}`);
    error.response = response;
    throw error;
  }

  return response;
}
