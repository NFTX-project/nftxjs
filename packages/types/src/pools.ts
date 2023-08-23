import type { Token } from './tokens';
import type { Address } from './web3';

/**
 * A Liquidity pool allows you to stake liquidity for a vault.
 * There can be multiple pools per vault - though usually only 2 or 3 will be available.
 */
export type LiquidityPool = {
  /** A unique identifier for the liquidity pool */
  id: string;
  vaultId: string;
  vaultAddress: Address;
  /** The fee tier for this pool, 0.3, 0.5, 1 */
  feeTier: 0.3 | 0.5 | 1;
  /** A list of all of the applicable fees for this pool */
  fees: {
    id: Address;
    feeType: 'FIXED_PROTOCOL_FEE' | 'FIXED_LP_FEE' | 'FIXED_TRADING_FEE';
    /** A percentage in decimal format */
    feePercentage: number;
  }[];
  /** The current tick that the pool is operating at */
  tick: bigint;
  totalLiquidity: bigint;
  activeLiquidity: bigint;
  inRangeLiquidity: bigint;
  /** The token pair that makes up the pool */
  tokens: Array<Token & { balance: bigint }>;
  /** Whether or not the pool actually exists or if it needs creating */
  exists: boolean;
  name: string;
  /** The total number of fees generated in the last 30 days */
  periodFees: {
    '24h': bigint;
    '7d': bigint;
    '1m': bigint;
    all: bigint;
  };
  apr: {
    '24h': bigint;
    '7d': bigint;
    '1m': bigint;
    all: bigint;
  };
  totalValueLocked: bigint;
  dailyVolume: bigint;
  weeklyVolume: bigint;
  dailyRevenue: bigint;
  weeklyRevenue: bigint;
};

export type InventoryPool = {
  vaultId: string;
  vaultAddress: Address;
  /** The total amount of inventory staked (in vToken terms) */
  vToken: bigint;
  /** The ETH value of the total inventory staked */
  vTokenValue: bigint;
  /** The total number of unique xNFTs staked on this pool */
  xNFTCount: number;
  /** The total number of fees generated in the last 30 days */
  periodFees: {
    '24h': bigint;
    '7d': bigint;
    '1m': bigint;
    all: bigint;
  };
  apr: {
    '24h': bigint;
    '7d': bigint;
    '1m': bigint;
    all: bigint;
  };
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
