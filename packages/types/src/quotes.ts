import { CreatePoolFeatures, CreatePoolFees, LiquidityPool } from './pools';
import { InventoryPosition, LiquidityPosition } from './positions';
import { ApproveContract } from './price';
import { Address, TokenId } from './web3';

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
  deadline: bigint;
  fee: number;
  lowerNftPriceInEth: bigint;
  upperNftPriceInEth: bigint;
  vTokenMin: bigint;
  wethMin: bigint;
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
  };
  approveContracts: ApproveContract[];
};

export type WithdrawLiquidityQuoteParams = {
  userAddress: Address;
  tokenIds: TokenId[] | [TokenId, number][];
  position: Pick<
    LiquidityPosition,
    'tokenId' | 'liquidity' | 'vToken' | 'eth' | 'claimableEth' | 'lockedUntil'
  >;
  pool: {
    vaultId: LiquidityPool['vaultId'];
    tokens: { id: LiquidityPool['tokens'][0]['id'] }[];
  };
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
  };
  approveContracts: ApproveContract[];
};

export type WithdrawInventoryQuoteParams = {
  position: Pick<InventoryPosition, 'vaultId' | 'id' | 'lockedUntil'>;
  percentageToWithdraw: number;
  tokenIds: TokenId[];
  userAddress: Address;
  slippagePercentage?: number;
};

export type WithdrawInventoryQuote = {
  methodParameters: {
    positionId: bigint;
    vTokenShares: bigint;
    nftIds: bigint[];
    vTokenPremiumLimit: bigint;
    value: bigint;
  };
  approveContracts: ApproveContract[];
};
