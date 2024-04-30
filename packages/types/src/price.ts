import type { Token } from './tokens';
import type { Address, TokenIds } from './web3';

type PriceRoute = Array<{
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

export type ApproveContract = {
  label: string;
  /** The approval type */
  type: 'on-chain' | 'permit2';
  /** The token we want to spend */
  tokenAddress: Address;
  /** The smart contract address that will be spending the token */
  spenderAddress: Address;
  /** For ERC721/ERC1155, provide the token id or tokenIds */
  tokenIds?: TokenIds;
  /** For ERC20, provide the amount the spender can spend - if omitted it defaults to the max amount */
  amount?: bigint;
  /** If the standard is omitted, we will infer either ERC721 or ERC20 based on amount/tokenId/tokenIds parameters */
  standard?: 'ERC721' | 'ERC1155' | 'ERC20';
};

/** A price object for buying/selling/swapping an NFT through the marketplace zap or trading an ERC20 through NFTX's AMM */
export type MarketplacePrice = {
  type: 'buy' | 'sell' | 'swap' | 'mint' | 'redeem' | 'erc20';
  /** The total price in ETH */
  price: bigint;
  /** The ETH price of the vToken being bought/sold */
  vTokenPrice: bigint;
  /** The ETH price of platform fees */
  feePrice: bigint;
  /** The ETH price paid for premium items */
  premiumPrice: bigint;
  route?: PriceRoute;
  routeString?: string;
  /** A list of sources providing liquidity for the price */
  sources?: Array<{ name: string; proportion: string }>;
};

type MarketplaceParameters = {
  vaultId: string;
  vaultAddress: Address;
  to: Address;
  tokenIdsIn: `${number}`[];
  amountsIn: number[];
  tokenIdsOut: `${number}`[];
  amountsOut: number[];
  executeCalldata: Address;
  value: string;
  premiumLimit: string;
  standard: 'ERC721' | 'ERC1155' | 'ERC20';
};

export type Permit2Quote = {
  signature: Address;
  amount: bigint;
  expiration: number;
  sigDeadline: bigint;
  nonce: number;
  permit2encoded: Address;
};

export type MarketplaceQuote = MarketplacePrice & {
  /** A breakdown of the price */
  items: Array<{
    tokenId: `${number}`;
    /** The number of this tokenId in the quote (for ERC1155s) */
    amount: number;
    vTokenPrice: bigint;
    feePrice: bigint;
    premiumPrice: bigint;
    premiumLimit: bigint;
  }>;
  estimatedGas: bigint;
  methodParameters: MarketplaceParameters;
  approveContracts: ApproveContract[];
};

/** Acceptable tokens / currencies you can get quotes in */
export type QuoteToken = Address | 'ETH' | 'USDC' | 'WETH';
