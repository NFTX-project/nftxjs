import type { Address, BigIntish, Permit2Quote } from '@nftx/types';
import type { QuoteToken } from './types';
import config from '@nftx/config';
import { NFTX_ROUTER, WeiPerEther } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import parseQuoteToken from './parseQuoteToken';
import {
  QuoteFailedError,
  QuoteSlippageError,
  ValidationError,
} from '@nftx/errors';

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
  permit2?: Permit2Quote;
}): Promise<NftxQuote> => {
  const {
    network = config.network,
    buyAmount,
    sellAmount,
    slippagePercentage = 0.01,
    userAddress,
    permit2,
  } = args;
  const sellToken = parseQuoteToken(args.sellToken, network);
  const buyToken = parseQuoteToken(args.buyToken, network);

  const baseUrl = getChainConstant(config.urls.NFTX_ROUTER_URL, network, null);

  ValidationError.validate({
    sellToken: () => !!sellToken || 'Required',
    network: () => {
      if (!network) {
        return 'Required';
      }
      if (!baseUrl) {
        return 'Not currently supported for NFTX Router';
      }
    },
    buyToken: () => !!buyToken || 'Required',
  });

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
    searchParams.append(
      'slippageTolerance',
      `${slippagePercentage ?? 0.01 * 100}`
    );
  }
  searchParams.append('protocols', 'v3');
  if (permit2) {
    searchParams.append('permitSignature', permit2.signature);
    searchParams.append('permitAmount', permit2.amount.toString());
    searchParams.append('permitExpiration', permit2.expiration.toString());
    searchParams.append('permitSigDeadline', permit2.sigDeadline.toString());
    searchParams.append('permitNonce', permit2.nonce.toString());
  }

  const query = searchParams.toString();

  const url = `${baseUrl}?${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    const json = await response.json();
    throw new QuoteFailedError(json);
  }

  const data: NftxQuote = await response.json();

  if (userAddress && !data?.methodParameters) {
    throw new QuoteSlippageError();
  }
  if (userAddress && config.debug) {
    console.debug(data);
  }

  if (data?.methodParameters?.to) {
    // We need to override the to property as it's pointing to the Uniswap router instead of our own
    data.methodParameters.to = getChainConstant(NFTX_ROUTER, network);
  }

  return {
    ...data,
    network,
    sellToken,
    buyToken,
  };
};

export default fetchQuote;
