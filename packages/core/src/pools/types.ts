import type { Address, Token } from '@nftx/types';

export type LiquidityPool = {
  id: Address;
  /** the sushi token i.e. PUNK-ETH */
  stakingToken: Token;
  /** The address of the token you mint when you stake i.e. xPUNK */
  dividendToken: Token;
  /** The token rewarded for staking i.e. PUNK */
  rewardToken: Token;
  deployBlock: string;
  vaultAddress: Address;
  vaultId: string;
};

export type InventoryPool = {
  /** the xToken address */
  id: Address;
  dividendToken: Token;
  vaultAddress: Address;
  vaultId: string;
};
