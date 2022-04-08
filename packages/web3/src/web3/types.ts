import type { BigNumber } from '@ethersproject/bignumber';

export type Address = string;

export type NftxTokenBalance = {
  type: 'vToken' | 'xToken' | 'slp' | 'xSlp';
  balance: BigNumber;
  symbol: string;
  address: Address;
  name: string;
};

// TODO: fetchNftxTokenBalances
// type FetchNftxTokenBalances = (args: {
//   userAddress: Address;
// }) => Promise<NftxTokenBalance>;
