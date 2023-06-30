import config from '@nftx/config';

import queryApiBase from './queryApi';
import nsync from './nsync';

export const bustCache = () => {
  config.internal.cacheKey = Math.floor(Math.random() * 100000).toString(16);
};

export const queryApi = nsync(queryApiBase);
