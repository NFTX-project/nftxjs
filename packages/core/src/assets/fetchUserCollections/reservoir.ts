import type { Address, Collection } from '@nftx/types';
import { queryReservoir } from '@nftx/utils';

type QueryReservoir = typeof queryReservoir;

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

export const makeFetchUserCollectionsReservoir = ({
  queryReservoir: sendQuery,
}: {
  queryReservoir: QueryReservoir;
}) =>
  async function fetchUserCollectionsReservoir({
    network,
    userAddress,
    offset,
  }: {
    userAddress: Address;
    network: number;
    offset: number;
  }): Promise<Collection[]> {
    const path = `/users/${userAddress}/collections/v3`;
    const query = {
      limit: 100,
      offset,
    };
    const data = await sendQuery<Response>({ network, path, query });
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

export default makeFetchUserCollectionsReservoir({ queryReservoir });
