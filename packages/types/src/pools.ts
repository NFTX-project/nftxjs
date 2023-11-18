import type { Token } from './tokens';
import type { Address } from './web3';
import type { FeePercentage, FeeTier } from '@nftx/constants';

/**
 * A Liquidity pool allows you to stake liquidity for a vault.
 * There can be multiple pools per vault - though usually only 2 or 3 will be available.
 */
export type LiquidityPool = {
  /** A unique identifier for the liquidity pool */
  id: Address;
  vaultId: string;
  vaultAddress: Address;
  /** The fee tier for this pool */
  feeTier: FeeTier;
  /** A list of all of the applicable fees for this pool */
  fees: {
    id: Address;
    feeType: 'FIXED_PROTOCOL_FEE' | 'FIXED_LP_FEE' | 'FIXED_TRADING_FEE';
    /** A percentage in decimal format */
    feePercentage: FeePercentage;
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
  /** The total number of positions */
  totalPositions: number;
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
  /** The length of time a position is locked for */
  timelock: number;
  /** The total number of positions */
  totalPositions: number;
  dailyVolume: bigint;
  weeklyVolume: bigint;
};

export type CreatePoolFees = [mint: number, redeem: number, swap: number];

export type CreatePoolFeatures = [
  mint: boolean,
  redeem: boolean,
  swap: boolean
];
