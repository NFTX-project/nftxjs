import type { TokenReserve } from './tokens';
import type { Address } from './web3';

/**
 * An NFTX pool
 * This interface contains details on both inventory staking and liquidity staking
 */
export type Pool = {
  vaultId: string;
  vaultAddress: Address;
  liquidityPoolId: Address;
  stakingTokenId: Address;
  liquidityApr: number;
  inventoryApr: number;
  /** The total amount of inventory (xToken) in the pool, in ETH */
  inventoryStaked: bigint;
  /** The total amount of liquidity (xSlp) in the pool, in ETH */
  liquidityStaked: bigint;
  /** The total value staked (xToken + xSlp) in the pool, in ETH */
  totalValueStaked: bigint;
  inventoryLockTime: number;
  liquidityLockTime: number;
  /** The % of the pool that is LP */
  liquiditySplit: number;
  /** The % of the pool that is IP */
  inventorySplit: number;

  poolReserves: TokenReserve;
  /** The total amount of xToken in the inventory contract */
  xTokenSupply: bigint;
  /** The amount of xToken per vToken */
  xTokenShare: bigint;
  /** The total amount of xSlp in the dividend token contract */
  xSlpSupply: bigint;
  /** The total supply of SLP on the staking token contract */
  slpSupply: bigint;
  /** The SLP balance of the staking contract */
  slpBalance: bigint;
  /** The total number of fees generated in the last 30 days */
  periodFees: bigint;
  /** The vault creation date */
  createdAt: number;
};

export type CreatePoolFees = [
  mint: number,
  randomRedeem: number,
  targetRedeem: number,
  randomSwap: number,
  targetSwap: number
];

export type CreatePoolFeatures = [
  mint: boolean,
  randomRedeem: boolean,
  targetRedeem: boolean,
  randomSwap: boolean,
  targetSwap: boolean
];
