import test from 'ava';
import 'babel-core/register';

import curlToNode from '../src/index';
import got from 'got';

test('get with headers', async t => {
  const str = `curl https://api.github.com/users/ewnd9 \
    -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:44.0) Gecko/20100101 Firefox/44.0' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01'`;

  const args = curlToNode('got', str);

  const [url, options] = args;
  t.ok(url === 'https://api.github.com/users/ewnd9');

  const headersKeys = Object.keys(options.headers);
  t.ok(headersKeys.length === 2);

  t.ok(headersKeys[0] === 'User-Agent');
  t.ok(headersKeys[1] === 'Accept');

  if (!process.env.TRAVIS) { // blocked on github
    const response = await got.apply(got, args);
    const body = JSON.parse(response.body);

    t.ok(body.login === 'ewnd9');
  }
});

test('post', async t => {
  const str = `curl -X POST https://example.com/resource.cgi`;

  const args = curlToNode('got', str);

  const [url, options] = args;

  t.ok(url === 'https://example.com/resource.cgi');
  t.ok(options.method === 'POST');
  t.notOk(options.headers);
});
