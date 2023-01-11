import { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { VaultActivity } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { transformFeeReceipt } from './common';

export type Swap = {
  id: string;
  zapAction: {
    ethAmount: string;
    id: string;
  };
  vault: {
    id: string;
    vaultId: string;
    token: { symbol: string };
    asset: { id: string };
    inventoryStakingPool: { id: string };
  };
  date: string;
  mintedIds: string[];
  redeemedIds: string[];
  specificIds: string[];
  randomCount: string;
  targetCount: string;
  feeReceipt: {
    transfers: Array<{ amount: string; to: string }>;
    date: string;
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

export const processSwaps = async (
  response: { swaps: Swap[] },
  network: number,
  vaultAddresses: string[],
  toTimestamp: number
) => {
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
        swapTokenId: swap.mintedIds[i],
        txId: swap.id.split('-')[0],
        amount: 1,
        ethAmount: BigNumber.from(swap?.zapAction?.ethAmount ?? 0),
        feeAmount: receipt.amount.div(swap.redeemedIds.length),
        type: 'swap',
      };
    });
  });

  if (response.swaps.length === 1000) {
    const lastSwap = swaps[swaps.length - 1];
    const nextTimestamp = lastSwap.date;
    const moreSwaps = await getSwaps({
      network,
      vaultAddresses,
      fromTimestamp: Number(nextTimestamp),
      toTimestamp,
    });
    swaps = [...swaps, ...moreSwaps];
  }

  return swaps;
};

export const getSwaps = async ({
  network,
  fromTimestamp,
  toTimestamp,
  vaultAddresses,
}: {
  network: number;
  fromTimestamp: number;
  toTimestamp: number;
  vaultAddresses: string[];
}) => {
  const where = buildWhere({
    date_gt: fromTimestamp,
    date_lte: toTimestamp,
    vault: vaultAddresses?.length === 1 ? vaultAddresses[0] : null,
    vault_in: vaultAddresses?.length === 1 ? null : vaultAddresses,
  });
  const query = gql<{ swaps: Swap[] }>`{ ${createSwapsQuery(where)} }`;

  const response = await querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });

  const swaps = await processSwaps(
    response,
    network,
    vaultAddresses,
    toTimestamp
  );

  return swaps;
};
