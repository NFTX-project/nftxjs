import config from '@nftx/config';

export { default as queryApi } from './queryApi';

export const bustCache = () => {
  config.internal.cacheKey = Math.floor(Math.random() * 100000).toString(16);
};
