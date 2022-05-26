import type { BigNumber } from '@ethersproject/bignumber';

export type Token = {
  id: string;
  name: string;
  symbol: string;
};

export type TokenReserve = {
  tokenId: string;
  derivedEth: string;
  reserveVtoken: BigNumber;
  reserveWeth: BigNumber;
  midPrice: BigNumber;
};
