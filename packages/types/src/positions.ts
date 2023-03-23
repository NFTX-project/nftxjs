import type { Pool } from './pools';
import type { Address } from './web3';

/**
 * A given user's NFTX position in a given a pool
 */
export type Position = Pool & {
  userAddress: Address;
  /** The amount of ETH staked by the user (paired with vToken) */
  liquidityEth: bigint;
  /** The amount of vToken staked by the user (paired with ETH) */
  liquidityTokens: bigint;
  /** The total liquidity staked by the user in ETH terms */
  liquidityValue: bigint;
  /** The user's % share of all staked liquidity */
  liquidityShare: bigint;
  /** The % of the user's total position that is in liquidity (vs inventory) */
  liquiditySplit: number;
  /** The amount of vToken the user can currently claim */
  claimableAmount: bigint;
  /** The amount of vToken the user can currently claim in ETH terms */
  claimableValue: bigint;

  /** The amount of xToken staked by the user (in vToken terms) */
  inventoryTokens: bigint;
  /** The total inventory staked by the user in ETH terms */
  inventoryValue: bigint;
  /** The user's % share of all staked inventory */
  inventoryShare: bigint;
  /** The % of the user's total position that is in inventory (vs liquidity) */
  inventorySplit: number;

  /** The ETH value of inventory staked + liquidity staked */
  valueStaked: bigint;
  /** The ETH value of inventory + liquidity + claimable */
  totalValue: bigint;

  /** The user's xToken balance */
  xTokenBalance: bigint;
  /** The user's xSlp balance */
  xSlpBalance: bigint;
  /** The user's slp balance */
  slpBalance: bigint;

  // yield: Pick<PositionYield, 'amount' | 'timestamp' | 'txnId' | 'type'>[];
  // lifetimeYield: bigint;
};

/** A fee generation event */
export type PositionYield = {
  vaultId: string;
  vaultAddress: Address;
  /** The transaction hash */
  txnId: Address;
  /** The vault symbol */
  symbol: string;
  /** The timestamp (in seconds) of the transaction */
  timestamp: number;
  /** Mint/Redeem/Swap */
  type: string;
  /** The amount generated for the user in vToken terms */
  amount: bigint;
};
