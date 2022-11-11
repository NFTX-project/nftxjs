import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';
import type { Collection } from '../types';

type Response = {
  totalCount: number;
  pageKey: string;
  contracts: Array<{
    address: string;
    totalBalance: number;
    numDistinctTokensOwned: number;
    isSpam: boolean;
    tokenId: string;
    name: string;
    symbol: string;
    tokenType: 'ERC721' | 'ERC1155';
  }>;
};

const fetchUserCollectionsAlchemy = async ({
  network,
  userAddress,
}: {
  network: number;
  userAddress: string;
}) => {
  const baseUrl = getChainConstant(config.urls.ALCHEMY_URL, network);
  const apiKey = config.keys.ALCHEMY;

  const ownedCollections: Collection[] = [];

  let cursor: string = null;

  do {
    const uri = new URL(`/nft/v2/${apiKey}/getContractsForOwner`, baseUrl);
    uri.searchParams.set('owner', userAddress);
    if (cursor) {
      uri.searchParams.set('pageKey', cursor);
    }
    const url = uri.toString();

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data: Response = await response.json();

    const collections = data?.contracts || [];

    ownedCollections.push(...collections);
    cursor = data?.pageKey;
  } while (cursor != null);

  return ownedCollections;
};

export default fetchUserCollectionsAlchemy;
