import type { Address, Collection } from '@nftx/types';
import { queryReservoir } from '@nftx/utils';

type QueryReservoir = typeof queryReservoir;

export type Response = {
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
      discordUrl: string;
      externalUrl: string;
      twitterUsername: string;
      openseaVerificationStatus: string;
      onSaleCount: string;
      creator: string;
      royalties: unknown;
      topBid: unknown;
      rank: unknown;
      volume: unknown;
      volumeChange: unknown;
      floorSale: unknown;
      floorSaleChange: unknown;
      ownerCount: string;
      floorAsk: { price: { amount: { raw: string } } };
      contractKind: string;
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
        name: x.collection.name,
        slug: x.collection.slug,
        image: x.collection.image,
        banner: x.collection.banner,
        symbol: x.collection.slug,
        discordUrl: x.collection.discordUrl,
        externalUrl: x.collection.externalUrl,
        twitterUsername: x.collection.twitterUsername,
        standard: x.collection.contractKind.toUpperCase() as 'ERC721',
        floorPrice: BigInt(x.collection.floorAsk?.price?.amount?.raw ?? '0'),
        tokenCount: Number(x.collection.tokenCount),
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
