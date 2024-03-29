import { CreatePoolFeatures, CreatePoolFees } from './pools';
import { ApproveContract } from './price';
import { Address, TokenId, TokenIds } from './web3';

export type CreateVaultQuoteParams = {
  name: string;
  symbol: string;
  assetAddress: Address;
  standard: 'ERC1155' | 'ERC721';
  fees: CreatePoolFees;
  features: CreatePoolFeatures;
  eligibilityModule: 'list' | 'range' | false | undefined;
  eligibilityRange: [bigint, bigint] | undefined;
  eligibilityList: bigint[] | undefined;
  tokenIds: Array<[TokenId, number]>;
  currentNftPriceInEth: bigint;
  fee: number;
  lowerNftPriceInEth: bigint;
  upperNftPriceInEth: bigint;
  vTokenMin: bigint;
  wethMin: bigint;
  fullRange: boolean;
};

export type CreateVaultQuote = {
  methodParameters: {
    params: {
      vaultInfo: {
        assetAddress: Address;
        is1155: boolean;
        allowAllItems: boolean;
        name: string;
        symbol: string;
      };
      eligibilityStorage: {
        moduleIndex: bigint;
        initData: Address;
      };
      nftIds: bigint[];
      nftAmounts: bigint[];
      vaultFeaturesFlag: bigint;
      vaultFees: {
        mintFee: bigint;
        redeemFee: bigint;
        swapFee: bigint;
      };
      liquidityParams: {
        lowerNFTPriceInETH: bigint;
        upperNFTPriceInETH: bigint;
        fee: number;
        currentNFTPriceInETH: bigint;
        vTokenMin: bigint;
        wethMin: bigint;
        deadline: bigint;
      };
    };
    value: bigint;
    contractAddress: Address;
  };
  approveContracts: ApproveContract[];
};

export type WithdrawLiquidityQuoteParams = {
  userAddress: Address;
  tokenIds: TokenIds;
  positionId: Address;
  percentageToWithdraw: number;
  slippagePercentage?: number;
};

export type WithdrawLiquidityQuote = {
  methodParameters: {
    params: {
      amount0Min: bigint;
      amount1Min: bigint;
      deadline: bigint;
      liquidity: bigint;
      nftIds: bigint[];
      positionId: bigint;
      vaultId: bigint;
      vTokenPremiumLimit: bigint;
    };
    value: bigint;
    contractAddress: Address;
  };
  approveContracts: ApproveContract[];
};

export type WithdrawInventoryQuoteParams = {
  positionId: Address;
  percentageToWithdraw: number;
  tokenIds: TokenIds;
  slippagePercentage?: number;
};

export type WithdrawInventoryQuote = {
  methodParameters: {
    positionId: bigint;
    vTokenShares: bigint;
    nftIds: bigint[];
    vTokenPremiumLimit: bigint;
    value: bigint;
    contractAddress: Address;
  };
  approveContracts: ApproveContract[];
};

export type CreateInventoryPositionQuoteParams = {
  vaultId: string;
  userAddress: Address;
  vToken?: bigint;
  usePermit2?: boolean;
  tokenIds?: TokenIds;
};

export type CreateInventoryPositionQuote = {
  methodParameters: {
    vaultId: bigint;
    nftIds: bigint[];
    vToken: bigint;
    nftAmounts: bigint[];
    userAddress: Address;
    usePermit2: boolean;
    contractAddress: Address;
  };
  approveContracts: ApproveContract[];
};

export type CreateLiquidityPositionQuoteParams = {
  vaultId: string;
  poolId: Address;
  liquidity: {
    upperPrice: bigint;
    currentPrice: bigint;
    lowerPrice: bigint;
    nftsToPair: bigint;
    vTokenToPair: bigint;
    ethToPair: bigint;
    fullRange: boolean;
  };
  tokenIds: [TokenId, number][];
  slippagePercentage?: number;
  userAddress: Address;
  usePermit2?: boolean;
};

export type CreateLiquidityPositionQuote = {
  methodParameters: {
    value: bigint;
    params: {
      vaultId: bigint;
      vTokensAmount: bigint;
      nftIds: bigint[];
      nftAmounts: bigint[];
      tickLower: number;
      tickUpper: number;
      fee: number;
      sqrtPriceX96: bigint;
      vTokenMin: bigint;
      wethMin: bigint;
      deadline: bigint;
      forceTimelock: boolean;
      recipient: Address;
    };
    usePermit2: boolean;
    contractAddress: Address;
  };
  approveContracts: ApproveContract[];
};

export type IncreaseLiquidityQuoteParams = {
  positionId: Address;
  tokenIds: TokenIds;
  slippagePercentage?: number;
  liquidity: {
    upperPrice: bigint;
    lowerPrice: bigint;
    nftsToPair: bigint;
    vTokenToPair: bigint;
    ethToPair: bigint;
  };
  usePermit2?: boolean;
};

export type IncreaseLiquidityQuote = {
  methodParameters: {
    value: bigint;
    params: {
      vaultId: bigint;
      vTokensAmount: bigint;
      nftIds: bigint[];
      nftAmounts: bigint[];
      vTokenMin: bigint;
      wethMin: bigint;
      deadline: bigint;
      forceTimelock: boolean;
      positionId: bigint;
    };
    usePermit2: boolean;
    contractAddress: Address;
  };
  approveContracts: ApproveContract[];
};
