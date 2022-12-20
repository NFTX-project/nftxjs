import type { BigNumber } from '@ethersproject/bignumber';
import type { TokenReserve } from './tokens';

/**
 * An NFTX pool
 * This interface contains details on both inventory staking and liquidity staking
 */
export type Pool = {
  vaultId: string;
  vaultAddress: string;
  liquidityPoolId: string;
  stakingTokenId: string;
  liquidityApr: number;
  inventoryApr: number;
  /** The total amount of inventory (xToken) in the pool, in ETH */
  inventoryStaked: BigNumber;
  /** The total amount of liquidity (xSlp) in the pool, in ETH */
  liquidityStaked: BigNumber;
  /** The total value staked (xToken + xSlp) in the pool, in ETH */
  totalValueStaked: BigNumber;
  inventoryLockTime: number;
  liquidityLockTime: number;
  /** The % of the pool that is LP */
  liquiditySplit: number;
  /** The % of the pool that is IP */
  inventorySplit: number;

  poolReserves: TokenReserve;
  /** The total amount of xToken in the inventory contract */
  xTokenSupply: BigNumber;
  /** The amount of xToken per vToken */
  xTokenShare: BigNumber;
  /** The total amount of xSlp in the dividend token contract */
  xSlpSupply: BigNumber;
  /** The total supply of SLP on the staking token contract */
  slpSupply: BigNumber;
  /** The SLP balance of the staking contract */
  slpBalance: BigNumber;
  /** The total number of fees generated in the last 30 days */
  periodFees: BigNumber;
  /** The vault creation date */
  createdAt: number;
};
