import type { BigNumber } from '@ethersproject/bignumber';

// export type NftxTokenType = 'xTokenWETH' | 'xToken' | 'vToken' | 'vTokenWETH';
export enum NftxTokenType {
  /** vToken paired with WETH and staked in NFTX */
  xTokenWETH = 'xTokenWETH',
  /** vToken staked in NFTX */
  xToken = 'xToken',
  vToken = 'vToken',
  /** vToken paired with WETH on Sushi */
  vTokenWETH = 'vTokenWETH',
}

/**
 * An NFTX balance held by a user
 * This could be
 */
export type UserVaultBalance = {
  balance: BigNumber;
  symbol: string;
  address: string;
  name: string;
  type: NftxTokenType;
  vaultId: string;
};
