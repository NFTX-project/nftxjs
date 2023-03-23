import type { Address } from './web3';

/**
 * Common token metadata
 */
export type Token = {
  id: Address;
  name: string;
  symbol: string;
};

/**
 * A token reserve
 */
export type TokenReserve = {
  tokenId: Address;
  derivedEth: string;
  reserveVtoken: bigint;
  reserveWeth: bigint;
  midPrice: bigint;
};
