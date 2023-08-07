import type { Token } from './tokens';
import type { Address, TokenId } from './web3';

/** A price object returned by all pricing methods (@nftx/trade) */
export type Price = {
  price: bigint;
  estimatedGas?: bigint;
  gasPrice?: bigint;
  /**
   * A list of sources providing liquidity for the given price
   */
  sources?: Array<{ name: string; proportion: string }>;
  route?: Array<{
    type: string;
    proportion: string;
    amountIn: bigint;
    amountOut: bigint;
    tokenIn: Token;
    tokenOut: Token;
    path: Array<{
      tokenIn: Token;
      tokenOut: Token;
      amount: bigint;
    }>;
  }>;
  priceImpact?: number;
  methodParameters: { calldata: Address; value: Address; to: Address };
};

/** A price object for buying/selling/swapping an NFT through the marketplace zap */
export type MarketplacePrice = {
  type: 'buy' | 'sell' | 'swap';
  /** The total price in ETH */
  price: bigint;
  /** The ETH price of the vToken being bought/sold */
  vTokenPrice: bigint;
  /** The ETH price of platform fees */
  feePrice: bigint;
  /** The ETH price paid for premium items */
  premiumPrice: bigint;
};

type MarketplaceParameters = {
  vaultId: string;
  vaultAddress: Address;
  to: Address;
  tokenIdsIn: `${number}`[];
  tokenIdsOut: `${number}`[];
  executeCalldata: Address;
  value: string;
};

export type MarketplaceQuote = MarketplacePrice & {
  /** A breakdown of the price */
  items: Array<{
    tokenId: `${number}`;
    vTokenPrice: bigint;
    feePrice: bigint;
    premiumPrice: bigint;
  }>;
  methodParameters: MarketplaceParameters;
  approveContracts: Array<{
    /** The token we want to spend */
    tokenAddress: Address;
    /** The smart contract address that will be spending the token */
    spenderAddress: Address;
    /** For ERC721/ERC1155, provide the token id or tokenIds */
    tokenIds?: TokenId[] | [TokenId, number][];
    /** For ERC20, provide the amount the spender can spend - if omitted it defaults to the max amount */
    amount?: bigint;
    /** If the standard is omitted, we will infer either ERC721 or ERC20 based on amount/tokenId/tokenIds parameters */
    standard?: 'ERC721' | 'ERC1155' | 'ERC20';
  }>;
};
