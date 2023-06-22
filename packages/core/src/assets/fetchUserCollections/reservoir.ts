import { RESERVOIR_URL } from '@nftx/constants';
import type { Address, Collection } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { query as sendQuery } from '@nftx/subgraph';
import config from '@nftx/config';

type Response = {
  collections: {
    collection: {
      id: Address;
      slug: string;
      name: string;
      image: string;
      banner: string;
      tokenCount: string;
      description: string;
      primaryContract: Address;
      sampleImages: string[];
    };
    ownership: {
      tokenCount: string;
      onSaleCount: string;
      liquidCount: string;
    };
  }[];
};

const fetchUserCollectionsReservoir = async ({
  network,
  userAddress,
  offset,
}: {
  userAddress: Address;
  network: number;
  offset: number;
}): Promise<Collection[]> => {
  const baseUrl = getChainConstant(RESERVOIR_URL, network);
  const path = `/users/${userAddress}/collections/v3`;
  const query = {
    limit: 100,
    offset,
  };
  const headers = {
    'x-api-key': getChainConstant(config.keys.RESERVOIR, network),
  };
  const uri = new URL(path, baseUrl);
  const data = await sendQuery<Response>({
    url: uri.toString(),
    query,
    headers,
  });
  const collections: Collection[] = data.collections.map((x) => {
    return {
      address: x.collection.id,
      image: x.collection.image,
      name: x.collection.name,
      symbol: x.collection.slug,
      numDistinctTokensOwned: Number(x.ownership.tokenCount),
    };
  });

  if (collections.length === 100) {
    const moreCollections = await fetchUserCollectionsReservoir({
      network,
      offset: offset + 100,
      userAddress,
    });
    collections.push(...moreCollections);
  }

  return collections;
};

export default fetchUserCollectionsReservoir;
