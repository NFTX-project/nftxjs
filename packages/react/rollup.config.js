import config from '../../rollup.base';

export default {
  ...config,
  external: [...config.external, 'viem/chains'],
};
