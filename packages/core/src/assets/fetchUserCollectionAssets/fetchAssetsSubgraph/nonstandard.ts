import { BigNumber } from '@ethersproject/bignumber';
import { gql, querySubgraph } from '@nftx/subgraph';
import config from '@nftx/config';
import { addressEqual, getChainConstant } from '@nftx/utils';
import type { Asset } from '@nftx/types';
import { processAssetItems } from '../utils';

const LIMIT = 1000;

type Response = {
  account: {
    tokens: Array<{
      id: string;
      identifier: string;
    }>;
  };
};

const nonstandard = async ({
  network,
  userAddress,
  assetAddresses,
  lastId = -1,
  retryCount = 0,
}: {
  network: number;
  userAddress: string;
  assetAddresses: string[];
  lastId?: number;
  retryCount?: number;
}): Promise<{ assets: Asset[]; nextId: number }> => {
  let nextId: number;

  if (!assetAddresses.length) {
    return { assets: [], nextId };
  }

  const query = gql<Response>`{
    account(id: $userAddress) {
      id
      tokens(
        first: ${LIMIT},
        where: {
          identifier_gt: $lastId,
        },
        orderBy: identifier,
        orderDirection: asc
      ) {
        id
        identifier
      }
    }
  }`;

  const url = getChainConstant(config.subgraph.NON_STANDARD_SUBGRAPH, network);
  let data: Response;

  try {
    data = await querySubgraph({
      url,
      query,
      variables: {
        userAddress,
        lastId,
      },
    });
  } catch (e) {
    if (retryCount < 3) {
      return nonstandard({
        network,
        assetAddresses,
        userAddress,
        lastId,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }

  const assets = await processAssetItems({
    network,
    items:
      data?.account?.tokens
        ?.map((x) => {
          const [assetAddress] = x.id.split('-');
          const tokenId = BigNumber.from(x.identifier).toString();
          return { assetAddress, tokenId };
        })
        .filter((x) =>
          assetAddresses.some((y) => addressEqual(x.assetAddress, y))
        ) ?? [],
  });

  if (assets?.length === LIMIT) {
    nextId = Number(assets[assets.length - 1].tokenId);
  }

  return { assets, nextId };
};

export default nonstandard;
