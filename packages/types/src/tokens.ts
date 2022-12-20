import type { BigNumber } from '@ethersproject/bignumber';

/**
 * Common token metadata
 */
export type Token = {
  id: string;
  name: string;
  symbol: string;
};

/**
 * A token reserve
 */
export type TokenReserve = {
  tokenId: string;
  derivedEth: string;
  reserveVtoken: BigNumber;
  reserveWeth: BigNumber;
  midPrice: BigNumber;
};
