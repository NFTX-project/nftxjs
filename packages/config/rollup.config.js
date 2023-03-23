import base from '../../rollup.base';

const config = {
  ...base,
  output: base.output.map((o) => ({
    ...o,
    exports: 'default',
  })),
};

export default config;
