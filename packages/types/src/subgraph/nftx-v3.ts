export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: string; output: string; }
  BigInt: { input: string; output: string; }
  Bytes: { input: string; output: string; }
  Int8: { input: string|number; output: string|number; }
};

export type ActivityEvent = {
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export enum ActivityEventType {
  Mint = 'Mint',
  Redeem = 'Redeem',
  Swap = 'Swap'
}

export type ActivityEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ActivityEvent_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ActivityEvent_Filter>>>;
  source?: InputMaybe<Scalars['Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['Bytes']['input']>;
  source_not?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<ActivityEventType>;
  type_in?: InputMaybe<Array<ActivityEventType>>;
  type_not?: InputMaybe<ActivityEventType>;
  type_not_in?: InputMaybe<Array<ActivityEventType>>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ActivityEvent_OrderBy {
  Date = 'date',
  Id = 'id',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  vaults: Array<Vault>;
};


export type AssetVaultsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Vault_Filter>;
};

export type Asset_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Asset_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Asset_Filter>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaults_?: InputMaybe<Vault_Filter>;
};

export enum Asset_OrderBy {
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  Vaults = 'vaults'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type EligibilityModule = {
  __typename?: 'EligibilityModule';
  eligibilityManager: Scalars['Bytes']['output'];
  eligibleIds?: Maybe<Array<Scalars['BigInt']['output']>>;
  eligibleRange?: Maybe<Array<Scalars['BigInt']['output']>>;
  finalized: Scalars['Boolean']['output'];
  finalizedOnDeploy: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  targetAsset: Asset;
};

export type EligibilityModule_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EligibilityModule_Filter>>>;
  eligibilityManager?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_contains?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_gt?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_gte?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  eligibilityManager_lt?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_lte?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_not?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManager_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  eligibleIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleRange?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleRange_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleRange_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleRange_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleRange_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eligibleRange_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  finalized?: InputMaybe<Scalars['Boolean']['input']>;
  finalizedOnDeploy?: InputMaybe<Scalars['Boolean']['input']>;
  finalizedOnDeploy_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  finalizedOnDeploy_not?: InputMaybe<Scalars['Boolean']['input']>;
  finalizedOnDeploy_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  finalized_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  finalized_not?: InputMaybe<Scalars['Boolean']['input']>;
  finalized_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<EligibilityModule_Filter>>>;
  targetAsset?: InputMaybe<Scalars['String']['input']>;
  targetAsset_?: InputMaybe<Asset_Filter>;
  targetAsset_contains?: InputMaybe<Scalars['String']['input']>;
  targetAsset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  targetAsset_ends_with?: InputMaybe<Scalars['String']['input']>;
  targetAsset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  targetAsset_gt?: InputMaybe<Scalars['String']['input']>;
  targetAsset_gte?: InputMaybe<Scalars['String']['input']>;
  targetAsset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  targetAsset_lt?: InputMaybe<Scalars['String']['input']>;
  targetAsset_lte?: InputMaybe<Scalars['String']['input']>;
  targetAsset_not?: InputMaybe<Scalars['String']['input']>;
  targetAsset_not_contains?: InputMaybe<Scalars['String']['input']>;
  targetAsset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  targetAsset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  targetAsset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  targetAsset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  targetAsset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  targetAsset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  targetAsset_starts_with?: InputMaybe<Scalars['String']['input']>;
  targetAsset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum EligibilityModule_OrderBy {
  EligibilityManager = 'eligibilityManager',
  EligibleIds = 'eligibleIds',
  EligibleRange = 'eligibleRange',
  Finalized = 'finalized',
  FinalizedOnDeploy = 'finalizedOnDeploy',
  Id = 'id',
  Name = 'name',
  TargetAsset = 'targetAsset',
  TargetAssetId = 'targetAsset__id',
  TargetAssetName = 'targetAsset__name',
  TargetAssetSymbol = 'targetAsset__symbol'
}

export type Feature = {
  __typename?: 'Feature';
  enableMint: Scalars['Boolean']['output'];
  enableRedeem: Scalars['Boolean']['output'];
  enableSwap: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  vault: Vault;
};

export type Feature_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Feature_Filter>>>;
  enableMint?: InputMaybe<Scalars['Boolean']['input']>;
  enableMint_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enableMint_not?: InputMaybe<Scalars['Boolean']['input']>;
  enableMint_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enableRedeem?: InputMaybe<Scalars['Boolean']['input']>;
  enableRedeem_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enableRedeem_not?: InputMaybe<Scalars['Boolean']['input']>;
  enableRedeem_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enableSwap?: InputMaybe<Scalars['Boolean']['input']>;
  enableSwap_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enableSwap_not?: InputMaybe<Scalars['Boolean']['input']>;
  enableSwap_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Feature_Filter>>>;
  vault_?: InputMaybe<Vault_Filter>;
};

export enum Feature_OrderBy {
  EnableMint = 'enableMint',
  EnableRedeem = 'enableRedeem',
  EnableSwap = 'enableSwap',
  Id = 'id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type Fee = {
  __typename?: 'Fee';
  id: Scalars['ID']['output'];
  mintFee: Scalars['BigInt']['output'];
  redeemFee: Scalars['BigInt']['output'];
  swapFee: Scalars['BigInt']['output'];
  vault: Vault;
};

export type FeeReceipt = {
  __typename?: 'FeeReceipt';
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  token: Token;
  transfers: Array<FeeTransfer>;
  vault: Vault;
};


export type FeeReceiptTransfersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FeeTransfer_Filter>;
};

export type FeeReceipt_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeeReceipt_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<FeeReceipt_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transfers_?: InputMaybe<FeeTransfer_Filter>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum FeeReceipt_OrderBy {
  Date = 'date',
  Id = 'id',
  Token = 'token',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  TokenTotalSupply = 'token__totalSupply',
  Transfers = 'transfers',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type FeeReceiver = {
  __typename?: 'FeeReceiver';
  allocPoint: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  vault?: Maybe<Vault>;
};

export type FeeReceiver_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allocPoint?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocPoint_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<FeeReceiver_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<FeeReceiver_Filter>>>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum FeeReceiver_OrderBy {
  AllocPoint = 'allocPoint',
  Id = 'id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type FeeTransfer = {
  __typename?: 'FeeTransfer';
  amount: Scalars['BigInt']['output'];
  feeReceipt: FeeReceipt;
  id: Scalars['ID']['output'];
  to: Scalars['Bytes']['output'];
};

export type FeeTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<FeeTransfer_Filter>>>;
  feeReceipt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_?: InputMaybe<FeeReceipt_Filter>;
  feeReceipt_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_lt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_lte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<FeeTransfer_Filter>>>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum FeeTransfer_OrderBy {
  Amount = 'amount',
  FeeReceipt = 'feeReceipt',
  FeeReceiptDate = 'feeReceipt__date',
  FeeReceiptId = 'feeReceipt__id',
  Id = 'id',
  To = 'to'
}

export type Fee_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Fee_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mintFee?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Fee_Filter>>>;
  redeemFee?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  redeemFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  swapFee?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault_?: InputMaybe<Vault_Filter>;
};

export enum Fee_OrderBy {
  Id = 'id',
  MintFee = 'mintFee',
  RedeemFee = 'redeemFee',
  SwapFee = 'swapFee',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type Global = {
  __typename?: 'Global';
  eligibilityManagerAddress: Scalars['Bytes']['output'];
  feeDistributorAddress: Scalars['Bytes']['output'];
  fees: Fee;
  id: Scalars['ID']['output'];
  inventoryStakingAddress: Scalars['Bytes']['output'];
  nftxVaultFactory: Scalars['Bytes']['output'];
  totalHoldings: Scalars['BigInt']['output'];
  treasuryAddress: Scalars['Bytes']['output'];
};

export type Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
  eligibilityManagerAddress?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  eligibilityManagerAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  eligibilityManagerAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  feeDistributorAddress?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  feeDistributorAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeDistributorAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  fees?: InputMaybe<Scalars['String']['input']>;
  fees_?: InputMaybe<Fee_Filter>;
  fees_contains?: InputMaybe<Scalars['String']['input']>;
  fees_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_ends_with?: InputMaybe<Scalars['String']['input']>;
  fees_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_gt?: InputMaybe<Scalars['String']['input']>;
  fees_gte?: InputMaybe<Scalars['String']['input']>;
  fees_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fees_lt?: InputMaybe<Scalars['String']['input']>;
  fees_lte?: InputMaybe<Scalars['String']['input']>;
  fees_not?: InputMaybe<Scalars['String']['input']>;
  fees_not_contains?: InputMaybe<Scalars['String']['input']>;
  fees_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fees_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fees_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fees_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_starts_with?: InputMaybe<Scalars['String']['input']>;
  fees_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  inventoryStakingAddress?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  inventoryStakingAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  inventoryStakingAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftxVaultFactory?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_gt?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_gte?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftxVaultFactory_lt?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_lte?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_not?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nftxVaultFactory_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
  totalHoldings?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHoldings_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  treasuryAddress?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  treasuryAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Global_OrderBy {
  EligibilityManagerAddress = 'eligibilityManagerAddress',
  FeeDistributorAddress = 'feeDistributorAddress',
  Fees = 'fees',
  FeesId = 'fees__id',
  FeesMintFee = 'fees__mintFee',
  FeesRedeemFee = 'fees__redeemFee',
  FeesSwapFee = 'fees__swapFee',
  Id = 'id',
  InventoryStakingAddress = 'inventoryStakingAddress',
  NftxVaultFactory = 'nftxVaultFactory',
  TotalHoldings = 'totalHoldings',
  TreasuryAddress = 'treasuryAddress'
}

export type Holding = {
  __typename?: 'Holding';
  amount: Scalars['BigInt']['output'];
  dateAdded: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  tokenId: Scalars['BigInt']['output'];
  vault: Vault;
};

export type Holding_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Holding_Filter>>>;
  dateAdded?: InputMaybe<Scalars['BigInt']['input']>;
  dateAdded_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dateAdded_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dateAdded_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dateAdded_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dateAdded_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dateAdded_not?: InputMaybe<Scalars['BigInt']['input']>;
  dateAdded_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Holding_Filter>>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Holding_OrderBy {
  Amount = 'amount',
  DateAdded = 'dateAdded',
  Id = 'id',
  TokenId = 'tokenId',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryPool = {
  __typename?: 'InventoryPool';
  dividendToken: Token;
  id: Scalars['ID']['output'];
  rewardToken: Token;
  stakingToken: Token;
  vault: Vault;
};

export type InventoryPool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<InventoryPool_Filter>>>;
  dividendToken?: InputMaybe<Scalars['String']['input']>;
  dividendToken_?: InputMaybe<Token_Filter>;
  dividendToken_contains?: InputMaybe<Scalars['String']['input']>;
  dividendToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_gt?: InputMaybe<Scalars['String']['input']>;
  dividendToken_gte?: InputMaybe<Scalars['String']['input']>;
  dividendToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dividendToken_lt?: InputMaybe<Scalars['String']['input']>;
  dividendToken_lte?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dividendToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<InventoryPool_Filter>>>;
  rewardToken?: InputMaybe<Scalars['String']['input']>;
  rewardToken_?: InputMaybe<Token_Filter>;
  rewardToken_contains?: InputMaybe<Scalars['String']['input']>;
  rewardToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_gt?: InputMaybe<Scalars['String']['input']>;
  rewardToken_gte?: InputMaybe<Scalars['String']['input']>;
  rewardToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardToken_lt?: InputMaybe<Scalars['String']['input']>;
  rewardToken_lte?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken?: InputMaybe<Scalars['String']['input']>;
  stakingToken_?: InputMaybe<Token_Filter>;
  stakingToken_contains?: InputMaybe<Scalars['String']['input']>;
  stakingToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_gt?: InputMaybe<Scalars['String']['input']>;
  stakingToken_gte?: InputMaybe<Scalars['String']['input']>;
  stakingToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakingToken_lt?: InputMaybe<Scalars['String']['input']>;
  stakingToken_lte?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakingToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum InventoryPool_OrderBy {
  DividendToken = 'dividendToken',
  DividendTokenId = 'dividendToken__id',
  DividendTokenName = 'dividendToken__name',
  DividendTokenSymbol = 'dividendToken__symbol',
  DividendTokenTotalSupply = 'dividendToken__totalSupply',
  Id = 'id',
  RewardToken = 'rewardToken',
  RewardTokenId = 'rewardToken__id',
  RewardTokenName = 'rewardToken__name',
  RewardTokenSymbol = 'rewardToken__symbol',
  RewardTokenTotalSupply = 'rewardToken__totalSupply',
  StakingToken = 'stakingToken',
  StakingTokenId = 'stakingToken__id',
  StakingTokenName = 'stakingToken__name',
  StakingTokenSymbol = 'stakingToken__symbol',
  StakingTokenTotalSupply = 'stakingToken__totalSupply',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryPosition = {
  __typename?: 'InventoryPosition';
  amount: Scalars['BigInt']['output'];
  children?: Maybe<Array<InventoryPosition>>;
  closed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isParent: Scalars['Boolean']['output'];
  merged: Scalars['Boolean']['output'];
  nftIds: Array<Scalars['BigInt']['output']>;
  parent?: Maybe<InventoryPosition>;
  positionId: Scalars['BigInt']['output'];
  timeLock: Scalars['Boolean']['output'];
  user: User;
  vault: Vault;
};


export type InventoryPositionChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InventoryPosition_Filter>;
};

export type InventoryPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<InventoryPosition_Filter>>>;
  children_?: InputMaybe<InventoryPosition_Filter>;
  closed?: InputMaybe<Scalars['Boolean']['input']>;
  closed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  closed_not?: InputMaybe<Scalars['Boolean']['input']>;
  closed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  isParent?: InputMaybe<Scalars['Boolean']['input']>;
  isParent_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isParent_not?: InputMaybe<Scalars['Boolean']['input']>;
  isParent_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  merged?: InputMaybe<Scalars['Boolean']['input']>;
  merged_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  merged_not?: InputMaybe<Scalars['Boolean']['input']>;
  merged_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  nftIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<InventoryPosition_Filter>>>;
  parent?: InputMaybe<Scalars['String']['input']>;
  parent_?: InputMaybe<InventoryPosition_Filter>;
  parent_contains?: InputMaybe<Scalars['String']['input']>;
  parent_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  parent_ends_with?: InputMaybe<Scalars['String']['input']>;
  parent_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  parent_gt?: InputMaybe<Scalars['String']['input']>;
  parent_gte?: InputMaybe<Scalars['String']['input']>;
  parent_in?: InputMaybe<Array<Scalars['String']['input']>>;
  parent_lt?: InputMaybe<Scalars['String']['input']>;
  parent_lte?: InputMaybe<Scalars['String']['input']>;
  parent_not?: InputMaybe<Scalars['String']['input']>;
  parent_not_contains?: InputMaybe<Scalars['String']['input']>;
  parent_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  parent_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  parent_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  parent_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  parent_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  parent_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  parent_starts_with?: InputMaybe<Scalars['String']['input']>;
  parent_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeLock?: InputMaybe<Scalars['Boolean']['input']>;
  timeLock_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  timeLock_not?: InputMaybe<Scalars['Boolean']['input']>;
  timeLock_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum InventoryPosition_OrderBy {
  Amount = 'amount',
  Children = 'children',
  Closed = 'closed',
  Id = 'id',
  IsParent = 'isParent',
  Merged = 'merged',
  NftIds = 'nftIds',
  Parent = 'parent',
  ParentAmount = 'parent__amount',
  ParentClosed = 'parent__closed',
  ParentId = 'parent__id',
  ParentIsParent = 'parent__isParent',
  ParentMerged = 'parent__merged',
  ParentPositionId = 'parent__positionId',
  ParentTimeLock = 'parent__timeLock',
  PositionId = 'positionId',
  TimeLock = 'timeLock',
  User = 'user',
  UserId = 'user__id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type Manager = {
  __typename?: 'Manager';
  id: Scalars['ID']['output'];
  vaults: Array<Vault>;
};


export type ManagerVaultsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Vault_Filter>;
};

export type Manager_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Manager_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Manager_Filter>>>;
  vaults_?: InputMaybe<Vault_Filter>;
};

export enum Manager_OrderBy {
  Id = 'id',
  Vaults = 'vaults'
}

export type Mint = ActivityEvent & {
  __typename?: 'Mint';
  date: Scalars['BigInt']['output'];
  feeReceipt: FeeReceipt;
  id: Scalars['ID']['output'];
  nftIds?: Maybe<Array<Scalars['BigInt']['output']>>;
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  user: User;
  vault: Vault;
};

export type Mint_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Mint_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeReceipt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_?: InputMaybe<FeeReceipt_Filter>;
  feeReceipt_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_lt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_lte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nftIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Mint_Filter>>>;
  source?: InputMaybe<Scalars['Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['Bytes']['input']>;
  source_not?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<ActivityEventType>;
  type_in?: InputMaybe<Array<ActivityEventType>>;
  type_not?: InputMaybe<ActivityEventType>;
  type_not_in?: InputMaybe<Array<ActivityEventType>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Mint_OrderBy {
  Date = 'date',
  FeeReceipt = 'feeReceipt',
  FeeReceiptDate = 'feeReceipt__date',
  FeeReceiptId = 'feeReceipt__id',
  Id = 'id',
  NftIds = 'nftIds',
  Source = 'source',
  Type = 'type',
  User = 'user',
  UserId = 'user__id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pool = {
  __typename?: 'Pool';
  deployBlock: Scalars['BigInt']['output'];
  dividendToken: Token;
  id: Scalars['ID']['output'];
  rewardToken: Token;
  stakingToken: Token;
  totalRewards: Scalars['BigInt']['output'];
  vault: Vault;
};

export type Pool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  deployBlock?: InputMaybe<Scalars['BigInt']['input']>;
  deployBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deployBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deployBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deployBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deployBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deployBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  deployBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dividendToken?: InputMaybe<Scalars['String']['input']>;
  dividendToken_?: InputMaybe<Token_Filter>;
  dividendToken_contains?: InputMaybe<Scalars['String']['input']>;
  dividendToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_gt?: InputMaybe<Scalars['String']['input']>;
  dividendToken_gte?: InputMaybe<Scalars['String']['input']>;
  dividendToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dividendToken_lt?: InputMaybe<Scalars['String']['input']>;
  dividendToken_lte?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dividendToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dividendToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  dividendToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  rewardToken?: InputMaybe<Scalars['String']['input']>;
  rewardToken_?: InputMaybe<Token_Filter>;
  rewardToken_contains?: InputMaybe<Scalars['String']['input']>;
  rewardToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_gt?: InputMaybe<Scalars['String']['input']>;
  rewardToken_gte?: InputMaybe<Scalars['String']['input']>;
  rewardToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardToken_lt?: InputMaybe<Scalars['String']['input']>;
  rewardToken_lte?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  rewardToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken?: InputMaybe<Scalars['String']['input']>;
  stakingToken_?: InputMaybe<Token_Filter>;
  stakingToken_contains?: InputMaybe<Scalars['String']['input']>;
  stakingToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_gt?: InputMaybe<Scalars['String']['input']>;
  stakingToken_gte?: InputMaybe<Scalars['String']['input']>;
  stakingToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakingToken_lt?: InputMaybe<Scalars['String']['input']>;
  stakingToken_lte?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakingToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakingToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  stakingToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Pool_OrderBy {
  DeployBlock = 'deployBlock',
  DividendToken = 'dividendToken',
  DividendTokenId = 'dividendToken__id',
  DividendTokenName = 'dividendToken__name',
  DividendTokenSymbol = 'dividendToken__symbol',
  DividendTokenTotalSupply = 'dividendToken__totalSupply',
  Id = 'id',
  RewardToken = 'rewardToken',
  RewardTokenId = 'rewardToken__id',
  RewardTokenName = 'rewardToken__name',
  RewardTokenSymbol = 'rewardToken__symbol',
  RewardTokenTotalSupply = 'rewardToken__totalSupply',
  StakingToken = 'stakingToken',
  StakingTokenId = 'stakingToken__id',
  StakingTokenName = 'stakingToken__name',
  StakingTokenSymbol = 'stakingToken__symbol',
  StakingTokenTotalSupply = 'stakingToken__totalSupply',
  TotalRewards = 'totalRewards',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  activityEvent?: Maybe<ActivityEvent>;
  activityEvents: Array<ActivityEvent>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  eligibilityModule?: Maybe<EligibilityModule>;
  eligibilityModules: Array<EligibilityModule>;
  feature?: Maybe<Feature>;
  features: Array<Feature>;
  fee?: Maybe<Fee>;
  feeReceipt?: Maybe<FeeReceipt>;
  feeReceipts: Array<FeeReceipt>;
  feeReceiver?: Maybe<FeeReceiver>;
  feeReceivers: Array<FeeReceiver>;
  feeTransfer?: Maybe<FeeTransfer>;
  feeTransfers: Array<FeeTransfer>;
  fees: Array<Fee>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  holding?: Maybe<Holding>;
  holdings: Array<Holding>;
  inventoryPool?: Maybe<InventoryPool>;
  inventoryPools: Array<InventoryPool>;
  inventoryPosition?: Maybe<InventoryPosition>;
  inventoryPositions: Array<InventoryPosition>;
  manager?: Maybe<Manager>;
  managers: Array<Manager>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  redeem?: Maybe<Redeem>;
  redeems: Array<Redeem>;
  simpleFeeReceiver?: Maybe<SimpleFeeReceiver>;
  simpleFeeReceivers: Array<SimpleFeeReceiver>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaultCreator?: Maybe<VaultCreator>;
  vaultCreators: Array<VaultCreator>;
  vaultToAddressLookup?: Maybe<VaultToAddressLookup>;
  vaultToAddressLookups: Array<VaultToAddressLookup>;
  vaults: Array<Vault>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryActivityEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryActivityEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ActivityEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ActivityEvent_Filter>;
};


export type QueryAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};


export type QueryEligibilityModuleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEligibilityModulesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EligibilityModule_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EligibilityModule_Filter>;
};


export type QueryFeatureArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeaturesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Feature_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Feature_Filter>;
};


export type QueryFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeeReceiptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeeReceiptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeReceipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeReceipt_Filter>;
};


export type QueryFeeReceiverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeeReceiversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeReceiver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeReceiver_Filter>;
};


export type QueryFeeTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeeTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeTransfer_Filter>;
};


export type QueryFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Fee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Fee_Filter>;
};


export type QueryGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type QueryHoldingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHoldingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Holding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Holding_Filter>;
};


export type QueryInventoryPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPool_Filter>;
};


export type QueryInventoryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPosition_Filter>;
};


export type QueryManagerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryManagersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Manager_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Manager_Filter>;
};


export type QueryMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};


export type QueryPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};


export type QueryRedeemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRedeemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Redeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Redeem_Filter>;
};


export type QuerySimpleFeeReceiverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySimpleFeeReceiversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SimpleFeeReceiver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SimpleFeeReceiver_Filter>;
};


export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type QueryVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultCreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultCreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultCreator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultCreator_Filter>;
};


export type QueryVaultToAddressLookupArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultToAddressLookupsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultToAddressLookup_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultToAddressLookup_Filter>;
};


export type QueryVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type Redeem = ActivityEvent & {
  __typename?: 'Redeem';
  date: Scalars['BigInt']['output'];
  feeReceipt: FeeReceipt;
  id: Scalars['ID']['output'];
  nftIds: Array<Scalars['BigInt']['output']>;
  source?: Maybe<Scalars['Bytes']['output']>;
  targetCount: Scalars['BigInt']['output'];
  type: ActivityEventType;
  user: User;
  vault: Vault;
};

export type Redeem_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Redeem_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeReceipt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_?: InputMaybe<FeeReceipt_Filter>;
  feeReceipt_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_lt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_lte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nftIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Redeem_Filter>>>;
  source?: InputMaybe<Scalars['Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['Bytes']['input']>;
  source_not?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targetCount?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  targetCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  type?: InputMaybe<ActivityEventType>;
  type_in?: InputMaybe<Array<ActivityEventType>>;
  type_not?: InputMaybe<ActivityEventType>;
  type_not_in?: InputMaybe<Array<ActivityEventType>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Redeem_OrderBy {
  Date = 'date',
  FeeReceipt = 'feeReceipt',
  FeeReceiptDate = 'feeReceipt__date',
  FeeReceiptId = 'feeReceipt__id',
  Id = 'id',
  NftIds = 'nftIds',
  Source = 'source',
  TargetCount = 'targetCount',
  Type = 'type',
  User = 'user',
  UserId = 'user__id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type SimpleFeeReceiver = {
  __typename?: 'SimpleFeeReceiver';
  allocPoint: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  receiver: Scalars['Bytes']['output'];
};

export type SimpleFeeReceiver_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allocPoint?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocPoint_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocPoint_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<SimpleFeeReceiver_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<SimpleFeeReceiver_Filter>>>;
  receiver?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiver_lt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_lte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum SimpleFeeReceiver_OrderBy {
  AllocPoint = 'allocPoint',
  Id = 'id',
  Receiver = 'receiver'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  activityEvent?: Maybe<ActivityEvent>;
  activityEvents: Array<ActivityEvent>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  eligibilityModule?: Maybe<EligibilityModule>;
  eligibilityModules: Array<EligibilityModule>;
  feature?: Maybe<Feature>;
  features: Array<Feature>;
  fee?: Maybe<Fee>;
  feeReceipt?: Maybe<FeeReceipt>;
  feeReceipts: Array<FeeReceipt>;
  feeReceiver?: Maybe<FeeReceiver>;
  feeReceivers: Array<FeeReceiver>;
  feeTransfer?: Maybe<FeeTransfer>;
  feeTransfers: Array<FeeTransfer>;
  fees: Array<Fee>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  holding?: Maybe<Holding>;
  holdings: Array<Holding>;
  inventoryPool?: Maybe<InventoryPool>;
  inventoryPools: Array<InventoryPool>;
  inventoryPosition?: Maybe<InventoryPosition>;
  inventoryPositions: Array<InventoryPosition>;
  manager?: Maybe<Manager>;
  managers: Array<Manager>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  redeem?: Maybe<Redeem>;
  redeems: Array<Redeem>;
  simpleFeeReceiver?: Maybe<SimpleFeeReceiver>;
  simpleFeeReceivers: Array<SimpleFeeReceiver>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaultCreator?: Maybe<VaultCreator>;
  vaultCreators: Array<VaultCreator>;
  vaultToAddressLookup?: Maybe<VaultToAddressLookup>;
  vaultToAddressLookups: Array<VaultToAddressLookup>;
  vaults: Array<Vault>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionActivityEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionActivityEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ActivityEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ActivityEvent_Filter>;
};


export type SubscriptionAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};


export type SubscriptionEligibilityModuleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEligibilityModulesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EligibilityModule_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EligibilityModule_Filter>;
};


export type SubscriptionFeatureArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeaturesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Feature_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Feature_Filter>;
};


export type SubscriptionFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeeReceiptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeeReceiptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeReceipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeReceipt_Filter>;
};


export type SubscriptionFeeReceiverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeeReceiversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeReceiver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeReceiver_Filter>;
};


export type SubscriptionFeeTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeeTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeTransfer_Filter>;
};


export type SubscriptionFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Fee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Fee_Filter>;
};


export type SubscriptionGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type SubscriptionHoldingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHoldingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Holding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Holding_Filter>;
};


export type SubscriptionInventoryPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPool_Filter>;
};


export type SubscriptionInventoryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPosition_Filter>;
};


export type SubscriptionManagerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionManagersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Manager_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Manager_Filter>;
};


export type SubscriptionMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};


export type SubscriptionPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};


export type SubscriptionRedeemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRedeemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Redeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Redeem_Filter>;
};


export type SubscriptionSimpleFeeReceiverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSimpleFeeReceiversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SimpleFeeReceiver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SimpleFeeReceiver_Filter>;
};


export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type SubscriptionVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultCreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultCreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultCreator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultCreator_Filter>;
};


export type SubscriptionVaultToAddressLookupArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultToAddressLookupsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultToAddressLookup_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultToAddressLookup_Filter>;
};


export type SubscriptionVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type Swap = ActivityEvent & {
  __typename?: 'Swap';
  date: Scalars['BigInt']['output'];
  feeReceipt: FeeReceipt;
  id: Scalars['ID']['output'];
  mintedIds: Array<Scalars['BigInt']['output']>;
  source?: Maybe<Scalars['Bytes']['output']>;
  specificIds: Array<Scalars['BigInt']['output']>;
  targetCount: Scalars['BigInt']['output'];
  type: ActivityEventType;
  user: User;
  vault: Vault;
};

export type Swap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeReceipt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_?: InputMaybe<FeeReceipt_Filter>;
  feeReceipt_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_gte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_lt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_lte?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeReceipt_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mintedIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintedIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintedIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintedIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintedIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintedIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  source?: InputMaybe<Scalars['Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['Bytes']['input']>;
  source_not?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  specificIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  specificIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  specificIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  specificIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  specificIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  specificIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  targetCount?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  targetCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  targetCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  type?: InputMaybe<ActivityEventType>;
  type_in?: InputMaybe<Array<ActivityEventType>>;
  type_not?: InputMaybe<ActivityEventType>;
  type_not_in?: InputMaybe<Array<ActivityEventType>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Swap_OrderBy {
  Date = 'date',
  FeeReceipt = 'feeReceipt',
  FeeReceiptDate = 'feeReceipt__date',
  FeeReceiptId = 'feeReceipt__id',
  Id = 'id',
  MintedIds = 'mintedIds',
  Source = 'source',
  SpecificIds = 'specificIds',
  TargetCount = 'targetCount',
  Type = 'type',
  User = 'user',
  UserId = 'user__id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type Token = {
  __typename?: 'Token';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Token_OrderBy {
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  mints: Array<Mint>;
  redeems: Array<Redeem>;
};


export type UserMintsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Mint_Filter>;
};


export type UserRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Redeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Redeem_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mints_?: InputMaybe<Mint_Filter>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  redeems_?: InputMaybe<Redeem_Filter>;
};

export enum User_OrderBy {
  Id = 'id',
  Mints = 'mints',
  Redeems = 'redeems'
}

export type Vault = {
  __typename?: 'Vault';
  allocTotal: Scalars['BigInt']['output'];
  allowAllItems?: Maybe<Scalars['Boolean']['output']>;
  asset: Asset;
  createdAt: Scalars['BigInt']['output'];
  createdBy?: Maybe<VaultCreator>;
  eligibilityModule?: Maybe<EligibilityModule>;
  features: Feature;
  feeReceipts: Array<FeeReceipt>;
  feeReceivers: Array<FeeReceiver>;
  fees: Fee;
  holdings: Array<Holding>;
  id: Scalars['ID']['output'];
  inventoryStakingPool?: Maybe<InventoryPool>;
  is1155?: Maybe<Scalars['Boolean']['output']>;
  isFinalized?: Maybe<Scalars['Boolean']['output']>;
  manager?: Maybe<Manager>;
  mints: Array<Mint>;
  redeems: Array<Redeem>;
  shutdownDate: Scalars['BigInt']['output'];
  swaps: Array<Swap>;
  token: Token;
  totalFees: Scalars['BigInt']['output'];
  totalHoldings: Scalars['BigInt']['output'];
  totalMints: Scalars['BigInt']['output'];
  totalRedeems: Scalars['BigInt']['output'];
  totalSwaps: Scalars['BigInt']['output'];
  treasuryAlloc: Scalars['BigInt']['output'];
  usesFactoryFees: Scalars['Boolean']['output'];
  vaultId: Scalars['BigInt']['output'];
};


export type VaultFeeReceiptsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeReceipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FeeReceipt_Filter>;
};


export type VaultFeeReceiversArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeReceiver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FeeReceiver_Filter>;
};


export type VaultHoldingsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Holding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Holding_Filter>;
};


export type VaultMintsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Mint_Filter>;
};


export type VaultRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Redeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Redeem_Filter>;
};


export type VaultSwapsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Swap_Filter>;
};

export type VaultCreator = {
  __typename?: 'VaultCreator';
  id: Scalars['ID']['output'];
  vaults: Array<Vault>;
};


export type VaultCreatorVaultsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Vault_Filter>;
};

export type VaultCreator_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultCreator_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultCreator_Filter>>>;
  vaults_?: InputMaybe<Vault_Filter>;
};

export enum VaultCreator_OrderBy {
  Id = 'id',
  Vaults = 'vaults'
}

export type VaultToAddressLookup = {
  __typename?: 'VaultToAddressLookup';
  id: Scalars['ID']['output'];
  vaultAddress: Scalars['Bytes']['output'];
};

export type VaultToAddressLookup_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultToAddressLookup_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultToAddressLookup_Filter>>>;
  vaultAddress?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vaultAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  vaultAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum VaultToAddressLookup_OrderBy {
  Id = 'id',
  VaultAddress = 'vaultAddress'
}

export type Vault_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allocTotal?: InputMaybe<Scalars['BigInt']['input']>;
  allocTotal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocTotal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocTotal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocTotal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocTotal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocTotal_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocTotal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allowAllItems?: InputMaybe<Scalars['Boolean']['input']>;
  allowAllItems_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  allowAllItems_not?: InputMaybe<Scalars['Boolean']['input']>;
  allowAllItems_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Vault_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<Asset_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  createdBy_?: InputMaybe<VaultCreator_Filter>;
  createdBy_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  createdBy_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdBy_gt?: InputMaybe<Scalars['String']['input']>;
  createdBy_gte?: InputMaybe<Scalars['String']['input']>;
  createdBy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  createdBy_lt?: InputMaybe<Scalars['String']['input']>;
  createdBy_lte?: InputMaybe<Scalars['String']['input']>;
  createdBy_not?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  createdBy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdBy_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_?: InputMaybe<EligibilityModule_Filter>;
  eligibilityModule_contains?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_ends_with?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_gt?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_gte?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eligibilityModule_lt?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_lte?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_not?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_not_contains?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eligibilityModule_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_starts_with?: InputMaybe<Scalars['String']['input']>;
  eligibilityModule_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Scalars['String']['input']>;
  features_?: InputMaybe<Feature_Filter>;
  features_contains?: InputMaybe<Scalars['String']['input']>;
  features_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  features_ends_with?: InputMaybe<Scalars['String']['input']>;
  features_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  features_gt?: InputMaybe<Scalars['String']['input']>;
  features_gte?: InputMaybe<Scalars['String']['input']>;
  features_in?: InputMaybe<Array<Scalars['String']['input']>>;
  features_lt?: InputMaybe<Scalars['String']['input']>;
  features_lte?: InputMaybe<Scalars['String']['input']>;
  features_not?: InputMaybe<Scalars['String']['input']>;
  features_not_contains?: InputMaybe<Scalars['String']['input']>;
  features_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  features_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  features_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  features_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  features_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  features_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  features_starts_with?: InputMaybe<Scalars['String']['input']>;
  features_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feeReceipts_?: InputMaybe<FeeReceipt_Filter>;
  feeReceivers_?: InputMaybe<FeeReceiver_Filter>;
  fees?: InputMaybe<Scalars['String']['input']>;
  fees_?: InputMaybe<Fee_Filter>;
  fees_contains?: InputMaybe<Scalars['String']['input']>;
  fees_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_ends_with?: InputMaybe<Scalars['String']['input']>;
  fees_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_gt?: InputMaybe<Scalars['String']['input']>;
  fees_gte?: InputMaybe<Scalars['String']['input']>;
  fees_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fees_lt?: InputMaybe<Scalars['String']['input']>;
  fees_lte?: InputMaybe<Scalars['String']['input']>;
  fees_not?: InputMaybe<Scalars['String']['input']>;
  fees_not_contains?: InputMaybe<Scalars['String']['input']>;
  fees_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fees_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fees_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fees_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fees_starts_with?: InputMaybe<Scalars['String']['input']>;
  fees_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  holdings_?: InputMaybe<Holding_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  inventoryStakingPool?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_?: InputMaybe<InventoryPool_Filter>;
  inventoryStakingPool_contains?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_gt?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_gte?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  inventoryStakingPool_lt?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_lte?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_not?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  inventoryStakingPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  inventoryStakingPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  is1155?: InputMaybe<Scalars['Boolean']['input']>;
  is1155_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is1155_not?: InputMaybe<Scalars['Boolean']['input']>;
  is1155_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isFinalized?: InputMaybe<Scalars['Boolean']['input']>;
  isFinalized_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isFinalized_not?: InputMaybe<Scalars['Boolean']['input']>;
  isFinalized_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  manager?: InputMaybe<Scalars['String']['input']>;
  manager_?: InputMaybe<Manager_Filter>;
  manager_contains?: InputMaybe<Scalars['String']['input']>;
  manager_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_ends_with?: InputMaybe<Scalars['String']['input']>;
  manager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_gt?: InputMaybe<Scalars['String']['input']>;
  manager_gte?: InputMaybe<Scalars['String']['input']>;
  manager_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manager_lt?: InputMaybe<Scalars['String']['input']>;
  manager_lte?: InputMaybe<Scalars['String']['input']>;
  manager_not?: InputMaybe<Scalars['String']['input']>;
  manager_not_contains?: InputMaybe<Scalars['String']['input']>;
  manager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  manager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manager_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  manager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_starts_with?: InputMaybe<Scalars['String']['input']>;
  manager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  mints_?: InputMaybe<Mint_Filter>;
  or?: InputMaybe<Array<InputMaybe<Vault_Filter>>>;
  redeems_?: InputMaybe<Redeem_Filter>;
  shutdownDate?: InputMaybe<Scalars['BigInt']['input']>;
  shutdownDate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shutdownDate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shutdownDate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shutdownDate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shutdownDate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shutdownDate_not?: InputMaybe<Scalars['BigInt']['input']>;
  shutdownDate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  swaps_?: InputMaybe<Swap_Filter>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHoldings?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHoldings_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalHoldings_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMints?: InputMaybe<Scalars['BigInt']['input']>;
  totalMints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMints_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMints_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalMints_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRedeems?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeems_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeems_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeems_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRedeems_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeems_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeems_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeems_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSwaps?: InputMaybe<Scalars['BigInt']['input']>;
  totalSwaps_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSwaps_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSwaps_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSwaps_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSwaps_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSwaps_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSwaps_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  treasuryAlloc?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAlloc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAlloc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAlloc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  treasuryAlloc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAlloc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAlloc_not?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAlloc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usesFactoryFees?: InputMaybe<Scalars['Boolean']['input']>;
  usesFactoryFees_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  usesFactoryFees_not?: InputMaybe<Scalars['Boolean']['input']>;
  usesFactoryFees_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  vaultId?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vaultId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_not?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Vault_OrderBy {
  AllocTotal = 'allocTotal',
  AllowAllItems = 'allowAllItems',
  Asset = 'asset',
  AssetId = 'asset__id',
  AssetName = 'asset__name',
  AssetSymbol = 'asset__symbol',
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  CreatedById = 'createdBy__id',
  EligibilityModule = 'eligibilityModule',
  EligibilityModuleEligibilityManager = 'eligibilityModule__eligibilityManager',
  EligibilityModuleFinalized = 'eligibilityModule__finalized',
  EligibilityModuleFinalizedOnDeploy = 'eligibilityModule__finalizedOnDeploy',
  EligibilityModuleId = 'eligibilityModule__id',
  EligibilityModuleName = 'eligibilityModule__name',
  Features = 'features',
  FeaturesEnableMint = 'features__enableMint',
  FeaturesEnableRedeem = 'features__enableRedeem',
  FeaturesEnableSwap = 'features__enableSwap',
  FeaturesId = 'features__id',
  FeeReceipts = 'feeReceipts',
  FeeReceivers = 'feeReceivers',
  Fees = 'fees',
  FeesId = 'fees__id',
  FeesMintFee = 'fees__mintFee',
  FeesRedeemFee = 'fees__redeemFee',
  FeesSwapFee = 'fees__swapFee',
  Holdings = 'holdings',
  Id = 'id',
  InventoryStakingPool = 'inventoryStakingPool',
  InventoryStakingPoolId = 'inventoryStakingPool__id',
  Is1155 = 'is1155',
  IsFinalized = 'isFinalized',
  Manager = 'manager',
  ManagerId = 'manager__id',
  Mints = 'mints',
  Redeems = 'redeems',
  ShutdownDate = 'shutdownDate',
  Swaps = 'swaps',
  Token = 'token',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  TokenTotalSupply = 'token__totalSupply',
  TotalFees = 'totalFees',
  TotalHoldings = 'totalHoldings',
  TotalMints = 'totalMints',
  TotalRedeems = 'totalRedeems',
  TotalSwaps = 'totalSwaps',
  TreasuryAlloc = 'treasuryAlloc',
  UsesFactoryFees = 'usesFactoryFees',
  VaultId = 'vaultId'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}
