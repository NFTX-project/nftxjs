import config from '@nftx/config';
import { buildWhere, gql, type querySubgraph } from '@nftx/subgraph';
import type { Address, TokenId, VaultActivity } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { transformFeeReceipt } from './common';

type QuerySubgraph = typeof querySubgraph;

export type Swap = {
  id: Address;
  zapAction: {
    ethAmount: string;
    id: string;
  };
  vault: {
    id: Address;
    vaultId: string;
    token: { symbol: string };
    asset: { id: Address };
    inventoryStakingPool: { id: Address };
  };
  date: `${number}`;
  source: string;
  mintedIds: TokenId[];
  redeemedIds: TokenId[];
  specificIds: TokenId[];
  randomCount: `${number}`;
  targetCount: `${number}`;
  feeReceipt: {
    transfers: Array<{ amount: `${number}`; to: Address }>;
    date: `${number}`;
  };
};

export const createSwapsQuery = (where: string) => {
  return `swaps(
    first: 1000,
    where: ${where},
    orderBy: date,
    orderDirection: asc
  ) {
    id
    zapAction {
      ethAmount
      id
    }
    source
    vault {
      id
      vaultId
      token {
        symbol
      }
      asset {
        id
      }
      inventoryStakingPool {
        id
      }
    }
    date
    mintedIds
    redeemedIds
    specificIds
    randomCount
    targetCount
    feeReceipt {
      transfers {
        amount
        to
      }
      date
    }
  }`;
};

export const makeProcessSwaps = ({ fetchSwaps }: { fetchSwaps: FetchSwaps }) =>
  async function processSwaps({
    network,
    response,
    toTimestamp,
    vaultAddresses,
  }: {
    response: { swaps: Swap[] };
    network: number;
    toTimestamp?: number;
    vaultAddresses?: Address[];
  }) {
    let swaps = response.swaps.flatMap((swap): VaultActivity[] => {
      const receipt = transformFeeReceipt(
        swap.feeReceipt,
        swap.vault.id,
        swap.vault.vaultId
      );

      return swap.redeemedIds.map((nftId, i): VaultActivity => {
        return {
          vaultId: swap.vault.vaultId,
          vaultAddress: swap.vault.id,
          date: Number(swap.date),
          tokenId: nftId,
          source: swap.source,
          swapTokenId: swap.mintedIds[i],
          txId: (swap.id.split('-')[1] ?? swap.id) as Address,
          amount: 1,
          ethAmount: BigInt(swap?.zapAction?.ethAmount ?? '0'),
          feeAmount: receipt.amount / BigInt(swap.redeemedIds.length),
          type: 'swap',
        };
      });
    });

    if (response.swaps.length === 1000) {
      const lastSwap = swaps[swaps.length - 1];
      const nextTimestamp = lastSwap.date;
      const response = await fetchSwaps({
        fromTimestamp: Number(nextTimestamp),
        network,
        toTimestamp,
        vaultAddresses,
      });
      const moreSwaps = await processSwaps({
        response,
        network,
        toTimestamp,
        vaultAddresses,
      });

      swaps = [...swaps, ...moreSwaps];
    }

    return swaps;
  };

export type ProcessSwaps = ReturnType<typeof makeProcessSwaps>;

export const makeFetchSwaps =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    network,
    fromTimestamp,
    toTimestamp,
    vaultAddresses,
  }: {
    network: number;
    fromTimestamp: number;
    toTimestamp?: number;
    vaultAddresses?: Address[];
  }) => {
    const where = buildWhere({
      date_gt: fromTimestamp,
      date_lte: toTimestamp,
      vault: vaultAddresses?.length === 1 ? vaultAddresses[0] : null,
      vault_in: vaultAddresses?.length === 1 ? null : vaultAddresses,
    });
    const query = gql<{ swaps: Swap[] }>`{ ${createSwapsQuery(where)} }`;

    return querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      query,
    });
  };

export type FetchSwaps = ReturnType<typeof makeFetchSwaps>;
