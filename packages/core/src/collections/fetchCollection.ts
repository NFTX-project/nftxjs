import type { Address, Collection } from '@nftx/types';
import { queryReservoir } from '@nftx/utils';
import config from '@nftx/config';

export type Response = {
  collections: {
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
    floorAsk: { price: { amount: { raw: string } } };
    topBid: unknown;
    rank: unknown;
    volume: unknown;
    volumeChange: unknown;
    floorSale: unknown;
    floorSaleChange: unknown;
    ownerCount: string;
    contractKind: string;
  }[];
};

const fetchCollection = async ({
  assetAddress,
  network = config.network,
}: {
  network?: number;
  assetAddress: Address;
}) => {
  const path = '/collections/v7';
  const query = { id: assetAddress };

  const data = await queryReservoir<Response>({
    network,
    path,
    query,
  });

  const collection = data.collections.map((x): Collection => {
    return {
      address: x.id,
      name: x.name,
      slug: x.slug,
      image: x.image || x.sampleImages?.[0],
      banner: x.banner,
      symbol: x.slug,
      discordUrl: x.discordUrl,
      externalUrl: x.externalUrl,
      twitterUsername: x.twitterUsername,
      standard: x.contractKind.toUpperCase() as 'ERC721',
      floorPrice: BigInt(x.floorAsk?.price?.amount?.raw ?? '0'),
    };
  })[0];

  return collection;
};

export default fetchCollection;
