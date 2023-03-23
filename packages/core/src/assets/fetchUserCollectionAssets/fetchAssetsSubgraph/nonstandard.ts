import { gql, querySubgraph } from '@nftx/subgraph';
import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';
import type { Address, Asset } from '@nftx/types';
import { processAssetItems } from '../utils';

const LIMIT = 1000;

type Response = {
  account: {
    tokens: Array<{
      id: Address;
      identifier: `${number}`;
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
  userAddress: Address;
  assetAddresses: Address[];
  lastId?: number;
  retryCount?: number;
}): Promise<{ assets: Asset[]; nextId?: number }> => {
  let nextId: number | undefined;

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
      data?.account?.tokens?.map((x) => {
        const [assetAddress] = x.id.split('-') as [`${Address}`];
        const tokenId = BigInt(x.identifier).toString() as `${number}`;
        return { assetAddress, tokenId };
      }) ?? [],
  });

  if (assets?.length === LIMIT) {
    nextId = Number(assets[assets.length - 1].tokenId);
  }

  return { assets, nextId };
};

export default nonstandard;
