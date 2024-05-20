import type { BigNumber } from '@ethersproject/bignumber';
import type { Price } from './price';
import type { Token } from './tokens';

export type VaultFeatures = {
  enableMint: boolean;
  enableRandomRedeem: boolean;
  enableTargetRedeem: boolean;
  enableRandomSwap: boolean;
  enableTargetSwap: boolean;
};

export type VaultHolding = {
  id: string;
  tokenId: string;
  amount: BigNumber;
  dateAdded: number;
};

export type VaultFees = {
  mintFee: BigNumber;
  randomRedeemFee: BigNumber;
  targetRedeemFee: BigNumber;
  targetSwapFee: BigNumber;
  randomSwapFee: BigNumber;
};

export type Vault = {
  vaultId: string;
  id: string;
  asset: Token;
  createdBy: { id: string };
  createdAt: number;
  derivedETH: string;
  rawPrice: BigNumber;
  buyPrice: Price;
  reserveVtoken: BigNumber;
  reserveWeth: BigNumber;
  features: VaultFeatures;
  totalHoldings: number;
  totalMints: number;
  totalRedeems: number;
  totalFees: BigNumber;
  holdings: VaultHolding[];
  is1155: boolean;
  isFinalized: boolean;
  usesFactoryFees: boolean;
  fees: VaultFees;
  manager: { id: string };
  token: Token;
  eligibilityModule: {
    id: string;
    name: string;
    eligibleIds: string[];
    eligibleRange: [string, string];
    merkleReference: string;
  };
  lpStakingPool: {
    id: string;
    stakingToken: {
      id: string;
    };
    dividendToken: {
      id: string;
    };
  };
  inventoryStakingPool: {
    id: string;
    dividendToken: {
      id: string;
      symbol: string;
    };
  };
  shutdownDate: number;
  prices: {
    mint: BigNumber;
    swap: BigNumber;
    redeem: BigNumber;
    spot: BigNumber;
  };
  // feeReceipts: Pick<VaultFeeReceipt, 'amount' | 'date' | 'transfers'>[];
  // activity: Pick<VaultActivity, 'vaultAddress' | 'vaultId'>;
};

export type VaultActivity = {
  vaultId: string;
  vaultAddress: string;
  amount: number;
  ethAmount: BigNumber;
  date: number;
  feeAmount: BigNumber;
  tokenId: string;
  txId: string;
  source: string;
  type: 'buy' | 'sell' | 'swap' | 'mint' | 'redeem' | 'stake' | 'unstake';
  stakeType?: 'liquidity' | 'inventory';
  swapTokenId?: string;
  random?: boolean;
};

export type VaultFeeTransfer = {
  amount: BigNumber;
  to: string;
};

export type VaultFeeReceipt = {
  vaultId: string;
  vaultAddress: string;
  transfers: VaultFeeTransfer[];
  amount: BigNumber;
  date: number;
};
