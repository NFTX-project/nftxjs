import type { Address } from './web3';

/** A user's Liquidity Position */
export type LiquidityPosition = {
  id: string;
  poolId: string;
  userAddress: Address;
  vaultId: string;
  vaultAddress: Address;
  /** The upper boundary of the position range */
  tickUpper: bigint;
  /** The lower boundary of the position range */
  tickLower: bigint;
  /** The upper tick in ETH */
  tickUpperValue: bigint;
  /** The lower tick in ETH */
  tickLowerValue: bigint;
  /** Whether the position is currently in range */
  inRange: boolean;
  /** The amount of liquidity in this posistion */
  liquidity: bigint;
  /** The amount of vToken in this position */
  vToken: bigint;
  /** The ETH value of the vToken */
  vTokenValue: bigint;
  /** The amount of ETH in this position */
  eth: bigint;
  /** The ETH value of the position (i.e. ETH side + eth-value of vToken) */
  value: bigint;
  totalDeposits: number;
  totalWithdrawals: number;
  /** The lifetime amount deposited into this position */
  lifetimeDeposits: bigint;
  /** The lifetime amount withdrawn from this position */
  lifetimeWithdrawals: bigint;
  /** The lifetime amount of rewards earned by this position in ETH */
  lifetimeRewards: bigint;
  /** The amount claimable on this position in ETH */
  claimableRewards: bigint;
};

/** A user's Inventory Position, essentially a single xNFT */
export type InventoryPosition = {
  id: Address;
  userAddress: Address;
  vaultId: string;
  vaultAddress: Address;
  /** The amount of inventory staked (in vToken terms) */
  vToken: bigint;
  /** The ETH value of the position */
  vTokenValue: bigint;
  /** The lifetime amount of rewards earned by this position in ETH */
  lifetimeRewards: bigint;
  /** The amount claimable on this position in ETH */
  claimableRewards: bigint;
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
