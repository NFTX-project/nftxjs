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

export type Account = {
  __typename?: 'Account';
  ERC20approvalsOwner: Array<Erc20Approval>;
  ERC20approvalsSpender: Array<Erc20Approval>;
  ERC20balances: Array<Erc20Balance>;
  ERC20transferFromEvent: Array<Erc20Transfer>;
  ERC20transferToEvent: Array<Erc20Transfer>;
  asERC20?: Maybe<Erc20Contract>;
  asVaultAsset?: Maybe<VaultAsset>;
  id: Scalars['ID']['output'];
};


export type AccountErc20approvalsOwnerArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Approval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Approval_Filter>;
};


export type AccountErc20approvalsSpenderArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Approval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Approval_Filter>;
};


export type AccountErc20balancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Balance_Filter>;
};


export type AccountErc20transferFromEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};


export type AccountErc20transferToEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};

export type Account_Filter = {
  ERC20approvalsOwner_?: InputMaybe<Erc20Approval_Filter>;
  ERC20approvalsSpender_?: InputMaybe<Erc20Approval_Filter>;
  ERC20balances_?: InputMaybe<Erc20Balance_Filter>;
  ERC20transferFromEvent_?: InputMaybe<Erc20Transfer_Filter>;
  ERC20transferToEvent_?: InputMaybe<Erc20Transfer_Filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  asERC20?: InputMaybe<Scalars['String']['input']>;
  asERC20_?: InputMaybe<Erc20Contract_Filter>;
  asERC20_contains?: InputMaybe<Scalars['String']['input']>;
  asERC20_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_gt?: InputMaybe<Scalars['String']['input']>;
  asERC20_gte?: InputMaybe<Scalars['String']['input']>;
  asERC20_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC20_lt?: InputMaybe<Scalars['String']['input']>;
  asERC20_lte?: InputMaybe<Scalars['String']['input']>;
  asERC20_not?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_contains?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC20_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_?: InputMaybe<VaultAsset_Filter>;
  asVaultAsset_contains?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_gt?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_gte?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asVaultAsset_lt?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_lte?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asVaultAsset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
};

export enum Account_OrderBy {
  Erc20approvalsOwner = 'ERC20approvalsOwner',
  Erc20approvalsSpender = 'ERC20approvalsSpender',
  Erc20balances = 'ERC20balances',
  Erc20transferFromEvent = 'ERC20transferFromEvent',
  Erc20transferToEvent = 'ERC20transferToEvent',
  AsErc20 = 'asERC20',
  AsErc20Decimals = 'asERC20__decimals',
  AsErc20Id = 'asERC20__id',
  AsErc20Name = 'asERC20__name',
  AsErc20Symbol = 'asERC20__symbol',
  AsVaultAsset = 'asVaultAsset',
  AsVaultAssetId = 'asVaultAsset__id',
  AsVaultAssetType = 'asVaultAsset__type',
  AsVaultAssetVaultId = 'asVaultAsset__vaultId',
  Id = 'id'
}

export type ActivityEvent = {
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export enum ActivityEventType {
  AddLiquidity = 'AddLiquidity',
  BuyNfts = 'BuyNFTS',
  IncreaseLiquidity = 'IncreaseLiquidity',
  InventoryCombinePositions = 'InventoryCombinePositions',
  InventoryDeposit = 'InventoryDeposit',
  InventoryDepositWithNft = 'InventoryDepositWithNFT',
  InventoryIncreasePosition = 'InventoryIncreasePosition',
  InventoryTransfer = 'InventoryTransfer',
  InventoryWithdraw = 'InventoryWithdraw',
  Mint = 'Mint',
  Redeem = 'Redeem',
  RemoveLiquidity = 'RemoveLiquidity',
  SellNfts = 'SellNFTS',
  Swap = 'Swap',
  VaultCreated = 'VaultCreated',
  VaultFeeUpdate = 'VaultFeeUpdate',
  VaultNameChange = 'VaultNameChange',
  VaultPublished = 'VaultPublished',
  VaultShutdown = 'VaultShutdown',
  ZapBuy = 'ZapBuy',
  ZapSell = 'ZapSell',
  ZapSwap = 'ZapSwap'
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type AddLiquidity = ActivityEvent & {
  __typename?: 'AddLiquidity';
  ammPosition: Scalars['BigInt']['output'];
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  nfts: Array<Scalars['BigInt']['output']>;
  pool: Scalars['Bytes']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vTokens: Scalars['BigInt']['output'];
  vault: Vault;
};

export type AddLiquidity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  ammPosition?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ammPosition_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_not?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<AddLiquidity_Filter>>>;
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
  nfts?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AddLiquidity_Filter>>>;
  pool?: InputMaybe<Scalars['Bytes']['input']>;
  pool_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pool_gt?: InputMaybe<Scalars['Bytes']['input']>;
  pool_gte?: InputMaybe<Scalars['Bytes']['input']>;
  pool_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pool_lt?: InputMaybe<Scalars['Bytes']['input']>;
  pool_lte?: InputMaybe<Scalars['Bytes']['input']>;
  pool_not?: InputMaybe<Scalars['Bytes']['input']>;
  pool_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  vTokens?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export enum AddLiquidity_OrderBy {
  AmmPosition = 'ammPosition',
  Date = 'date',
  Id = 'id',
  Nfts = 'nfts',
  Pool = 'pool',
  Source = 'source',
  Type = 'type',
  VTokens = 'vTokens',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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

export type BuyNfts = ActivityEvent & {
  __typename?: 'BuyNFTS';
  date: Scalars['BigInt']['output'];
  ethSpent: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  nftCount: Scalars['BigInt']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type BuyNfts_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BuyNfts_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethSpent?: InputMaybe<Scalars['BigInt']['input']>;
  ethSpent_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ethSpent_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ethSpent_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethSpent_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ethSpent_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ethSpent_not?: InputMaybe<Scalars['BigInt']['input']>;
  ethSpent_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nftCount?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BuyNfts_Filter>>>;
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

export enum BuyNfts_OrderBy {
  Date = 'date',
  EthSpent = 'ethSpent',
  Id = 'id',
  NftCount = 'nftCount',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type DustReturned = {
  __typename?: 'DustReturned';
  ethAmount: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  linkedEvents?: Maybe<Array<ActivityEvent>>;
  to: Scalars['String']['output'];
  vTokenAmount: Scalars['BigDecimal']['output'];
};


export type DustReturnedLinkedEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ActivityEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ActivityEvent_Filter>;
};

export type DustReturned_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DustReturned_Filter>>>;
  ethAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethAmount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethAmount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethAmount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ethAmount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethAmount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethAmount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  linkedEvents?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEvents_?: InputMaybe<ActivityEvent_Filter>;
  linkedEvents_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEvents_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEvents_not?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEvents_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEvents_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DustReturned_Filter>>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vTokenAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  vTokenAmount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  vTokenAmount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  vTokenAmount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  vTokenAmount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  vTokenAmount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  vTokenAmount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  vTokenAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum DustReturned_OrderBy {
  EthAmount = 'ethAmount',
  Id = 'id',
  LinkedEvents = 'linkedEvents',
  To = 'to',
  VTokenAmount = 'vTokenAmount'
}

export type Erc20Approval = {
  __typename?: 'ERC20Approval';
  contract: Erc20Contract;
  id: Scalars['ID']['output'];
  owner: Account;
  spender: Account;
  value: Scalars['BigDecimal']['output'];
  valueExact: Scalars['BigInt']['output'];
};

export type Erc20Approval_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc20Approval_Filter>>>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc20Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc20Approval_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender?: InputMaybe<Scalars['String']['input']>;
  spender_?: InputMaybe<Account_Filter>;
  spender_contains?: InputMaybe<Scalars['String']['input']>;
  spender_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_ends_with?: InputMaybe<Scalars['String']['input']>;
  spender_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_gt?: InputMaybe<Scalars['String']['input']>;
  spender_gte?: InputMaybe<Scalars['String']['input']>;
  spender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  spender_lt?: InputMaybe<Scalars['String']['input']>;
  spender_lte?: InputMaybe<Scalars['String']['input']>;
  spender_not?: InputMaybe<Scalars['String']['input']>;
  spender_not_contains?: InputMaybe<Scalars['String']['input']>;
  spender_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  spender_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  spender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  spender_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_starts_with?: InputMaybe<Scalars['String']['input']>;
  spender_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['BigDecimal']['input']>;
  valueExact?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  valueExact_lt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_lte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum Erc20Approval_OrderBy {
  Contract = 'contract',
  ContractDecimals = 'contract__decimals',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSymbol = 'contract__symbol',
  Id = 'id',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Spender = 'spender',
  SpenderId = 'spender__id',
  Value = 'value',
  ValueExact = 'valueExact'
}

export type Erc20Balance = {
  __typename?: 'ERC20Balance';
  account?: Maybe<Account>;
  contract: Erc20Contract;
  id: Scalars['ID']['output'];
  transferFromEvent: Array<Erc20Transfer>;
  transferToEvent: Array<Erc20Transfer>;
  value: Scalars['BigDecimal']['output'];
  valueExact: Scalars['BigInt']['output'];
};


export type Erc20BalanceTransferFromEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};


export type Erc20BalanceTransferToEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};

export type Erc20Balance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Erc20Balance_Filter>>>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc20Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc20Balance_Filter>>>;
  transferFromEvent_?: InputMaybe<Erc20Transfer_Filter>;
  transferToEvent_?: InputMaybe<Erc20Transfer_Filter>;
  value?: InputMaybe<Scalars['BigDecimal']['input']>;
  valueExact?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  valueExact_lt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_lte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum Erc20Balance_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  Contract = 'contract',
  ContractDecimals = 'contract__decimals',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSymbol = 'contract__symbol',
  Id = 'id',
  TransferFromEvent = 'transferFromEvent',
  TransferToEvent = 'transferToEvent',
  Value = 'value',
  ValueExact = 'valueExact'
}

export type Erc20Contract = {
  __typename?: 'ERC20Contract';
  approvals: Array<Erc20Approval>;
  asAccount: Account;
  asVaultAsset: VaultAsset;
  balances: Array<Erc20Balance>;
  decimals: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  totalSupply: Erc20Balance;
  transfers: Array<Erc20Transfer>;
};


export type Erc20ContractApprovalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Approval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Approval_Filter>;
};


export type Erc20ContractBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Balance_Filter>;
};


export type Erc20ContractTransfersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};

export type Erc20Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc20Contract_Filter>>>;
  approvals_?: InputMaybe<Erc20Approval_Filter>;
  asAccount?: InputMaybe<Scalars['String']['input']>;
  asAccount_?: InputMaybe<Account_Filter>;
  asAccount_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_gt?: InputMaybe<Scalars['String']['input']>;
  asAccount_gte?: InputMaybe<Scalars['String']['input']>;
  asAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt?: InputMaybe<Scalars['String']['input']>;
  asAccount_lte?: InputMaybe<Scalars['String']['input']>;
  asAccount_not?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_?: InputMaybe<VaultAsset_Filter>;
  asVaultAsset_contains?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_gt?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_gte?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asVaultAsset_lt?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_lte?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asVaultAsset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asVaultAsset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  balances_?: InputMaybe<Erc20Balance_Filter>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<Erc20Contract_Filter>>>;
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
  totalSupply?: InputMaybe<Scalars['String']['input']>;
  totalSupply_?: InputMaybe<Erc20Balance_Filter>;
  totalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_ends_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_starts_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transfers_?: InputMaybe<Erc20Transfer_Filter>;
};

export enum Erc20Contract_OrderBy {
  Approvals = 'approvals',
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  AsVaultAsset = 'asVaultAsset',
  AsVaultAssetId = 'asVaultAsset__id',
  AsVaultAssetType = 'asVaultAsset__type',
  AsVaultAssetVaultId = 'asVaultAsset__vaultId',
  Balances = 'balances',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
  TotalSupplyId = 'totalSupply__id',
  TotalSupplyValue = 'totalSupply__value',
  TotalSupplyValueExact = 'totalSupply__valueExact',
  Transfers = 'transfers'
}

export type Erc20Transfer = Event & {
  __typename?: 'ERC20Transfer';
  contract: Erc20Contract;
  emitter: Account;
  from?: Maybe<Account>;
  fromBalance?: Maybe<Erc20Balance>;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  to?: Maybe<Account>;
  toBalance?: Maybe<Erc20Balance>;
  transaction: Transaction;
  value: Scalars['BigDecimal']['output'];
  valueExact: Scalars['BigInt']['output'];
};

export type Erc20Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc20Transfer_Filter>>>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc20Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter?: InputMaybe<Scalars['String']['input']>;
  emitter_?: InputMaybe<Account_Filter>;
  emitter_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_gt?: InputMaybe<Scalars['String']['input']>;
  emitter_gte?: InputMaybe<Scalars['String']['input']>;
  emitter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt?: InputMaybe<Scalars['String']['input']>;
  emitter_lte?: InputMaybe<Scalars['String']['input']>;
  emitter_not?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  fromBalance?: InputMaybe<Scalars['String']['input']>;
  fromBalance_?: InputMaybe<Erc20Balance_Filter>;
  fromBalance_contains?: InputMaybe<Scalars['String']['input']>;
  fromBalance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_ends_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_gt?: InputMaybe<Scalars['String']['input']>;
  fromBalance_gte?: InputMaybe<Scalars['String']['input']>;
  fromBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromBalance_lt?: InputMaybe<Scalars['String']['input']>;
  fromBalance_lte?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromBalance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_starts_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_?: InputMaybe<Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc20Transfer_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  toBalance?: InputMaybe<Scalars['String']['input']>;
  toBalance_?: InputMaybe<Erc20Balance_Filter>;
  toBalance_contains?: InputMaybe<Scalars['String']['input']>;
  toBalance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_ends_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_gt?: InputMaybe<Scalars['String']['input']>;
  toBalance_gte?: InputMaybe<Scalars['String']['input']>;
  toBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toBalance_lt?: InputMaybe<Scalars['String']['input']>;
  toBalance_lte?: InputMaybe<Scalars['String']['input']>;
  toBalance_not?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toBalance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_starts_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['BigDecimal']['input']>;
  valueExact?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  valueExact_lt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_lte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum Erc20Transfer_OrderBy {
  Contract = 'contract',
  ContractDecimals = 'contract__decimals',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSymbol = 'contract__symbol',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  From = 'from',
  FromBalance = 'fromBalance',
  FromBalanceId = 'fromBalance__id',
  FromBalanceValue = 'fromBalance__value',
  FromBalanceValueExact = 'fromBalance__valueExact',
  FromId = 'from__id',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  ToBalance = 'toBalance',
  ToBalanceId = 'toBalance__id',
  ToBalanceValue = 'toBalance__value',
  ToBalanceValueExact = 'toBalance__valueExact',
  ToId = 'to__id',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  Value = 'value',
  ValueExact = 'valueExact'
}

export type EarlyWithdrawPenaltyFee = {
  __typename?: 'EarlyWithdrawPenaltyFee';
  amount: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  position: InventoryPosition;
  vault: Vault;
};

export type EarlyWithdrawPenaltyFee_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<EarlyWithdrawPenaltyFee_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<EarlyWithdrawPenaltyFee_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<InventoryPosition_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum EarlyWithdrawPenaltyFee_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Position = 'position',
  PositionAmount = 'position__amount',
  PositionClosed = 'position__closed',
  PositionId = 'position__id',
  PositionIsParent = 'position__isParent',
  PositionMerged = 'position__merged',
  PositionPositionId = 'position__positionId',
  PositionTimeLock = 'position__timeLock',
  PositionTimeLockUntil = 'position__timeLockUntil',
  PositionVTokenTimeLockUntil = 'position__vTokenTimeLockUntil',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type Earning = {
  __typename?: 'Earning';
  amount?: Maybe<Scalars['BigDecimal']['output']>;
  feeReceipt: VaultInventoryFee;
  id: Scalars['ID']['output'];
  positionFee: InventoryPositionFee;
  vault: Vault;
};

export type Earning_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Earning_Filter>>>;
  feeReceipt?: InputMaybe<Scalars['String']['input']>;
  feeReceipt_?: InputMaybe<VaultInventoryFee_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<Earning_Filter>>>;
  positionFee?: InputMaybe<Scalars['String']['input']>;
  positionFee_?: InputMaybe<InventoryPositionFee_Filter>;
  positionFee_contains?: InputMaybe<Scalars['String']['input']>;
  positionFee_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_ends_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_gt?: InputMaybe<Scalars['String']['input']>;
  positionFee_gte?: InputMaybe<Scalars['String']['input']>;
  positionFee_in?: InputMaybe<Array<Scalars['String']['input']>>;
  positionFee_lt?: InputMaybe<Scalars['String']['input']>;
  positionFee_lte?: InputMaybe<Scalars['String']['input']>;
  positionFee_not?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_contains?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  positionFee_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_starts_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum Earning_OrderBy {
  Amount = 'amount',
  FeeReceipt = 'feeReceipt',
  FeeReceiptAmount = 'feeReceipt__amount',
  FeeReceiptId = 'feeReceipt__id',
  FeeReceiptTimestamp = 'feeReceipt__timestamp',
  Id = 'id',
  PositionFee = 'positionFee',
  PositionFeeAmount = 'positionFee__amount',
  PositionFeeId = 'positionFee__id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

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

export type Event = {
  emitter: Account;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type Event_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  emitter?: InputMaybe<Scalars['String']['input']>;
  emitter_?: InputMaybe<Account_Filter>;
  emitter_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_gt?: InputMaybe<Scalars['String']['input']>;
  emitter_gte?: InputMaybe<Scalars['String']['input']>;
  emitter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt?: InputMaybe<Scalars['String']['input']>;
  emitter_lte?: InputMaybe<Scalars['String']['input']>;
  emitter_not?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Event_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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
  amount: Scalars['BigDecimal']['output'];
  feeReceipt: FeeReceipt;
  id: Scalars['ID']['output'];
  to: Scalars['Bytes']['output'];
};

export type FeeTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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
  distributionPaused: Scalars['Boolean']['output'];
  earlyWithdrawPenalty: Scalars['BigInt']['output'];
  eligibilityManagerAddress: Scalars['Bytes']['output'];
  feeDistributorAddress: Scalars['Bytes']['output'];
  fees: Fee;
  id: Scalars['ID']['output'];
  inventoryStakingAddress: Scalars['Bytes']['output'];
  isInventoryPaused: Scalars['Boolean']['output'];
  nftxRouter: Scalars['Bytes']['output'];
  nftxVaultFactory: Scalars['Bytes']['output'];
  rewardFeeTier: Scalars['Int']['output'];
  timelock: Scalars['BigInt']['output'];
  totalHoldings: Scalars['BigInt']['output'];
  treasuryAddress: Scalars['Bytes']['output'];
};

export type Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
  distributionPaused?: InputMaybe<Scalars['Boolean']['input']>;
  distributionPaused_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  distributionPaused_not?: InputMaybe<Scalars['Boolean']['input']>;
  distributionPaused_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  earlyWithdrawPenalty?: InputMaybe<Scalars['BigInt']['input']>;
  earlyWithdrawPenalty_gt?: InputMaybe<Scalars['BigInt']['input']>;
  earlyWithdrawPenalty_gte?: InputMaybe<Scalars['BigInt']['input']>;
  earlyWithdrawPenalty_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earlyWithdrawPenalty_lt?: InputMaybe<Scalars['BigInt']['input']>;
  earlyWithdrawPenalty_lte?: InputMaybe<Scalars['BigInt']['input']>;
  earlyWithdrawPenalty_not?: InputMaybe<Scalars['BigInt']['input']>;
  earlyWithdrawPenalty_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  isInventoryPaused?: InputMaybe<Scalars['Boolean']['input']>;
  isInventoryPaused_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isInventoryPaused_not?: InputMaybe<Scalars['Boolean']['input']>;
  isInventoryPaused_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  nftxRouter?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_gt?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_gte?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftxRouter_lt?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_lte?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_not?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nftxRouter_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  rewardFeeTier?: InputMaybe<Scalars['Int']['input']>;
  rewardFeeTier_gt?: InputMaybe<Scalars['Int']['input']>;
  rewardFeeTier_gte?: InputMaybe<Scalars['Int']['input']>;
  rewardFeeTier_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  rewardFeeTier_lt?: InputMaybe<Scalars['Int']['input']>;
  rewardFeeTier_lte?: InputMaybe<Scalars['Int']['input']>;
  rewardFeeTier_not?: InputMaybe<Scalars['Int']['input']>;
  rewardFeeTier_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timelock?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timelock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  DistributionPaused = 'distributionPaused',
  EarlyWithdrawPenalty = 'earlyWithdrawPenalty',
  EligibilityManagerAddress = 'eligibilityManagerAddress',
  FeeDistributorAddress = 'feeDistributorAddress',
  Fees = 'fees',
  FeesId = 'fees__id',
  FeesMintFee = 'fees__mintFee',
  FeesRedeemFee = 'fees__redeemFee',
  FeesSwapFee = 'fees__swapFee',
  Id = 'id',
  InventoryStakingAddress = 'inventoryStakingAddress',
  IsInventoryPaused = 'isInventoryPaused',
  NftxRouter = 'nftxRouter',
  NftxVaultFactory = 'nftxVaultFactory',
  RewardFeeTier = 'rewardFeeTier',
  Timelock = 'timelock',
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type IncreaseLiquidity = ActivityEvent & {
  __typename?: 'IncreaseLiquidity';
  ammPosition: Scalars['BigInt']['output'];
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  nfts: Array<Scalars['BigInt']['output']>;
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vTokens: Scalars['BigInt']['output'];
  vault: Vault;
};

export type IncreaseLiquidity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  ammPosition?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ammPosition_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_not?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<IncreaseLiquidity_Filter>>>;
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
  nfts?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<IncreaseLiquidity_Filter>>>;
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
  vTokens?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export enum IncreaseLiquidity_OrderBy {
  AmmPosition = 'ammPosition',
  Date = 'date',
  Id = 'id',
  Nfts = 'nfts',
  Source = 'source',
  Type = 'type',
  VTokens = 'vTokens',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryCombinePositions = ActivityEvent & {
  __typename?: 'InventoryCombinePositions';
  childPositions: Array<InventoryPosition>;
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  parentPosition: InventoryPosition;
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};


export type InventoryCombinePositionsChildPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InventoryPosition_Filter>;
};

export type InventoryCombinePositions_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<InventoryCombinePositions_Filter>>>;
  childPositions?: InputMaybe<Array<Scalars['String']['input']>>;
  childPositions_?: InputMaybe<InventoryPosition_Filter>;
  childPositions_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  childPositions_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  childPositions_not?: InputMaybe<Array<Scalars['String']['input']>>;
  childPositions_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  childPositions_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<InventoryCombinePositions_Filter>>>;
  parentPosition?: InputMaybe<Scalars['String']['input']>;
  parentPosition_?: InputMaybe<InventoryPosition_Filter>;
  parentPosition_contains?: InputMaybe<Scalars['String']['input']>;
  parentPosition_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  parentPosition_ends_with?: InputMaybe<Scalars['String']['input']>;
  parentPosition_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  parentPosition_gt?: InputMaybe<Scalars['String']['input']>;
  parentPosition_gte?: InputMaybe<Scalars['String']['input']>;
  parentPosition_in?: InputMaybe<Array<Scalars['String']['input']>>;
  parentPosition_lt?: InputMaybe<Scalars['String']['input']>;
  parentPosition_lte?: InputMaybe<Scalars['String']['input']>;
  parentPosition_not?: InputMaybe<Scalars['String']['input']>;
  parentPosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  parentPosition_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  parentPosition_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  parentPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  parentPosition_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  parentPosition_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  parentPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  parentPosition_starts_with?: InputMaybe<Scalars['String']['input']>;
  parentPosition_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum InventoryCombinePositions_OrderBy {
  ChildPositions = 'childPositions',
  Date = 'date',
  Id = 'id',
  ParentPosition = 'parentPosition',
  ParentPositionAmount = 'parentPosition__amount',
  ParentPositionClosed = 'parentPosition__closed',
  ParentPositionId = 'parentPosition__id',
  ParentPositionIsParent = 'parentPosition__isParent',
  ParentPositionMerged = 'parentPosition__merged',
  ParentPositionPositionId = 'parentPosition__positionId',
  ParentPositionTimeLock = 'parentPosition__timeLock',
  ParentPositionTimeLockUntil = 'parentPosition__timeLockUntil',
  ParentPositionVTokenTimeLockUntil = 'parentPosition__vTokenTimeLockUntil',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryDeposit = ActivityEvent & {
  __typename?: 'InventoryDeposit';
  amount: Scalars['BigInt']['output'];
  date: Scalars['BigInt']['output'];
  forceTimeLock: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  position: InventoryPosition;
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type InventoryDepositWithNft = ActivityEvent & {
  __typename?: 'InventoryDepositWithNFT';
  amounts: Array<Scalars['BigInt']['output']>;
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  nfts: Array<Scalars['BigInt']['output']>;
  position: InventoryPosition;
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type InventoryDepositWithNft_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amounts?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amounts_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<InventoryDepositWithNft_Filter>>>;
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
  nfts?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nfts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<InventoryDepositWithNft_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<InventoryPosition_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum InventoryDepositWithNft_OrderBy {
  Amounts = 'amounts',
  Date = 'date',
  Id = 'id',
  Nfts = 'nfts',
  Position = 'position',
  PositionAmount = 'position__amount',
  PositionClosed = 'position__closed',
  PositionId = 'position__id',
  PositionIsParent = 'position__isParent',
  PositionMerged = 'position__merged',
  PositionPositionId = 'position__positionId',
  PositionTimeLock = 'position__timeLock',
  PositionTimeLockUntil = 'position__timeLockUntil',
  PositionVTokenTimeLockUntil = 'position__vTokenTimeLockUntil',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryDeposit_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<InventoryDeposit_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  forceTimeLock?: InputMaybe<Scalars['Boolean']['input']>;
  forceTimeLock_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  forceTimeLock_not?: InputMaybe<Scalars['Boolean']['input']>;
  forceTimeLock_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<InventoryDeposit_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<InventoryPosition_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum InventoryDeposit_OrderBy {
  Amount = 'amount',
  Date = 'date',
  ForceTimeLock = 'forceTimeLock',
  Id = 'id',
  Position = 'position',
  PositionAmount = 'position__amount',
  PositionClosed = 'position__closed',
  PositionId = 'position__id',
  PositionIsParent = 'position__isParent',
  PositionMerged = 'position__merged',
  PositionPositionId = 'position__positionId',
  PositionTimeLock = 'position__timeLock',
  PositionTimeLockUntil = 'position__timeLockUntil',
  PositionVTokenTimeLockUntil = 'position__vTokenTimeLockUntil',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryIncreasePosition = ActivityEvent & {
  __typename?: 'InventoryIncreasePosition';
  amount: Scalars['BigInt']['output'];
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  position: InventoryPosition;
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type InventoryIncreasePosition_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<InventoryIncreasePosition_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<InventoryIncreasePosition_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<InventoryPosition_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum InventoryIncreasePosition_OrderBy {
  Amount = 'amount',
  Date = 'date',
  Id = 'id',
  Position = 'position',
  PositionAmount = 'position__amount',
  PositionClosed = 'position__closed',
  PositionId = 'position__id',
  PositionIsParent = 'position__isParent',
  PositionMerged = 'position__merged',
  PositionPositionId = 'position__positionId',
  PositionTimeLock = 'position__timeLock',
  PositionTimeLockUntil = 'position__timeLockUntil',
  PositionVTokenTimeLockUntil = 'position__vTokenTimeLockUntil',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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
  amount: Scalars['BigDecimal']['output'];
  children?: Maybe<Array<InventoryPosition>>;
  closed: Scalars['Boolean']['output'];
  earlyWithdrawPenaltyFee?: Maybe<EarlyWithdrawPenaltyFee>;
  id: Scalars['ID']['output'];
  isParent: Scalars['Boolean']['output'];
  merged: Scalars['Boolean']['output'];
  parent?: Maybe<InventoryPosition>;
  positionId: Scalars['BigInt']['output'];
  timeLock: Scalars['Boolean']['output'];
  timeLockUntil: Scalars['BigInt']['output'];
  user: User;
  vTokenTimeLockUntil: Scalars['BigInt']['output'];
  vault: Vault;
};


export type InventoryPositionChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InventoryPosition_Filter>;
};

export type InventoryPositionFee = {
  __typename?: 'InventoryPositionFee';
  amount: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  position: InventoryPosition;
  vault: Vault;
};

export type InventoryPositionFee_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<InventoryPositionFee_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<InventoryPositionFee_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<InventoryPosition_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum InventoryPositionFee_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Position = 'position',
  PositionAmount = 'position__amount',
  PositionClosed = 'position__closed',
  PositionId = 'position__id',
  PositionIsParent = 'position__isParent',
  PositionMerged = 'position__merged',
  PositionPositionId = 'position__positionId',
  PositionTimeLock = 'position__timeLock',
  PositionTimeLockUntil = 'position__timeLockUntil',
  PositionVTokenTimeLockUntil = 'position__vTokenTimeLockUntil',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryPositionPayout = {
  __typename?: 'InventoryPositionPayout';
  amount: Scalars['BigDecimal']['output'];
  id: Scalars['Bytes']['output'];
  positionFee: InventoryPositionFee;
  timestamp: Scalars['BigInt']['output'];
};

export type InventoryPositionPayout_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<InventoryPositionPayout_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<InventoryPositionPayout_Filter>>>;
  positionFee?: InputMaybe<Scalars['String']['input']>;
  positionFee_?: InputMaybe<InventoryPositionFee_Filter>;
  positionFee_contains?: InputMaybe<Scalars['String']['input']>;
  positionFee_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_ends_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_gt?: InputMaybe<Scalars['String']['input']>;
  positionFee_gte?: InputMaybe<Scalars['String']['input']>;
  positionFee_in?: InputMaybe<Array<Scalars['String']['input']>>;
  positionFee_lt?: InputMaybe<Scalars['String']['input']>;
  positionFee_lte?: InputMaybe<Scalars['String']['input']>;
  positionFee_not?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_contains?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  positionFee_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionFee_starts_with?: InputMaybe<Scalars['String']['input']>;
  positionFee_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum InventoryPositionPayout_OrderBy {
  Amount = 'amount',
  Id = 'id',
  PositionFee = 'positionFee',
  PositionFeeAmount = 'positionFee__amount',
  PositionFeeId = 'positionFee__id',
  Timestamp = 'timestamp'
}

export type InventoryPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<InventoryPosition_Filter>>>;
  children_?: InputMaybe<InventoryPosition_Filter>;
  closed?: InputMaybe<Scalars['Boolean']['input']>;
  closed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  closed_not?: InputMaybe<Scalars['Boolean']['input']>;
  closed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  earlyWithdrawPenaltyFee_?: InputMaybe<EarlyWithdrawPenaltyFee_Filter>;
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
  timeLockUntil?: InputMaybe<Scalars['BigInt']['input']>;
  timeLockUntil_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timeLockUntil_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timeLockUntil_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeLockUntil_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timeLockUntil_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timeLockUntil_not?: InputMaybe<Scalars['BigInt']['input']>;
  timeLockUntil_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  vTokenTimeLockUntil?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenTimeLockUntil_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenTimeLockUntil_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenTimeLockUntil_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vTokenTimeLockUntil_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenTimeLockUntil_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenTimeLockUntil_not?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenTimeLockUntil_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  EarlyWithdrawPenaltyFee = 'earlyWithdrawPenaltyFee',
  EarlyWithdrawPenaltyFeeAmount = 'earlyWithdrawPenaltyFee__amount',
  EarlyWithdrawPenaltyFeeId = 'earlyWithdrawPenaltyFee__id',
  Id = 'id',
  IsParent = 'isParent',
  Merged = 'merged',
  Parent = 'parent',
  ParentAmount = 'parent__amount',
  ParentClosed = 'parent__closed',
  ParentId = 'parent__id',
  ParentIsParent = 'parent__isParent',
  ParentMerged = 'parent__merged',
  ParentPositionId = 'parent__positionId',
  ParentTimeLock = 'parent__timeLock',
  ParentTimeLockUntil = 'parent__timeLockUntil',
  ParentVTokenTimeLockUntil = 'parent__vTokenTimeLockUntil',
  PositionId = 'positionId',
  TimeLock = 'timeLock',
  TimeLockUntil = 'timeLockUntil',
  User = 'user',
  UserId = 'user__id',
  VTokenTimeLockUntil = 'vTokenTimeLockUntil',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryTransfer = ActivityEvent & {
  __typename?: 'InventoryTransfer';
  date: Scalars['BigInt']['output'];
  from: Account;
  id: Scalars['ID']['output'];
  position: InventoryPosition;
  source?: Maybe<Scalars['Bytes']['output']>;
  to: Account;
  type: ActivityEventType;
  vault: Vault;
};

export type InventoryTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<InventoryTransfer_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_?: InputMaybe<Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<InventoryTransfer_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<InventoryPosition_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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
  to?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum InventoryTransfer_OrderBy {
  Date = 'date',
  From = 'from',
  FromId = 'from__id',
  Id = 'id',
  Position = 'position',
  PositionAmount = 'position__amount',
  PositionClosed = 'position__closed',
  PositionId = 'position__id',
  PositionIsParent = 'position__isParent',
  PositionMerged = 'position__merged',
  PositionPositionId = 'position__positionId',
  PositionTimeLock = 'position__timeLock',
  PositionTimeLockUntil = 'position__timeLockUntil',
  PositionVTokenTimeLockUntil = 'position__vTokenTimeLockUntil',
  Source = 'source',
  To = 'to',
  ToId = 'to__id',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type InventoryWithdraw = ActivityEvent & {
  __typename?: 'InventoryWithdraw';
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  position: InventoryPosition;
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vTokenAmount: Scalars['BigInt']['output'];
  vTokenShares: Scalars['BigInt']['output'];
  vault: Vault;
  wethAmount: Scalars['BigInt']['output'];
};

export type InventoryWithdraw_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<InventoryWithdraw_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<InventoryWithdraw_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<InventoryPosition_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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
  vTokenAmount?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vTokenAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vTokenShares?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenShares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenShares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenShares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vTokenShares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenShares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenShares_not?: InputMaybe<Scalars['BigInt']['input']>;
  vTokenShares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  wethAmount?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  wethAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum InventoryWithdraw_OrderBy {
  Date = 'date',
  Id = 'id',
  Position = 'position',
  PositionAmount = 'position__amount',
  PositionClosed = 'position__closed',
  PositionId = 'position__id',
  PositionIsParent = 'position__isParent',
  PositionMerged = 'position__merged',
  PositionPositionId = 'position__positionId',
  PositionTimeLock = 'position__timeLock',
  PositionTimeLockUntil = 'position__timeLockUntil',
  PositionVTokenTimeLockUntil = 'position__vTokenTimeLockUntil',
  Source = 'source',
  Type = 'type',
  VTokenAmount = 'vTokenAmount',
  VTokenShares = 'vTokenShares',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId',
  WethAmount = 'wethAmount'
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
  feeReceipt?: Maybe<FeeReceipt>;
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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

export type PremiumPaid = {
  __typename?: 'PremiumPaid';
  amount: Scalars['BigDecimal']['output'];
  date: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  to: User;
  vault: Vault;
};

export type PremiumPaid_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<PremiumPaid_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PremiumPaid_Filter>>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<User_Filter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum PremiumPaid_OrderBy {
  Amount = 'amount',
  Date = 'date',
  Id = 'id',
  To = 'to',
  ToId = 'to__id',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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
  account?: Maybe<Account>;
  accounts: Array<Account>;
  activityEvent?: Maybe<ActivityEvent>;
  activityEvents: Array<ActivityEvent>;
  addLiquidities: Array<AddLiquidity>;
  addLiquidity?: Maybe<AddLiquidity>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  buyNFTS?: Maybe<BuyNfts>;
  buyNFTSs: Array<BuyNfts>;
  dustReturned?: Maybe<DustReturned>;
  dustReturneds: Array<DustReturned>;
  earlyWithdrawPenaltyFee?: Maybe<EarlyWithdrawPenaltyFee>;
  earlyWithdrawPenaltyFees: Array<EarlyWithdrawPenaltyFee>;
  earning?: Maybe<Earning>;
  earnings: Array<Earning>;
  eligibilityModule?: Maybe<EligibilityModule>;
  eligibilityModules: Array<EligibilityModule>;
  erc20Approval?: Maybe<Erc20Approval>;
  erc20Approvals: Array<Erc20Approval>;
  erc20Balance?: Maybe<Erc20Balance>;
  erc20Balances: Array<Erc20Balance>;
  erc20Contract?: Maybe<Erc20Contract>;
  erc20Contracts: Array<Erc20Contract>;
  erc20Transfer?: Maybe<Erc20Transfer>;
  erc20Transfers: Array<Erc20Transfer>;
  event?: Maybe<Event>;
  events: Array<Event>;
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
  increaseLiquidities: Array<IncreaseLiquidity>;
  increaseLiquidity?: Maybe<IncreaseLiquidity>;
  inventoryCombinePositions: Array<InventoryCombinePositions>;
  inventoryDeposit?: Maybe<InventoryDeposit>;
  inventoryDepositWithNFT?: Maybe<InventoryDepositWithNft>;
  inventoryDepositWithNFTs: Array<InventoryDepositWithNft>;
  inventoryDeposits: Array<InventoryDeposit>;
  inventoryIncreasePosition?: Maybe<InventoryIncreasePosition>;
  inventoryIncreasePositions: Array<InventoryIncreasePosition>;
  inventoryPosition?: Maybe<InventoryPosition>;
  inventoryPositionFee?: Maybe<InventoryPositionFee>;
  inventoryPositionFees: Array<InventoryPositionFee>;
  inventoryPositionPayout?: Maybe<InventoryPositionPayout>;
  inventoryPositionPayouts: Array<InventoryPositionPayout>;
  inventoryPositions: Array<InventoryPosition>;
  inventoryTransfer?: Maybe<InventoryTransfer>;
  inventoryTransfers: Array<InventoryTransfer>;
  inventoryWithdraw?: Maybe<InventoryWithdraw>;
  inventoryWithdraws: Array<InventoryWithdraw>;
  manager?: Maybe<Manager>;
  managers: Array<Manager>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  premiumPaid?: Maybe<PremiumPaid>;
  premiumPaids: Array<PremiumPaid>;
  redeem?: Maybe<Redeem>;
  redeems: Array<Redeem>;
  removeLiquidities: Array<RemoveLiquidity>;
  removeLiquidity?: Maybe<RemoveLiquidity>;
  sellNFTS?: Maybe<SellNfts>;
  sellNFTSs: Array<SellNfts>;
  simpleFeeReceiver?: Maybe<SimpleFeeReceiver>;
  simpleFeeReceivers: Array<SimpleFeeReceiver>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaultAsset?: Maybe<VaultAsset>;
  vaultAssets: Array<VaultAsset>;
  vaultCreated?: Maybe<VaultCreated>;
  vaultCreateds: Array<VaultCreated>;
  vaultCreator?: Maybe<VaultCreator>;
  vaultCreators: Array<VaultCreator>;
  vaultFee?: Maybe<VaultFee>;
  vaultFeeUpdate?: Maybe<VaultFeeUpdate>;
  vaultFeeUpdates: Array<VaultFeeUpdate>;
  vaultFees: Array<VaultFee>;
  vaultInventoryFee?: Maybe<VaultInventoryFee>;
  vaultInventoryFees: Array<VaultInventoryFee>;
  vaultLiquidityFee?: Maybe<VaultLiquidityFee>;
  vaultLiquidityFees: Array<VaultLiquidityFee>;
  vaultNameChange?: Maybe<VaultNameChange>;
  vaultNameChanges: Array<VaultNameChange>;
  vaultPublished?: Maybe<VaultPublished>;
  vaultPublisheds: Array<VaultPublished>;
  vaultShutdown?: Maybe<VaultShutdown>;
  vaultShutdowns: Array<VaultShutdown>;
  vaultToAddressLookup?: Maybe<VaultToAddressLookup>;
  vaultToAddressLookups: Array<VaultToAddressLookup>;
  vaults: Array<Vault>;
  zapBuy?: Maybe<ZapBuy>;
  zapBuys: Array<ZapBuy>;
  zapSell?: Maybe<ZapSell>;
  zapSells: Array<ZapSell>;
  zapSwap?: Maybe<ZapSwap>;
  zapSwaps: Array<ZapSwap>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
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


export type QueryAddLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AddLiquidity_Filter>;
};


export type QueryAddLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
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


export type QueryBuyNftsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBuyNftSsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyNfts_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BuyNfts_Filter>;
};


export type QueryDustReturnedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDustReturnedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DustReturned_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DustReturned_Filter>;
};


export type QueryEarlyWithdrawPenaltyFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEarlyWithdrawPenaltyFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EarlyWithdrawPenaltyFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EarlyWithdrawPenaltyFee_Filter>;
};


export type QueryEarningArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEarningsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Earning_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Earning_Filter>;
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


export type QueryErc20ApprovalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc20ApprovalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Approval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Approval_Filter>;
};


export type QueryErc20BalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc20BalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Balance_Filter>;
};


export type QueryErc20ContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc20ContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Contract_Filter>;
};


export type QueryErc20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Transfer_Filter>;
};


export type QueryEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
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


export type QueryIncreaseLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<IncreaseLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IncreaseLiquidity_Filter>;
};


export type QueryIncreaseLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryCombinePositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryCombinePositions_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryCombinePositions_Filter>;
};


export type QueryInventoryDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryDepositWithNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryDepositWithNfTsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryDepositWithNft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryDepositWithNft_Filter>;
};


export type QueryInventoryDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryDeposit_Filter>;
};


export type QueryInventoryIncreasePositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryIncreasePositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryIncreasePosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryIncreasePosition_Filter>;
};


export type QueryInventoryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryPositionFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryPositionFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPositionFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPositionFee_Filter>;
};


export type QueryInventoryPositionPayoutArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryPositionPayoutsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPositionPayout_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPositionPayout_Filter>;
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


export type QueryInventoryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryTransfer_Filter>;
};


export type QueryInventoryWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInventoryWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryWithdraw_Filter>;
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


export type QueryPremiumPaidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPremiumPaidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PremiumPaid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PremiumPaid_Filter>;
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


export type QueryRemoveLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RemoveLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RemoveLiquidity_Filter>;
};


export type QueryRemoveLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySellNftsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySellNftSsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SellNfts_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SellNfts_Filter>;
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


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
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


export type QueryVaultAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultAsset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultAsset_Filter>;
};


export type QueryVaultCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultCreated_Filter>;
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


export type QueryVaultFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultFeeUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultFeeUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultFeeUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultFeeUpdate_Filter>;
};


export type QueryVaultFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultFee_Filter>;
};


export type QueryVaultInventoryFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultInventoryFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultInventoryFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultInventoryFee_Filter>;
};


export type QueryVaultLiquidityFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultLiquidityFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultLiquidityFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultLiquidityFee_Filter>;
};


export type QueryVaultNameChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultNameChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultNameChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultNameChange_Filter>;
};


export type QueryVaultPublishedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultPublishedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultPublished_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultPublished_Filter>;
};


export type QueryVaultShutdownArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultShutdownsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultShutdown_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultShutdown_Filter>;
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


export type QueryZapBuyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryZapBuysArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ZapBuy_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ZapBuy_Filter>;
};


export type QueryZapSellArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryZapSellsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ZapSell_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ZapSell_Filter>;
};


export type QueryZapSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryZapSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ZapSwap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ZapSwap_Filter>;
};

export type Redeem = ActivityEvent & {
  __typename?: 'Redeem';
  date: Scalars['BigInt']['output'];
  feeReceipt?: Maybe<FeeReceipt>;
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type RemoveLiquidity = ActivityEvent & {
  __typename?: 'RemoveLiquidity';
  ammPosition: Scalars['BigInt']['output'];
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vTokens: Scalars['BigInt']['output'];
  vault: Vault;
  wethAmount: Scalars['BigInt']['output'];
};

export type RemoveLiquidity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  ammPosition?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ammPosition_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_not?: InputMaybe<Scalars['BigInt']['input']>;
  ammPosition_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RemoveLiquidity_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<RemoveLiquidity_Filter>>>;
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
  vTokens?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  vTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  wethAmount?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  wethAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  wethAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum RemoveLiquidity_OrderBy {
  AmmPosition = 'ammPosition',
  Date = 'date',
  Id = 'id',
  Source = 'source',
  Type = 'type',
  VTokens = 'vTokens',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId',
  WethAmount = 'wethAmount'
}

export type SellNfts = ActivityEvent & {
  __typename?: 'SellNFTS';
  date: Scalars['BigInt']['output'];
  ethReceived: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  nftCount: Scalars['BigInt']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type SellNfts_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SellNfts_Filter>>>;
  date?: InputMaybe<Scalars['BigInt']['input']>;
  date_gt?: InputMaybe<Scalars['BigInt']['input']>;
  date_gte?: InputMaybe<Scalars['BigInt']['input']>;
  date_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  date_lt?: InputMaybe<Scalars['BigInt']['input']>;
  date_lte?: InputMaybe<Scalars['BigInt']['input']>;
  date_not?: InputMaybe<Scalars['BigInt']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethReceived?: InputMaybe<Scalars['BigInt']['input']>;
  ethReceived_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ethReceived_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ethReceived_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethReceived_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ethReceived_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ethReceived_not?: InputMaybe<Scalars['BigInt']['input']>;
  ethReceived_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nftCount?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  nftCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<SellNfts_Filter>>>;
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

export enum SellNfts_OrderBy {
  Date = 'date',
  EthReceived = 'ethReceived',
  Id = 'id',
  NftCount = 'nftCount',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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
  account?: Maybe<Account>;
  accounts: Array<Account>;
  activityEvent?: Maybe<ActivityEvent>;
  activityEvents: Array<ActivityEvent>;
  addLiquidities: Array<AddLiquidity>;
  addLiquidity?: Maybe<AddLiquidity>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  buyNFTS?: Maybe<BuyNfts>;
  buyNFTSs: Array<BuyNfts>;
  dustReturned?: Maybe<DustReturned>;
  dustReturneds: Array<DustReturned>;
  earlyWithdrawPenaltyFee?: Maybe<EarlyWithdrawPenaltyFee>;
  earlyWithdrawPenaltyFees: Array<EarlyWithdrawPenaltyFee>;
  earning?: Maybe<Earning>;
  earnings: Array<Earning>;
  eligibilityModule?: Maybe<EligibilityModule>;
  eligibilityModules: Array<EligibilityModule>;
  erc20Approval?: Maybe<Erc20Approval>;
  erc20Approvals: Array<Erc20Approval>;
  erc20Balance?: Maybe<Erc20Balance>;
  erc20Balances: Array<Erc20Balance>;
  erc20Contract?: Maybe<Erc20Contract>;
  erc20Contracts: Array<Erc20Contract>;
  erc20Transfer?: Maybe<Erc20Transfer>;
  erc20Transfers: Array<Erc20Transfer>;
  event?: Maybe<Event>;
  events: Array<Event>;
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
  increaseLiquidities: Array<IncreaseLiquidity>;
  increaseLiquidity?: Maybe<IncreaseLiquidity>;
  inventoryCombinePositions: Array<InventoryCombinePositions>;
  inventoryDeposit?: Maybe<InventoryDeposit>;
  inventoryDepositWithNFT?: Maybe<InventoryDepositWithNft>;
  inventoryDepositWithNFTs: Array<InventoryDepositWithNft>;
  inventoryDeposits: Array<InventoryDeposit>;
  inventoryIncreasePosition?: Maybe<InventoryIncreasePosition>;
  inventoryIncreasePositions: Array<InventoryIncreasePosition>;
  inventoryPosition?: Maybe<InventoryPosition>;
  inventoryPositionFee?: Maybe<InventoryPositionFee>;
  inventoryPositionFees: Array<InventoryPositionFee>;
  inventoryPositionPayout?: Maybe<InventoryPositionPayout>;
  inventoryPositionPayouts: Array<InventoryPositionPayout>;
  inventoryPositions: Array<InventoryPosition>;
  inventoryTransfer?: Maybe<InventoryTransfer>;
  inventoryTransfers: Array<InventoryTransfer>;
  inventoryWithdraw?: Maybe<InventoryWithdraw>;
  inventoryWithdraws: Array<InventoryWithdraw>;
  manager?: Maybe<Manager>;
  managers: Array<Manager>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  premiumPaid?: Maybe<PremiumPaid>;
  premiumPaids: Array<PremiumPaid>;
  redeem?: Maybe<Redeem>;
  redeems: Array<Redeem>;
  removeLiquidities: Array<RemoveLiquidity>;
  removeLiquidity?: Maybe<RemoveLiquidity>;
  sellNFTS?: Maybe<SellNfts>;
  sellNFTSs: Array<SellNfts>;
  simpleFeeReceiver?: Maybe<SimpleFeeReceiver>;
  simpleFeeReceivers: Array<SimpleFeeReceiver>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaultAsset?: Maybe<VaultAsset>;
  vaultAssets: Array<VaultAsset>;
  vaultCreated?: Maybe<VaultCreated>;
  vaultCreateds: Array<VaultCreated>;
  vaultCreator?: Maybe<VaultCreator>;
  vaultCreators: Array<VaultCreator>;
  vaultFee?: Maybe<VaultFee>;
  vaultFeeUpdate?: Maybe<VaultFeeUpdate>;
  vaultFeeUpdates: Array<VaultFeeUpdate>;
  vaultFees: Array<VaultFee>;
  vaultInventoryFee?: Maybe<VaultInventoryFee>;
  vaultInventoryFees: Array<VaultInventoryFee>;
  vaultLiquidityFee?: Maybe<VaultLiquidityFee>;
  vaultLiquidityFees: Array<VaultLiquidityFee>;
  vaultNameChange?: Maybe<VaultNameChange>;
  vaultNameChanges: Array<VaultNameChange>;
  vaultPublished?: Maybe<VaultPublished>;
  vaultPublisheds: Array<VaultPublished>;
  vaultShutdown?: Maybe<VaultShutdown>;
  vaultShutdowns: Array<VaultShutdown>;
  vaultToAddressLookup?: Maybe<VaultToAddressLookup>;
  vaultToAddressLookups: Array<VaultToAddressLookup>;
  vaults: Array<Vault>;
  zapBuy?: Maybe<ZapBuy>;
  zapBuys: Array<ZapBuy>;
  zapSell?: Maybe<ZapSell>;
  zapSells: Array<ZapSell>;
  zapSwap?: Maybe<ZapSwap>;
  zapSwaps: Array<ZapSwap>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
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


export type SubscriptionAddLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AddLiquidity_Filter>;
};


export type SubscriptionAddLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
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


export type SubscriptionBuyNftsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBuyNftSsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyNfts_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BuyNfts_Filter>;
};


export type SubscriptionDustReturnedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDustReturnedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DustReturned_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DustReturned_Filter>;
};


export type SubscriptionEarlyWithdrawPenaltyFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEarlyWithdrawPenaltyFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EarlyWithdrawPenaltyFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EarlyWithdrawPenaltyFee_Filter>;
};


export type SubscriptionEarningArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEarningsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Earning_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Earning_Filter>;
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


export type SubscriptionErc20ApprovalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc20ApprovalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Approval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Approval_Filter>;
};


export type SubscriptionErc20BalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc20BalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Balance_Filter>;
};


export type SubscriptionErc20ContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc20ContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Contract_Filter>;
};


export type SubscriptionErc20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Transfer_Filter>;
};


export type SubscriptionEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
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


export type SubscriptionIncreaseLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<IncreaseLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IncreaseLiquidity_Filter>;
};


export type SubscriptionIncreaseLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryCombinePositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryCombinePositions_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryCombinePositions_Filter>;
};


export type SubscriptionInventoryDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryDepositWithNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryDepositWithNfTsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryDepositWithNft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryDepositWithNft_Filter>;
};


export type SubscriptionInventoryDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryDeposit_Filter>;
};


export type SubscriptionInventoryIncreasePositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryIncreasePositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryIncreasePosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryIncreasePosition_Filter>;
};


export type SubscriptionInventoryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryPositionFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryPositionFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPositionFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPositionFee_Filter>;
};


export type SubscriptionInventoryPositionPayoutArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryPositionPayoutsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPositionPayout_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryPositionPayout_Filter>;
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


export type SubscriptionInventoryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryTransfer_Filter>;
};


export type SubscriptionInventoryWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInventoryWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InventoryWithdraw_Filter>;
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


export type SubscriptionPremiumPaidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPremiumPaidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PremiumPaid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PremiumPaid_Filter>;
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


export type SubscriptionRemoveLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RemoveLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RemoveLiquidity_Filter>;
};


export type SubscriptionRemoveLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSellNftsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSellNftSsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SellNfts_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SellNfts_Filter>;
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


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
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


export type SubscriptionVaultAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultAsset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultAsset_Filter>;
};


export type SubscriptionVaultCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultCreated_Filter>;
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


export type SubscriptionVaultFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultFeeUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultFeeUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultFeeUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultFeeUpdate_Filter>;
};


export type SubscriptionVaultFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultFee_Filter>;
};


export type SubscriptionVaultInventoryFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultInventoryFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultInventoryFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultInventoryFee_Filter>;
};


export type SubscriptionVaultLiquidityFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultLiquidityFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultLiquidityFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultLiquidityFee_Filter>;
};


export type SubscriptionVaultNameChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultNameChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultNameChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultNameChange_Filter>;
};


export type SubscriptionVaultPublishedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultPublishedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultPublished_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultPublished_Filter>;
};


export type SubscriptionVaultShutdownArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultShutdownsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultShutdown_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultShutdown_Filter>;
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


export type SubscriptionZapBuyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionZapBuysArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ZapBuy_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ZapBuy_Filter>;
};


export type SubscriptionZapSellArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionZapSellsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ZapSell_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ZapSell_Filter>;
};


export type SubscriptionZapSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionZapSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ZapSwap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ZapSwap_Filter>;
};

export type Swap = ActivityEvent & {
  __typename?: 'Swap';
  date: Scalars['BigInt']['output'];
  feeReceipt?: Maybe<FeeReceipt>;
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
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
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

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Timestamp = 'timestamp'
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
  earlyWithdrawPenaltyFees?: Maybe<Array<EarlyWithdrawPenaltyFee>>;
  eligibilityModule?: Maybe<EligibilityModule>;
  features: Feature;
  feeReceipts: Array<FeeReceipt>;
  feeReceivers: Array<FeeReceiver>;
  fees: Fee;
  holdings: Array<Holding>;
  id: Scalars['ID']['output'];
  inventoryPositions: Array<InventoryPosition>;
  inventoryStakedTotal: Scalars['BigDecimal']['output'];
  is1155?: Maybe<Scalars['Boolean']['output']>;
  isFinalized?: Maybe<Scalars['Boolean']['output']>;
  isNew: Scalars['Boolean']['output'];
  lpPoolAddress?: Maybe<Scalars['Bytes']['output']>;
  manager?: Maybe<Manager>;
  mints: Array<Mint>;
  redeems: Array<Redeem>;
  shutdownDate: Scalars['BigInt']['output'];
  swaps: Array<Swap>;
  token: Token;
  totalEarlyWithdrawFees: Scalars['BigDecimal']['output'];
  totalFees: Scalars['BigDecimal']['output'];
  totalFeesInventory: Scalars['BigDecimal']['output'];
  totalFeesPool: Scalars['BigDecimal']['output'];
  totalFeesQ128: Scalars['BigDecimal']['output'];
  totalHoldings: Scalars['BigInt']['output'];
  totalMints: Scalars['BigInt']['output'];
  totalRedeems: Scalars['BigInt']['output'];
  totalSwaps: Scalars['BigInt']['output'];
  treasuryAlloc: Scalars['BigInt']['output'];
  usesFactoryFees: Scalars['Boolean']['output'];
  vaultId: Scalars['BigInt']['output'];
};


export type VaultEarlyWithdrawPenaltyFeesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EarlyWithdrawPenaltyFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EarlyWithdrawPenaltyFee_Filter>;
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


export type VaultInventoryPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InventoryPosition_Filter>;
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

export type VaultAsset = {
  __typename?: 'VaultAsset';
  asAccount?: Maybe<Account>;
  asERC20?: Maybe<Erc20Contract>;
  id: Scalars['ID']['output'];
  type?: Maybe<Scalars['String']['output']>;
  vaultId?: Maybe<Scalars['BigInt']['output']>;
};

export type VaultAsset_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultAsset_Filter>>>;
  asAccount?: InputMaybe<Scalars['String']['input']>;
  asAccount_?: InputMaybe<Account_Filter>;
  asAccount_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_gt?: InputMaybe<Scalars['String']['input']>;
  asAccount_gte?: InputMaybe<Scalars['String']['input']>;
  asAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt?: InputMaybe<Scalars['String']['input']>;
  asAccount_lte?: InputMaybe<Scalars['String']['input']>;
  asAccount_not?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20?: InputMaybe<Scalars['String']['input']>;
  asERC20_?: InputMaybe<Erc20Contract_Filter>;
  asERC20_contains?: InputMaybe<Scalars['String']['input']>;
  asERC20_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_gt?: InputMaybe<Scalars['String']['input']>;
  asERC20_gte?: InputMaybe<Scalars['String']['input']>;
  asERC20_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC20_lt?: InputMaybe<Scalars['String']['input']>;
  asERC20_lte?: InputMaybe<Scalars['String']['input']>;
  asERC20_not?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_contains?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC20_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC20_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC20_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultAsset_Filter>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_gt?: InputMaybe<Scalars['String']['input']>;
  type_gte?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_lt?: InputMaybe<Scalars['String']['input']>;
  type_lte?: InputMaybe<Scalars['String']['input']>;
  type_not?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultId?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vaultId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_not?: InputMaybe<Scalars['BigInt']['input']>;
  vaultId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum VaultAsset_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  AsErc20 = 'asERC20',
  AsErc20Decimals = 'asERC20__decimals',
  AsErc20Id = 'asERC20__id',
  AsErc20Name = 'asERC20__name',
  AsErc20Symbol = 'asERC20__symbol',
  Id = 'id',
  Type = 'type',
  VaultId = 'vaultId'
}

export type VaultCreated = ActivityEvent & {
  __typename?: 'VaultCreated';
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type VaultCreated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultCreated_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<VaultCreated_Filter>>>;
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

export enum VaultCreated_OrderBy {
  Date = 'date',
  Id = 'id',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

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

export type VaultFee = {
  __typename?: 'VaultFee';
  amount: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
  vault: Vault;
};

export type VaultFeeUpdate = ActivityEvent & {
  __typename?: 'VaultFeeUpdate';
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  mintFee: Scalars['BigInt']['output'];
  redeemFee: Scalars['BigInt']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  swapFee: Scalars['BigInt']['output'];
  type: ActivityEventType;
  vault: Vault;
};

export type VaultFeeUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultFeeUpdate_Filter>>>;
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
  mintFee?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  mintFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultFeeUpdate_Filter>>>;
  redeemFee?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  redeemFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  redeemFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  swapFee?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export enum VaultFeeUpdate_OrderBy {
  Date = 'date',
  Id = 'id',
  MintFee = 'mintFee',
  RedeemFee = 'redeemFee',
  Source = 'source',
  SwapFee = 'swapFee',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type VaultFee_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<VaultFee_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultFee_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export enum VaultFee_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Timestamp = 'timestamp',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type VaultInventoryFee = {
  __typename?: 'VaultInventoryFee';
  amount: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
  vault: Vault;
};

export type VaultInventoryFee_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<VaultInventoryFee_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultInventoryFee_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export enum VaultInventoryFee_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Timestamp = 'timestamp',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type VaultLiquidityFee = {
  __typename?: 'VaultLiquidityFee';
  amount: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
  vault: Vault;
};

export type VaultLiquidityFee_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<VaultLiquidityFee_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultLiquidityFee_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export enum VaultLiquidityFee_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Timestamp = 'timestamp',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type VaultNameChange = ActivityEvent & {
  __typename?: 'VaultNameChange';
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  nameAfter: Scalars['String']['output'];
  nameBefore: Scalars['String']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  symbolAfter: Scalars['String']['output'];
  symbolBefore: Scalars['String']['output'];
  type: ActivityEventType;
  vault: Vault;
};

export type VaultNameChange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultNameChange_Filter>>>;
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
  nameAfter?: InputMaybe<Scalars['String']['input']>;
  nameAfter_contains?: InputMaybe<Scalars['String']['input']>;
  nameAfter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nameAfter_ends_with?: InputMaybe<Scalars['String']['input']>;
  nameAfter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameAfter_gt?: InputMaybe<Scalars['String']['input']>;
  nameAfter_gte?: InputMaybe<Scalars['String']['input']>;
  nameAfter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nameAfter_lt?: InputMaybe<Scalars['String']['input']>;
  nameAfter_lte?: InputMaybe<Scalars['String']['input']>;
  nameAfter_not?: InputMaybe<Scalars['String']['input']>;
  nameAfter_not_contains?: InputMaybe<Scalars['String']['input']>;
  nameAfter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nameAfter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nameAfter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameAfter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nameAfter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nameAfter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameAfter_starts_with?: InputMaybe<Scalars['String']['input']>;
  nameAfter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameBefore?: InputMaybe<Scalars['String']['input']>;
  nameBefore_contains?: InputMaybe<Scalars['String']['input']>;
  nameBefore_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nameBefore_ends_with?: InputMaybe<Scalars['String']['input']>;
  nameBefore_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameBefore_gt?: InputMaybe<Scalars['String']['input']>;
  nameBefore_gte?: InputMaybe<Scalars['String']['input']>;
  nameBefore_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nameBefore_lt?: InputMaybe<Scalars['String']['input']>;
  nameBefore_lte?: InputMaybe<Scalars['String']['input']>;
  nameBefore_not?: InputMaybe<Scalars['String']['input']>;
  nameBefore_not_contains?: InputMaybe<Scalars['String']['input']>;
  nameBefore_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nameBefore_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nameBefore_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameBefore_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nameBefore_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nameBefore_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameBefore_starts_with?: InputMaybe<Scalars['String']['input']>;
  nameBefore_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<VaultNameChange_Filter>>>;
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
  symbolAfter?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_contains?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_gt?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_gte?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbolAfter_lt?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_lte?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_not?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbolAfter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbolAfter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolBefore?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_contains?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_gt?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_gte?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbolBefore_lt?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_lte?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_not?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbolBefore_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbolBefore_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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

export enum VaultNameChange_OrderBy {
  Date = 'date',
  Id = 'id',
  NameAfter = 'nameAfter',
  NameBefore = 'nameBefore',
  Source = 'source',
  SymbolAfter = 'symbolAfter',
  SymbolBefore = 'symbolBefore',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type VaultPublished = ActivityEvent & {
  __typename?: 'VaultPublished';
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type VaultPublished_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultPublished_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<VaultPublished_Filter>>>;
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

export enum VaultPublished_OrderBy {
  Date = 'date',
  Id = 'id',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
}

export type VaultShutdown = ActivityEvent & {
  __typename?: 'VaultShutdown';
  date: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['Bytes']['output']>;
  type: ActivityEventType;
  vault: Vault;
};

export type VaultShutdown_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultShutdown_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<VaultShutdown_Filter>>>;
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

export enum VaultShutdown_OrderBy {
  Date = 'date',
  Id = 'id',
  Source = 'source',
  Type = 'type',
  Vault = 'vault',
  VaultAllocTotal = 'vault__allocTotal',
  VaultAllowAllItems = 'vault__allowAllItems',
  VaultCreatedAt = 'vault__createdAt',
  VaultId = 'vault__id',
  VaultInventoryStakedTotal = 'vault__inventoryStakedTotal',
  VaultIs1155 = 'vault__is1155',
  VaultIsFinalized = 'vault__isFinalized',
  VaultIsNew = 'vault__isNew',
  VaultLpPoolAddress = 'vault__lpPoolAddress',
  VaultShutdownDate = 'vault__shutdownDate',
  VaultTotalEarlyWithdrawFees = 'vault__totalEarlyWithdrawFees',
  VaultTotalFees = 'vault__totalFees',
  VaultTotalFeesInventory = 'vault__totalFeesInventory',
  VaultTotalFeesPool = 'vault__totalFeesPool',
  VaultTotalFeesQ128 = 'vault__totalFeesQ128',
  VaultTotalHoldings = 'vault__totalHoldings',
  VaultTotalMints = 'vault__totalMints',
  VaultTotalRedeems = 'vault__totalRedeems',
  VaultTotalSwaps = 'vault__totalSwaps',
  VaultTreasuryAlloc = 'vault__treasuryAlloc',
  VaultUsesFactoryFees = 'vault__usesFactoryFees',
  VaultVaultId = 'vault__vaultId'
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
  earlyWithdrawPenaltyFees_?: InputMaybe<EarlyWithdrawPenaltyFee_Filter>;
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
  inventoryPositions_?: InputMaybe<InventoryPosition_Filter>;
  inventoryStakedTotal?: InputMaybe<Scalars['BigDecimal']['input']>;
  inventoryStakedTotal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  inventoryStakedTotal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  inventoryStakedTotal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  inventoryStakedTotal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  inventoryStakedTotal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  inventoryStakedTotal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  inventoryStakedTotal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  is1155?: InputMaybe<Scalars['Boolean']['input']>;
  is1155_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is1155_not?: InputMaybe<Scalars['Boolean']['input']>;
  is1155_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isFinalized?: InputMaybe<Scalars['Boolean']['input']>;
  isFinalized_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isFinalized_not?: InputMaybe<Scalars['Boolean']['input']>;
  isFinalized_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isNew_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNew_not?: InputMaybe<Scalars['Boolean']['input']>;
  isNew_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  lpPoolAddress?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lpPoolAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lpPoolAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  totalEarlyWithdrawFees?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalEarlyWithdrawFees_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalEarlyWithdrawFees_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalEarlyWithdrawFees_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalEarlyWithdrawFees_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalEarlyWithdrawFees_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalEarlyWithdrawFees_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalEarlyWithdrawFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFees?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesInventory?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesInventory_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesInventory_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesInventory_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesInventory_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesInventory_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesInventory_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesInventory_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesPool?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesPool_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesPool_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesPool_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesPool_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesPool_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesPool_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesPool_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesQ128?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesQ128_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesQ128_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesQ128_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesQ128_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesQ128_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesQ128_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesQ128_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFees_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFees_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFees_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFees_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFees_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFees_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
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
  EarlyWithdrawPenaltyFees = 'earlyWithdrawPenaltyFees',
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
  InventoryPositions = 'inventoryPositions',
  InventoryStakedTotal = 'inventoryStakedTotal',
  Is1155 = 'is1155',
  IsFinalized = 'isFinalized',
  IsNew = 'isNew',
  LpPoolAddress = 'lpPoolAddress',
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
  TotalEarlyWithdrawFees = 'totalEarlyWithdrawFees',
  TotalFees = 'totalFees',
  TotalFeesInventory = 'totalFeesInventory',
  TotalFeesPool = 'totalFeesPool',
  TotalFeesQ128 = 'totalFeesQ128',
  TotalHoldings = 'totalHoldings',
  TotalMints = 'totalMints',
  TotalRedeems = 'totalRedeems',
  TotalSwaps = 'totalSwaps',
  TreasuryAlloc = 'treasuryAlloc',
  UsesFactoryFees = 'usesFactoryFees',
  VaultId = 'vaultId'
}

export type ZapBuy = {
  __typename?: 'ZapBuy';
  ethAmount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  vaultAction: Redeem;
};

export type ZapBuy_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ZapBuy_Filter>>>;
  ethAmount?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ZapBuy_Filter>>>;
  vaultAction?: InputMaybe<Scalars['String']['input']>;
  vaultAction_?: InputMaybe<Redeem_Filter>;
  vaultAction_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_gt?: InputMaybe<Scalars['String']['input']>;
  vaultAction_gte?: InputMaybe<Scalars['String']['input']>;
  vaultAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAction_lt?: InputMaybe<Scalars['String']['input']>;
  vaultAction_lte?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ZapBuy_OrderBy {
  EthAmount = 'ethAmount',
  Id = 'id',
  VaultAction = 'vaultAction',
  VaultActionDate = 'vaultAction__date',
  VaultActionId = 'vaultAction__id',
  VaultActionSource = 'vaultAction__source',
  VaultActionTargetCount = 'vaultAction__targetCount',
  VaultActionType = 'vaultAction__type'
}

export type ZapSell = {
  __typename?: 'ZapSell';
  ethAmount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  vaultAction: Mint;
};

export type ZapSell_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ZapSell_Filter>>>;
  ethAmount?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ZapSell_Filter>>>;
  vaultAction?: InputMaybe<Scalars['String']['input']>;
  vaultAction_?: InputMaybe<Mint_Filter>;
  vaultAction_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_gt?: InputMaybe<Scalars['String']['input']>;
  vaultAction_gte?: InputMaybe<Scalars['String']['input']>;
  vaultAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAction_lt?: InputMaybe<Scalars['String']['input']>;
  vaultAction_lte?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ZapSell_OrderBy {
  EthAmount = 'ethAmount',
  Id = 'id',
  VaultAction = 'vaultAction',
  VaultActionDate = 'vaultAction__date',
  VaultActionId = 'vaultAction__id',
  VaultActionSource = 'vaultAction__source',
  VaultActionType = 'vaultAction__type'
}

export type ZapSwap = {
  __typename?: 'ZapSwap';
  ethAmount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  vaultAction: Swap;
};

export type ZapSwap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ZapSwap_Filter>>>;
  ethAmount?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  ethAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ZapSwap_Filter>>>;
  vaultAction?: InputMaybe<Scalars['String']['input']>;
  vaultAction_?: InputMaybe<Swap_Filter>;
  vaultAction_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_gt?: InputMaybe<Scalars['String']['input']>;
  vaultAction_gte?: InputMaybe<Scalars['String']['input']>;
  vaultAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAction_lt?: InputMaybe<Scalars['String']['input']>;
  vaultAction_lte?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ZapSwap_OrderBy {
  EthAmount = 'ethAmount',
  Id = 'id',
  VaultAction = 'vaultAction',
  VaultActionDate = 'vaultAction__date',
  VaultActionId = 'vaultAction__id',
  VaultActionSource = 'vaultAction__source',
  VaultActionTargetCount = 'vaultAction__targetCount',
  VaultActionType = 'vaultAction__type'
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
