require('isomorphic-fetch');
const { TextEncoder } = require('util');

global.TextEncoder = TextEncoder;
