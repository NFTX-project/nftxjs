import type { Address } from './web3';

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
  balance: bigint;
  symbol: string;
  address: Address;
  name: string;
  type: NftxTokenType;
  vaultId: string;
};
