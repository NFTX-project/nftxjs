import type { MarketplacePrice } from './price';
import type { ActivityEventType } from './subgraph/nftx-v3';
import type { Token } from './tokens';
import type { Address, TokenId } from './web3';

export type VaultFeatures = {
  enableMint: boolean;
  enableRedeem: boolean;
  enableSwap: boolean;
};

type VaultPrice = {
  mint: MarketplacePrice;
  redeem: MarketplacePrice;
  swap: MarketplacePrice;
};

export type VaultHolding = {
  id: string;
  assetAddress: Address;
  tokenId: TokenId;
  quantity: bigint;
  dateAdded: number;
  vaultId: string;
};

export type VaultFees = {
  mintFee: bigint;
  redeemFee: bigint;
  swapFee: bigint;
};

export type VaultState = 'unfinalized' | 'empty' | 'active' | 'shutdown';

export type Vault = {
  vaultId: string;
  id: Address;
  slug: string;
  collectionSlug: string;
  /** The current state of the vault */
  state: VaultState;
  asset: Token;
  createdBy: { id: Address };
  createdAt: number;
  /** An array of prices for buying n items from the vault.
   * The [0] indexed price is for buying 1 item.
   * The [4] indexed price is for buying 5 items. */
  prices: [VaultPrice, VaultPrice, VaultPrice, VaultPrice, VaultPrice];
  features: VaultFeatures;
  totalHoldings: number;
  totalMints: number;
  totalRedeems: number;
  totalFees: bigint;
  is1155: boolean;
  isFinalized: boolean;
  usesFactoryFees: boolean;
  fees: VaultFees;
  manager: { id: Address };
  token: Token;
  /** A sample token id from the vault */
  tokenId: `${number}`;
  eligibilityModule: {
    id: Address;
    name: string;
    eligibleIds: string[];
    eligibleRange: [string, string];
    merkleReference: string;
  };
  shutdownDate: number;
  /** The ETH price of 1 vToken (comes from vaultContract.vTokenToETH(WeiPerEther)) */
  vTokenToEth: bigint;
};

export type VaultActivityType =
  | 'buy'
  | 'sell'
  | 'swap'
  | 'mint'
  | 'redeem'
  | 'stake'
  | 'unstake'
  | 'create'
  | 'update'
  | 'shutdown';
type VaultActivityEventType = ActivityEventType;

type CommonVaultActivity<T extends VaultActivityType> = {
  vaultId: string;
  vaultAddress: Address;
  date: number;
  type: T;
  txId: Address;
  source: string;
  eventType: VaultActivityEventType;
};
type SellVaultActivity = CommonVaultActivity<'sell' | 'mint'> & {
  tokenIds: `${number}`[];
  feeAmount: bigint;
};
type BuyVaultActivity = CommonVaultActivity<'redeem' | 'buy'> & {
  tokenIds: `${number}`[];
  feeAmount: bigint;
};
type SwapVaultActivity = CommonVaultActivity<'swap'> & {
  tokenIds: `${number}`[];
  swapTokenIds: `${number}`[];
  feeAmount: bigint;
};
type StakeVaultActivity = CommonVaultActivity<'stake'> & {
  stakeType: 'liquidity' | 'inventory';
  amount: bigint;
};
type UnstakeVaultActivity = CommonVaultActivity<'unstake'> & {
  stakeType: 'inventory' | 'liquidity';
  amount: bigint;
};
type CreateVaultActivity = CommonVaultActivity<'create'>;
type UpdateVaultActivity = CommonVaultActivity<'update'>;
type ShudownVaultActivity = CommonVaultActivity<'shutdown'>;

export type VaultActivity =
  | SellVaultActivity
  | BuyVaultActivity
  | SwapVaultActivity
  | StakeVaultActivity
  | UnstakeVaultActivity
  | CreateVaultActivity
  | UpdateVaultActivity
  | ShudownVaultActivity;

export type VaultFeeReceipt = {
  vaultId: string;
  vaultAddress: string;
  amount: bigint;
  date: number;
};
