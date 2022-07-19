import { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import { buildWhere, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '../../web3';
import type { VaultActivity, VaultAddress } from '../types';
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
  vaultAddresses: VaultAddress[]
) => {
  let swaps = response.swaps.flatMap((swap): VaultActivity[] => {
    const receipt = transformFeeReceipt(swap.feeReceipt, swap.vault.id);

    return swap.redeemedIds.map((nftId, i): VaultActivity => {
      return {
        vaultAddress: swap.vault.id,
        date: Number(swap.date),
        tokenId: nftId,
        swapTokenId: swap.mintedIds[i],
        txId: swap.id,
        amount: 1,
        ethAmount: BigNumber.from(swap?.zapAction?.ethAmount ?? 0),
        feeAmount: receipt.amount.div(swap.redeemedIds.length),
        type: 'swap',
      };
    });
  });

  if (swaps.length === 1000) {
    const lastSwap = swaps[swaps.length - 1];
    const nextTimestamp = lastSwap.date;
    const moreSwaps = await getSwaps({
      network,
      vaultAddresses,
      fromTimestamp: Number(nextTimestamp),
    });
    swaps = [...swaps, ...moreSwaps];
  }

  return swaps;
};

export const getSwaps = async ({
  network,
  fromTimestamp,
  vaultAddresses,
}: {
  network: number;
  fromTimestamp: number;
  vaultAddresses: VaultAddress[];
}) => {
  const where = buildWhere({
    date_gt: fromTimestamp,
    vault: vaultAddresses?.length === 1 ? vaultAddresses[0] : null,
    vault_in: vaultAddresses?.length === 1 ? null : vaultAddresses,
  });
  const query = `{ ${createSwapsQuery(where)} }`;

  const response = await querySubgraph<{ swaps: Swap[] }>({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });

  const swaps = await processSwaps(response, network, vaultAddresses);

  return swaps;
};
