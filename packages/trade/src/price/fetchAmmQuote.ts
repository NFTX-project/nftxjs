import type {
  Address,
  BigIntish,
  MarketplaceQuote,
  Permit2Quote,
  QuoteToken,
} from '@nftx/types';
import config from '@nftx/config';
import { NFTX_ROUTER, WeiPerEther, Zero } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import parseQuoteToken from './parseQuoteToken';
import {
  QuoteFailedError,
  QuoteSlippageError,
  ValidationError,
} from '@nftx/errors';
import { NftxQuote } from './types';
import ammQuoteToPrice from './ammQuoteToPrice';

const fallbackQuote = {
  approveContracts: [],
  estimatedGas: Zero,
  feePrice: Zero,
  items: [],
  methodParameters: {} as any,
  premiumPrice: Zero,
  price: Zero,
  vTokenPrice: Zero,
  type: 'erc20' as const,
};

const fetchAmmQuote = async (args: {
  network?: number;
  buyToken: QuoteToken;
  buyAmount?: BigIntish;
  sellToken: QuoteToken;
  sellAmount?: BigIntish;
  /** The amount of slippage (in decimal terms) you're willing to accept - defaults to 1% */
  slippagePercentage?: number;
  userAddress?: Address;
  /** Optionally use permit2 to approve spending tokens */
  permit2?: Permit2Quote;
  /** If unable to get a quote, this option determines whether to throw an error, or just return a 0 price object. Defaults to true */
  throwOnError?: boolean;
}): Promise<MarketplaceQuote> => {
  const {
    network = config.network,
    buyAmount,
    sellAmount,
    slippagePercentage = 0.01,
    userAddress,
    permit2,
    throwOnError = true,
  } = args;

  try {
    const sellToken = parseQuoteToken(args.sellToken, network);
    const buyToken = parseQuoteToken(args.buyToken, network);

    const baseUrl = getChainConstant(
      config.urls.NFTX_ROUTER_URL,
      network,
      null
    );

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
        `${(slippagePercentage ?? 0.01) * 100}`
      );
      searchParams.append('intent', 'swap');
    } else {
      searchParams.append('intent', 'quote');
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

    return ammQuoteToPrice({
      ...data,
      network,
      sellToken,
      buyToken,
    });
  } catch (e) {
    if (!throwOnError) {
      return fallbackQuote;
    }

    throw e;
  }
};

export default fetchAmmQuote;
