import { parse as parseShell } from 'shell-quote';
import minimist from 'minimist';

export default function(type, str) {
  if (type === 'got') {
    const xs = parseShell(str);
    const argv = minimist(xs);

    const url = argv._[1];
    const options = {};

    if (argv.H) {
      options.headers = argv.H.reduce((total, str) => {
        const [k, v] = str.split(/\s*:\s*/);
        total[k] = v;
        return total;
      }, {});
    }

    if (argv.X) {
      options.method = argv.X;
    }

    return [url, options];
  } else {
    throw new Error(`"${type}" is not supported`);
  }
};
