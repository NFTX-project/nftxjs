import type { BigNumber } from '@ethersproject/bignumber';

export type NftxTokenType = 'xTokenWETH' | 'xToken' | 'vToken' | 'vTokenWETH';

export type UserVaultBalance = {
  balance: BigNumber;
  symbol: string;
  address: string;
  name: string;
  type: NftxTokenType;
  vaultId: string;
};
