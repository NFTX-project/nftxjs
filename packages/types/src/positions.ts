import type { Address, TokenId } from './web3';

/** A user's Liquidity Position */
export type LiquidityPosition = {
  id: Address;
  poolId: Address;
  tokenId: TokenId;
  userAddress: Address;
  vaultId: string;
  vaultAddress: Address;
  poolName: string;
  /** The upper boundary of the position range */
  tickUpper: bigint;
  /** The lower boundary of the position range */
  tickLower: bigint;
  /** The current tick of the pool */
  tick: bigint;
  /** Whether the position is an infinite range */
  isFullRange: boolean;
  /** The current tick price */
  tickValue: bigint;
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
  /** The ETH value of the position when created */
  initialValue: bigint;
  /** The % of the pool provided by this position */
  poolShare: bigint;
  /** The lifetime amount of rewards earned by this position in ETH */
  lifetimeRewards: bigint;
  /** The claimable amount of ETH on this position */
  claimableEth: bigint;
  /** The claimable amount of vToken on this position */
  claimableVToken: bigint;
  /** The amount claimable on this position in ETH */
  claimableValue: bigint;
  lockedUntil: number;
  /** The address of the manager contract for this position */
  manager: Address;
  /** The pool router for this position */
  poolRouter: Address;
};

/** A user's Inventory Position, essentially a single xNFT */
export type InventoryPosition = {
  id: Address;
  tokenId: TokenId;
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
  /** The % of the pool provided by this position */
  poolShare: bigint;
  /** The timestamp at which the position can be withdrawn. During this timelock, you cannot withdraw at all */
  vTokenLockedUntil: number;
  /** The timestamp at which the position is no longer timelocked. During the timelock you must pay an early exit fee to withdraw */
  lockedUntil: number;
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
