import type { Token } from '@nftx/types';

export type LiquidityPool = {
  id: string;
  /** the sushi token i.e. PUNK-ETH */
  stakingToken: Token;
  /** The address of the token you mint when you stake i.e. xPUNK */
  dividendToken: Token;
  /** The token rewarded for staking i.e. PUNK */
  rewardToken: Token;
  deployBlock: string;
  vaultAddress: string;
  vaultId: string;
};

export type InventoryPool = {
  /** the xToken address */
  id: string;
  dividendToken: Token;
  vaultAddress: string;
  vaultId: string;
};
