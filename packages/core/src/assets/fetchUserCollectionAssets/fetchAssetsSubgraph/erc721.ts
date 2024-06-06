import { gql, querySubgraph } from '@nftx/subgraph';
import config from '@nftx/config';
import { addressEqual, getChainConstant } from '@nftx/utils';
import type { Asset } from '@nftx/types';
import { processAssetItems } from '../utils';

const LIMIT = 1000;

const erc721 = async ({
  network,
  userAddress,
  assetAddresses,
  lastId = '-1',
  retryCount = 0,
}: {
  network: number;
  userAddress: string;
  assetAddresses: string[];
  lastId?: string;
  retryCount?: number;
}): Promise<{ assets: Asset[]; nextId: string }> => {
  let assets: Asset[] = [];
  let nextId: string;

  if (!assetAddresses.length) {
    return { assets, nextId };
  }

  try {
    type Response = {
      tokens: {
        id: string;
        identifier: string;
        collection: { id: string };
      }[];
    };

    const query = gql<Response>`{
  tokens(
    first: ${LIMIT}
    orderBy: id
    orderDirection: asc
    where: {
      owner: $userAddress,
      id_gt: $lastId,
    }
  ) {
    id
    identifier
    collection {
      id
    }
  }
}`;

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
      query,
      variables: {
        userAddress,
        lastId,
      },
    });
    if (data?.tokens?.length) {
      nextId = data.tokens[data.tokens.length - 1].id;
      assets = await processAssetItems({
        network,
        items: data.tokens
          .filter((x) =>
            assetAddresses.some((y) => addressEqual(x.collection.id, y))
          )
          .map((x) => ({
            assetAddress: x.collection.id,
            tokenId: x.identifier,
          })),
      });
    }
  } catch (e) {
    if (retryCount < 3) {
      return erc721({
        assetAddresses,
        network,
        userAddress,
        lastId,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }

  return { assets, nextId };
};

export default erc721;
