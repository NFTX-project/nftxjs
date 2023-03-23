import type { Price } from './price';
import type { Token } from './tokens';
import type { Address, TokenId } from './web3';

export type VaultFeatures = {
  enableMint: boolean;
  enableRandomRedeem: boolean;
  enableTargetRedeem: boolean;
  enableRandomSwap: boolean;
  enableTargetSwap: boolean;
};

export type VaultHolding = {
  id: string;
  tokenId: TokenId;
  amount: bigint;
  dateAdded: number;
};

export type VaultFees = {
  mintFee: bigint;
  randomRedeemFee: bigint;
  targetRedeemFee: bigint;
  targetSwapFee: bigint;
  randomSwapFee: bigint;
};

export type Vault = {
  vaultId: string;
  id: Address;
  asset: Token;
  createdBy: { id: Address };
  createdAt: number;
  derivedETH: string;
  rawPrice: bigint;
  buyPrice: Price;
  reserveVtoken: bigint;
  reserveWeth: bigint;
  features: VaultFeatures;
  totalHoldings: number;
  totalMints: number;
  totalRedeems: number;
  totalFees: bigint;
  holdings: VaultHolding[];
  is1155: boolean;
  isFinalized: boolean;
  usesFactoryFees: boolean;
  fees: VaultFees;
  manager: { id: Address };
  token: Token;
  eligibilityModule: {
    id: Address;
    name: string;
    eligibleIds: string[];
    eligibleRange: [string, string];
    merkleReference: string;
  };
  lpStakingPool: {
    id: Address;
    stakingToken: {
      id: Address;
    };
    dividendToken: {
      id: Address;
    };
  };
  inventoryStakingPool: {
    id: Address;
    dividendToken: {
      id: Address;
      symbol: string;
    };
  };
  shutdownDate: number;
  // feeReceipts: Pick<VaultFeeReceipt, 'amount' | 'date' | 'transfers'>[];
  // activity: Pick<VaultActivity, 'vaultAddress' | 'vaultId'>;
};

export type VaultActivity = {
  vaultId: string;
  vaultAddress: Address;
  amount: number;
  ethAmount: bigint;
  date: number;
  feeAmount: bigint;
  tokenId: TokenId;
  txId: Address;
  source: string;
  type: 'buy' | 'sell' | 'swap' | 'mint' | 'redeem' | 'stake' | 'unstake';
  stakeType?: 'liquidity' | 'inventory';
  swapTokenId?: TokenId;
  random?: boolean;
};

export type VaultFeeTransfer = {
  amount: bigint;
  to: string;
};

export type VaultFeeReceipt = {
  vaultId: string;
  vaultAddress: string;
  transfers: VaultFeeTransfer[];
  amount: bigint;
  date: number;
};
