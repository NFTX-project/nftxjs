import config from '@nftx/config';
import type { Address, Asset } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { query } from '@nftx/subgraph';
import { RESERVOIR_URL } from '@nftx/constants';

type Response = {
  tokens: Array<{
    token: {
      contract: Address;
      tokenId: `${number}`;
      kind: string;
      name: string;
      image: string;
      imageSmall: string;
      imageLarge: string;
      metadata: unknown;
      supply: number;
      remainingSupply: number;
      rarityScore: number;
      rarityRank: number;
      media: string;
      collection: unknown;
      attributes: Array<{
        key: string;
        kind: string;
        value: string;
        tokenCount: number;
        onSaleCount: number;
        floorAskPrice: number;
        topBidValue: number;
        createdAt: string;
      }>;
    };
    ownership: {
      tokenCount: string;
      onSaleCount: string;
      floorAsk: {
        id: string;
        price: {
          amount: {
            raw: string;
            decimal: number;
            usd: number;
            native: number;
          };
          netAmount: {
            raw: string;
            decimal: number;
            usd: number;
            native: number;
          };
        };
        maker: string;
        kind: string;
        validFrom: number;
        validUntil: number;
        source: unknown;
        rawData: unknown;
        acquiredAt: string;
      };
    };
  }>;
  continuation: string;
};

const pageSize = 1;

const parseCursor = (cursor: string | undefined, assetAddresses: string[]) => {
  let source: string;
  let firstAssetId = assetAddresses[0];
  let pageKey: string | undefined;
  let startIndex = 0;
  let endIndex = Math.min(pageSize, assetAddresses.length);

  if (cursor) {
    [source, firstAssetId, pageKey] = cursor.split('__');
    if (source !== 'r') {
      throw new Error('Not a reservoir cursor');
    }
    startIndex = assetAddresses.indexOf(firstAssetId);
    endIndex = Math.min(startIndex + pageSize, assetAddresses.length);
  }

  return { firstAssetId, pageKey, startIndex, endIndex };
};

const createCursor = (
  cursor: string | undefined,
  assetAddresses: string[],
  pageKey: string
) => {
  const { endIndex, firstAssetId } = parseCursor(cursor, assetAddresses);
  const parts = ['r'];

  if (pageKey == null) {
    const nextAssetId = assetAddresses[endIndex];
    if (nextAssetId) {
      parts[1] = nextAssetId;
    } else {
      return undefined;
    }
  } else {
    parts[1] = firstAssetId;
    parts[2] = pageKey;
  }

  return parts.join('__');
};

const fetchUserCollectionAssets = async ({
  network = config.network,
  assetAddresses,
  userAddress,
  cursor,
}: {
  network?: number;
  userAddress: Address;
  cursor?: string;
  assetAddresses: Address[];
}) => {
  const uri = new URL(
    `/users/${userAddress}/tokens/v7`,
    getChainConstant(RESERVOIR_URL, network)
  );

  const { pageKey, startIndex } = parseCursor(cursor, assetAddresses);

  const data = await query<Response>({
    url: uri.toString(),
    query: {
      collection: assetAddresses[startIndex],
      limit: 200,
      includeAttributes: true,
      sortBy: 'acquiredAt',
      sortDirection: 'asc',
      continuation: pageKey,
    },
    headers: {
      'x-api-key': getChainConstant(config.keys.RESERVOIR, network),
    },
  });

  const assets = data.tokens.map(({ token }): Asset => {
    return {
      assetAddress: token.contract,
      id: `${token.contract}/${token.tokenId}`,
      imagePreviewUrl: token.imageSmall,
      imageUrl: token.image,
      isFlagged: false,
      name: token.name,
      tokenId: token.tokenId,
      traits: (token.attributes ?? []).reduce((acc, { key, value }) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {} as Record<string, string>),
      animationUrl: token.media,
      backgroundColor: undefined,
      quantity: token.supply ? BigInt(token.supply) : undefined,
    };
  });

  const newCursor = createCursor(cursor, assetAddresses, data.continuation);

  return { assets, cursor: newCursor };
};

export default fetchUserCollectionAssets;
