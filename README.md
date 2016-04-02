# curl-to-node

[![Build Status](https://travis-ci.org/ewnd9/curl-to-node.svg?branch=master)](https://travis-ci.org/ewnd9/curl-to-node)

Transform curl CLI commands to js options for http requests libraries.

## Install

```
$ npm install curl-to-node --save
```

## Usage

```js
import curlToNode from 'curl-to-node';
import got from 'got';

const str = `curl https://api.github.com/users/ewnd9 \
  -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:44.0) Gecko/20100101 Firefox/44.0' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01'`;

got.apply(got, curlToNode('got', str))
  .then(response => {
    console.log(response.body);
  })
  .catch(error => {
    console.log(error.response.body);
  });
```

## Roadmap

- [`got`](https://github.com/sindresorhus/got)
  - [x] `-X <method>`
  - [x] `-H <header>`
  - [ ] `--compressed`
- [`superagent`](https://github.com/visionmedia/superagent)
  - nothing has been done yet

## License

MIT © [ewnd9](http://ewnd9.com)
