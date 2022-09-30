import { BigNumber } from '@ethersproject/bignumber';
import type { Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import config from '@nftx/config';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Asset, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { processAssetItems } from '../utils';

const LIMIT = 1000;

type Response = {
  account: {
    id: string;
    balances: Array<{
      id: string;
      contract: { id: string };
      token: {
        identifier: string;
      };
      value: string;
    }>;
  };
};

const erc1155 = async ({
  network,
  userAddress,
  assetAddresses,
  vaults,
  provider,
  lastId = '0',
  retryCount = 0,
}: {
  network: number;
  userAddress: string;
  assetAddresses: string[];
  vaults: Pick<Vault, 'vaultId' | 'asset' | 'features' | 'eligibilityModule'>[];
  provider: Provider;
  lastId?: string;
  retryCount?: number;
}): Promise<{ assets: Asset[]; nextId: string }> => {
  let nextId: string;

  if (!assetAddresses.length) {
    return { assets: [], nextId };
  }

  const query = gql<Response>`{
    account(id: $userAddress) {
      id
      balances: ERC1155balances(
        first: ${LIMIT},
        where: {
          value_gt: $lastId,
        },
        orderBy: value,
        orderDirection: asc
      ) {
        id
        contract {
          id
        }
        token {
          identifier
        }
        value
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
        vaults,
        provider,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }

  const assets = await processAssetItems({
    network,
    provider,
    vaults,
    items:
      data?.account?.balances?.map((x) => {
        const assetAddress = x.contract.id;
        const tokenId = BigNumber.from(x.token.identifier).toString();
        const quantity =
          Number(x.value) < 1 ? parseEther(x.value) : BigNumber.from(x.value);

        return { assetAddress, tokenId, quantity };
      }) ?? [],
  });

  if (data?.account?.balances?.length === LIMIT) {
    const lastValue =
      data.account.balances[data.account.balances.length - 1].value;
    nextId = lastValue;
  }

  return { assets, nextId };
};

export default erc1155;
