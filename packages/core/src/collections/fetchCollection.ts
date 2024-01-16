import type { Address, Collection } from '@nftx/types';
import { addressEqual, queryReservoir } from '@nftx/utils';
import config from '@nftx/config';
import { ARTBLOCK_COLLECTIONS } from '@nftx/constants';

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

const artblockCollection: Collection = {
  address: '0x',
  name: 'Art Blocks',
  slug: 'art-blocks',
  image:
    'https://img.reservoir.tools/images/v2/mainnet/7%2FrdF%2Fe%2F0iXY8HduhRCoIehkmFeXPeOQQFbbmIPfjCZplRJ0oE1Aa4uukcOlWsKqhPNsGrnvIbA60TipHbXT%2BKqIHAoQ8%2BHjrUf19dKwJexYK8TCV4CbOzH4Qr7uEPBCVOOQcDngY5EyB66zCUVe%2BE6euqqxYCzSAedOBKkQ0Ww%3D.png?width=512',
  banner: '',
  symbol: 'ARTBLOCKS',
  discordUrl: 'https://discord.com/invite/artblocks',
  externalUrl: 'https://artblocks.io/',
  twitterUsername: 'artblocks_io',
  standard: 'ERC721',
  floorPrice: undefined as any,
  tokenCount: 0,
};

const fetchCollection = async ({
  assetAddress,
  network = config.network,
}: {
  network?: number;
  assetAddress: Address;
}): Promise<Collection> => {
  if (ARTBLOCK_COLLECTIONS.some((x) => addressEqual(x, assetAddress))) {
    // Reservoir can't fetch the entire artblocks collection,
    // you must pass a predefined token range which we don't have upfront,
    // so we'll return a hardcoded collection object instead.
    return {
      ...artblockCollection,
      address: assetAddress,
    };
  }

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
      tokenCount: Number(x.tokenCount),
    };
  })[0];

  return collection;
};

export default fetchCollection;
