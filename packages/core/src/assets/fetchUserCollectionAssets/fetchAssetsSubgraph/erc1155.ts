import { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Asset } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { processAssetItems } from '../utils';

const LIMIT = 1000;

type Response = {
  account: {
    holdings: {
      id: string;
      balance: string;
      token: { identifier: string; collection: { id: string } };
    }[];
  };
};

const erc1155 = async ({
  network,
  userAddress,
  assetAddresses,
  lastId = '0',
  retryCount = 0,
}: {
  network: number;
  userAddress: string;
  assetAddresses: string[];
  lastId?: string;
  retryCount?: number;
}): Promise<{ assets: Asset[]; nextId: string }> => {
  let nextId: string;

  if (!assetAddresses.length) {
    return { assets: [], nextId };
  }

  const query = gql<Response>`{
    account(id: $userAddress) {
      holdings(
        first: ${LIMIT},
        orderBy: id,
        orderDirection: asc,
        where: {
          id_gt: $lastId,
          balance_gt: 0
        }
      ) {
        id
        balance
        token {
          identifier
          collection {
            id
          }
        }
      }
    }
  }`;

  let data: Response;

  try {
    data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC1155_SUBGRAPH, network),
      query,
      variables: { userAddress, lastId },
    });
  } catch (e) {
    if (retryCount < 3) {
      return erc1155({
        assetAddresses,
        network,
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
      data?.account?.holdings?.map((x) => {
        const assetAddress = x.token.collection.id;
        const tokenId = BigNumber.from(x.token.identifier).toString();
        const quantity = BigNumber.from(x.balance);

        return { assetAddress, tokenId, quantity };
      }) ?? [],
  });

  if (data?.account?.holdings?.length === LIMIT) {
    const lastId = data.account.holdings[data.account.holdings.length - 1].id;
    nextId = lastId;
  }

  return { assets, nextId };
};

export default erc1155;
