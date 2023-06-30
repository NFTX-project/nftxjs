import type { Address } from '@nftx/types';

export type PoolIdsResponse = {
  liquidityPools: { id: Address }[];
};

export type PositionsResponse = {
  positions: Array<{
    id: Address;
    liquidity: string;
    pool: {
      id: Address;
      tick: string;
      inputTokens: Array<{ id: Address }>;
    };
    tickLower: { index: string };
    tickUpper: { index: string };
    account: { id: Address };
    cumulativeDepositTokenAmounts: string[];
    cumulativeWithdrawTokenAmounts: string[];
  }>;
};
