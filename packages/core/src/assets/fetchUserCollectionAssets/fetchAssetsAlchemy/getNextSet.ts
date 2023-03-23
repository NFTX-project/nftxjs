import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';
import { parseCursor } from './cursor';
import type { Response } from './types';

type Fetch = typeof fetch;

const getNextSet = async ({
  assetAddresses,
  cursor,
  network,
  userAddress,
  fetch,
}: {
  network: number;
  userAddress: string;
  assetAddresses: string[];
  cursor?: string;
  fetch: Fetch;
}) => {
  let url = [
    getChainConstant(config.urls.ALCHEMY_URL, network),
    'nftx/v2',
    getChainConstant(config.keys.ALCHEMY, network),
    'getNFTs',
  ].join('/');

  const query: [string, string][] = [];

  query.push(['owner', userAddress]);

  const { endIndex, pageKey, startIndex } = parseCursor(cursor, assetAddresses);
  if (pageKey) {
    query.push(['pageKey', pageKey]);
  }
  assetAddresses.slice(startIndex, endIndex).forEach((id) => {
    query.push(['contractAddresses[]', id]);
  });
  query.push(['withMetadata', 'false']);

  url = `${url}?${query
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')}`;

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data: Response = await response.json();

  return data;
};

export default getNextSet;
