const path = require('path');

const cwd = __dirname;

module.exports = {
  opts: {
    template: `${cwd}/node_modules/better-docs`,
  },
  tags: {
    allowUnknownTags: ['optional'],
  },
  plugins: [`${cwd}/node_modules/better-docs/typescript`],
  source: {
    includePattern: '\\.(jsx|js|ts|tsx)$',
  },
};
