import type { BigNumber } from '@ethersproject/bignumber';
import type { Pool } from './pools';

/**
 * A given user's NFTX position in a given a pool
 */
export type Position = Pool & {
  userAddress: string;
  /** The amount of ETH staked by the user (paired with vToken) */
  liquidityEth: BigNumber;
  /** The amount of vToken staked by the user (paired with ETH) */
  liquidityTokens: BigNumber;
  /** The total liquidity staked by the user in ETH terms */
  liquidityValue: BigNumber;
  /** The user's % share of all staked liquidity */
  liquidityShare: BigNumber;
  /** The % of the user's total position that is in liquidity (vs inventory) */
  liquiditySplit: number;
  /** The amount of vToken the user can currently claim */
  claimableAmount: BigNumber;
  /** The amount of vToken the user can currently claim in ETH terms */
  claimableValue: BigNumber;

  /** The amount of xToken staked by the user (in vToken terms) */
  inventoryTokens: BigNumber;
  /** The total inventory staked by the user in ETH terms */
  inventoryValue: BigNumber;
  /** The user's % share of all staked inventory */
  inventoryShare: BigNumber;
  /** The % of the user's total position that is in inventory (vs liquidity) */
  inventorySplit: number;

  /** The ETH value of inventory staked + liquidity staked */
  valueStaked: BigNumber;
  /** The ETH value of inventory + liquidity + claimable */
  totalValue: BigNumber;

  /** The user's xToken balance */
  xTokenBalance: BigNumber;
  /** The user's xSlp balance */
  xSlpBalance: BigNumber;
  /** The user's slp balance */
  slpBalance: BigNumber;

  // yield: Pick<PositionYield, 'amount' | 'timestamp' | 'txnId' | 'type'>[];
  // lifetimeYield: BigNumber;
};

/** A fee generation event */
export type PositionYield = {
  vaultId: string;
  vaultAddress: string;
  /** The transaction hash */
  txnId: string;
  /** The vault symbol */
  symbol: string;
  /** The timestamp (in seconds) of the transaction */
  timestamp: number;
  /** Mint/Redeem/Swap */
  type: string;
  /** The amount generated for the user in vToken terms */
  amount: BigNumber;
};
