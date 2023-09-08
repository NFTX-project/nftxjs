import type { Address, BigIntish } from '@nftx/types';
import type { QuoteToken } from './types';
import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import parseQuoteToken from './parseQuoteToken';

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

const fetchQuote = async (args: {
  network?: number;
  buyToken: QuoteToken;
  buyAmount?: BigIntish;
  sellToken: QuoteToken;
  sellAmount?: BigIntish;
  slippagePercentage?: number;
  userAddress?: Address;
}): Promise<NftxQuote> => {
  const {
    network = config.network,
    buyAmount,
    sellAmount,
    slippagePercentage,
    userAddress,
  } = args;
  const sellToken = parseQuoteToken(args.sellToken, network);
  const buyToken = parseQuoteToken(args.buyToken, network);

  const searchParams = new URLSearchParams();
  searchParams.append('tokenInAddress', sellToken);
  searchParams.append('tokenInChainId', `${network}`);
  searchParams.append('tokenOutAddress', buyToken);
  searchParams.append('tokenOutChainId', `${network}`);
  if (buyAmount) {
    searchParams.append('amount', BigInt(buyAmount).toString());
    searchParams.append('type', 'exactOut');
  } else if (sellAmount) {
    searchParams.append('amount', BigInt(sellAmount).toString());
    searchParams.append('type', 'exactIn');
  } else {
    // Default to just buying 1
    searchParams.append('buyAmount', WeiPerEther.toString());
    searchParams.append('type', 'exactOut');
  }
  if (userAddress) {
    searchParams.append('recipient', userAddress);
    searchParams.append('deadline', '300');
    searchParams.append('enableUniversalRouter', 'true');
    searchParams.append('slippageTolerance', `${slippagePercentage ?? 1}`);
    // TODO: if we provide all this but the response has no methodParameters, slippage is probably too low and we need to throw an error
  }
  searchParams.append('protocols', 'v3');

  const query = searchParams.toString();
  const baseUrl = getChainConstant(config.urls.NFTX_ROUTER_URL, network, null);
  if (!baseUrl) {
    throw new Error(`Network ${network} is not supported for the NFTX Router`);
  }
  const url = `${baseUrl}?${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    const json = await response.json();
    throw { ...json, status: response.status };
  }

  const data: NftxQuote = await response.json();

  return {
    ...data,
    network,
    sellToken,
    buyToken,
  };
};

export default fetchQuote;
