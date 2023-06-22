import { NFTX_STAKING_ZAP } from '@nftx/constants';
import { buildWhere, gql, type querySubgraph } from '@nftx/subgraph';
import { transformFeeReceipt } from './common';
import config from '@nftx/config';
import type { Address, TokenId, VaultActivity } from '@nftx/types';
import { addressEqual, getChainConstant } from '@nftx/utils';

type QuerySubgraph = typeof querySubgraph;

export type Mint = {
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
  source: string;
  user: { id: Address };
  date: `${number}`;
  nftIds: TokenId[];
  amounts: `${number}`[];
  feeReceipt: {
    transfers: Array<{ amount: `${number}`; to: Address }>;
    date: `${number}`;
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

  // if (
  //   mint.zapAction ||
  //   addressEqual(
  //     mint.user?.id,
  //     getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network)
  //   )
  // ) {
  //   return ['sell', undefined];
  // }

  return ['mint', undefined];
};

export const makeProcessMints = ({ fetchMints }: { fetchMints: FetchMints }) =>
  async function processMints({
    network,
    response,
    toTimestamp,
    vaultAddresses,
  }: {
    response: { mints: Mint[] };
    network: number;
    vaultAddresses?: Address[];
    toTimestamp?: number;
  }) {
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
          source: mint.source,
          txId: (mint.id.split('-')[1] ?? mint.id) as Address,
          amount: Number(mint.amounts[i]),
          ethAmount: BigInt(mint?.zapAction?.ethAmount ?? '0'),
          feeAmount: receipt.amount / BigInt(mint.nftIds.length),
          type,
          stakeType,
        };
      });
    });

    if (response.mints.length === 1000) {
      const lastMint = mints[mints.length - 1];
      const nextTimestamp = lastMint.date;
      const response = await fetchMints({
        network,
        vaultAddresses,
        fromTimestamp: Number(nextTimestamp),
        toTimestamp,
      });
      const moreMints = await processMints({
        response,
        network,
        vaultAddresses,
        toTimestamp,
      });
      mints = [...mints, ...moreMints];
    }

    return mints;
  };

export type ProcessMints = ReturnType<typeof makeProcessMints>;

export const makeFetchMints =
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
    const query = gql<{ mints: Mint[] }>`{ ${createMintsQuery(where)} }`;

    return querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      query,
    });
  };

export type FetchMints = ReturnType<typeof makeFetchMints>;
