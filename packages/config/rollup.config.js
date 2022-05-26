import { readdirSync } from 'fs';
import base from '../../rollup.base';

const abis = readdirSync('../constants/abis')
  .filter((filename) => filename.endsWith('.json'))
  .map((filename) => `@nftx/constants/abis/${filename}`);

const config = {
  ...base,
  external: [...base.external, ...abis],
  output: base.output.map((o) => ({
    ...o,
    exports: 'default',
  })),
};

export default config;
