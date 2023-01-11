import { BigNumber } from '@ethersproject/bignumber';
import { NFTX_MARKETPLACE_0X_ZAP, NFTX_STAKING_ZAP } from '@nftx/constants';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import { transformFeeReceipt } from './common';
import config from '@nftx/config';
import type { VaultActivity } from '@nftx/types';
import { addressEqual, getChainConstant } from '@nftx/utils';

export type Mint = {
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
  user: { id: string };
  date: string;
  nftIds: string[];
  amounts: string[];
  feeReceipt: {
    transfers: Array<{ amount: string; to: string }>;
    date: string;
  };
};

export const createMintsQuery = (where: string) => {
  return `mints(
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
    user {
      id
    }
    date
    nftIds
    amounts
    feeReceipt {
      transfers {
        amount
        to
      }
      date
    }
  }`;
};

const isStakeOrMint = (
  mint: Mint,
  network: number
): [VaultActivity['type'], VaultActivity['stakeType']] => {
  if (
    addressEqual(mint.user?.id, getChainConstant(NFTX_STAKING_ZAP, network))
  ) {
    // LP Stake
    return ['stake', 'liquidity'];
  }
  if (addressEqual(mint.user?.id, mint.vault.inventoryStakingPool?.id)) {
    // Inventory Stake
    return ['stake', 'inventory'];
  }

  if (
    mint.zapAction ||
    addressEqual(
      mint.user?.id,
      getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network)
    )
  ) {
    return ['sell', undefined];
  }

  return ['mint', undefined];
};

export const processMints = async (
  response: { mints: Mint[] },
  network: number,
  vaultAddresses: string[],
  toTimestamp: number
) => {
  let mints = response.mints.flatMap((mint): VaultActivity[] => {
    const receipt = transformFeeReceipt(
      mint.feeReceipt,
      mint.vault.id,
      mint.vault.vaultId
    );
    const [type, stakeType] = isStakeOrMint(mint, network);

    return mint.nftIds.map((nftId, i): VaultActivity => {
      return {
        vaultId: mint.vault.vaultId,
        vaultAddress: mint.vault.id,
        date: Number(mint.date),
        tokenId: nftId,
        txId: mint.id.split('-')[0],
        amount: Number(mint.amounts[i]),
        ethAmount: BigNumber.from(mint?.zapAction?.ethAmount ?? 0),
        feeAmount: receipt.amount.div(mint.nftIds.length),
        type,
        stakeType,
      };
    });
  });

  if (response.mints.length === 1000) {
    const lastMint = mints[mints.length - 1];
    const nextTimestamp = lastMint.date;
    const moreMints = await getMints({
      network,
      vaultAddresses,
      fromTimestamp: Number(nextTimestamp),
      toTimestamp,
    });
    mints = [...mints, ...moreMints];
  }

  return mints;
};

export const getMints = async ({
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
  const query = gql<{ mints: Mint[] }>`{ ${createMintsQuery(where)} }`;

  const response = await querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });

  const mints = await processMints(
    response,
    network,
    vaultAddresses,
    toTimestamp
  );

  return mints;
};
