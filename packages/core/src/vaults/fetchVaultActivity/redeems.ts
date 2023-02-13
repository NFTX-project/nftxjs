import { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { VaultActivity, VaultFeeReceipt } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { transformFeeReceipt } from './common';

export type Redeem = {
  id: string;
  zapAction: { ethAmount: string; id: string };
  vault: {
    id: string;
    vaultId: string;
    token: { symbol: string };
    asset: { id: string };
  };
  source: string;
  user: { id: string };
  date: string;
  nftIds: string[];
  specificIds: string[];
  randomCount: string;
  feeReceipt: {
    transfers: Array<{
      amount: string;
      to: string;
    }>;
    date: string;
  };
};

export const createRedeemsQuery = (where: string) => {
  return `redeems(
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
    }
    user {
      id
    }
    date
    nftIds
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

const isRedeemOrUnstake = (redeem: Redeem, receipt: VaultFeeReceipt) => {
  if (redeem.zapAction != null) {
    return 'buy';
  }
  if (receipt.amount.eq(0)) {
    return 'unstake';
  }
  return 'redeem';
};

export const processRedeems = async (
  response: { redeems: Redeem[] },
  network: number,
  vaultAddresses: string[],
  toTimestamp: number
) => {
  let redeems = response.redeems.flatMap((redeem) => {
    const receipt = transformFeeReceipt(
      redeem.feeReceipt,
      redeem.vault.id,
      redeem.vault.vaultId
    );
    return redeem.nftIds.map((nftId): VaultActivity => {
      const target = redeem.specificIds?.includes(nftId);
      // TODO: figure out a way to get msg.sender so we know if it's gem etc.

      return {
        tokenId: nftId,
        vaultId: redeem.vault.vaultId,
        vaultAddress: redeem.vault.id,
        date: Number(redeem.date),
        txId: redeem.id.split('-')[1] ?? redeem.id,
        random: !target,
        type: isRedeemOrUnstake(redeem, receipt),
        source: redeem.source,
        amount: 1,
        ethAmount: redeem?.zapAction?.ethAmount
          ? BigNumber.from(redeem.zapAction.ethAmount)
          : null,
        feeAmount: receipt.amount.div(redeem.nftIds.length),
      };
    });
  });

  if (response.redeems.length === 1000) {
    const lastRedeem = redeems[redeems.length - 1];
    const nextTimestamp = lastRedeem.date;
    const moreRedeems = await getRedeems({
      vaultAddresses,
      network,
      fromTimestamp: nextTimestamp,
      toTimestamp,
    });

    redeems = [...redeems, ...moreRedeems];
  }

  return redeems;
};

export const getRedeems = async ({
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
  const query = gql<{
    redeems: Redeem[];
  }>`{ ${createRedeemsQuery(where)} }`;

  const response = await querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });

  const mints = await processRedeems(
    response,
    network,
    vaultAddresses,
    toTimestamp
  );

  return mints;
};
