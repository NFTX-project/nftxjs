import { Address } from '@nftx/types';

type RouteToken = {
  chainId: number;
  decimals: string;
  address: Address;
  symbol: string;
};

type RouteElV3 = {
  type: 'v3-pool';
  address: Address;
  tokenIn: RouteToken;
  tokenOut: RouteToken;
  fee: `${number}`;
  liquidity: `${number}`;
  sqrtRatioX96: `${number}`;
  tickCurrent: `${number}`;
  amountIn: `${number}`;
  amountOut: `${number}`;
};
type RouteElV2 = {
  type: 'v2-pool';
  address: Address;
  tokenIn: RouteToken;
  tokenOut: RouteToken;
  reserve0: { token: RouteToken; quotient: `${number}` };
  reserve1: { token: RouteToken; quotient: `${number}` };
  amountIn: `${number}`;
  amountOut: `${number}`;
};

type RouteEl = RouteElV3 | RouteElV2;

export type NftxQuote = {
  network: number;
  sellToken: Address;
  buyToken: Address;
  methodParameters: {
    calldata: Address;
    value: Address;
    to: Address;
  };
  blockNumber: `${number}`;
  amount: `${number}`;
  amountDecimals: `${number}`;
  quote: `${number}`;
  quoteDecimals: `${number}`;
  quoteGasAdjusted: `${number}`;
  quoteGasAdjustedDecimals: `${number}`;
  gasUseEstimate: `${number}`;
  gasUseEstimateUSD: `${number}`;
  simulationStatus: string;
  simulationError: boolean;
  gasPriceWei: `${number}`;
  route: RouteEl[][];
  routeString: string;
  quoteId: string;
};
