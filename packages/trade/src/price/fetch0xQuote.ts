import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import config from '@nftx/config';
import { Network } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';

const API_KEYS = {
  [Network.Mainnet]: 'ee990c3a-309a-4859-b5eb-60e0d5ef43b8',
  // [Network.Goerli]: 'a173ffcb-65cd-407b-bc0c-43d87d36b16e',
  [Network.Arbitrum]: '2b40a84f-af0d-4f00-af35-5aa7a1a39d49',
};

export type ZeroXQuote = {
  price: string;
  guaranteedPrice: string;
  to: string;
  data: string;
  value: string;
  gasPrice: string;
  gas: string;
  estimatedGas: string;
  protocolFee: string;
  estimatedPriceImpact: string;
  minimumProtocolFee: string;
  buyAmount: string;
  sellAmount: string;
  sources: Array<{
    name: string;
    proportion: string;
  }>;
  buyTokenAddress: string;
  sellTokenAddress: string;
  allowanceTarget: string;
  orders: unknown;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
};

/** Fetch a quote price from the 0x api.
 * The returned quote can be passed directly to 0x to process the quoted transaction.
 * You can specify either buyAmount or sellAmount, but not both. If you do not pass any amounts in, it defaults to buying 1.
 * This method is just a wrapper around 0x's own api, docs can be found here:
 * https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote
 */
const fetch0xQuote = async (args: {
  network?: number;
  /** The address of the token you're buying */
  buyToken: string;
  /** the amount of buyToken you want to buy */
  buyAmount?: BigNumberish;
  /** The address of the token you're selling */
  sellToken: string;
  /** The amount of sellToken you want to sell */
  sellAmount?: BigNumberish;
  /** The percentage amount of acceptable slippage on either sellAmount or buyAmount. Defaults to 1%. If you don't want to allow any slippage, you must explicitly pass 0 */
  slippagePercentage?: number;
  /** If a "critical" quote, the response will be fetched from 0x directly. For non-critical requests (such as "price" calls), the response is fetched from NFTX's fork which implements additional caching layers and a higher rate limiting threshold */
  critical?: boolean;
  /** Whether to fetch an actual quote that can be directly submitted as a transaction, or just a readonly price */
  type?: 'quote' | 'price';
}): Promise<ZeroXQuote> => {
  const {
    network = config.network,
    buyToken,
    sellToken,
    buyAmount,
    sellAmount,
    slippagePercentage,
    type = 'quote',
    critical = type === 'quote',
  } = args;

  try {
    const searchParams = new URLSearchParams();
    searchParams.append('buyToken', buyToken);
    searchParams.append('sellToken', sellToken);
    if (buyAmount) {
      searchParams.append('buyAmount', BigNumber.from(buyAmount).toString());
    } else if (sellAmount) {
      searchParams.append('sellAmount', BigNumber.from(sellAmount).toString());
    } else {
      // Default to just buying 1
      searchParams.append('buyAmount', WeiPerEther.toString());
    }
    if (slippagePercentage != null) {
      searchParams.append('slippagePercentage', `${slippagePercentage}`);
    }
    const query = searchParams.toString();
    const zeroUrl = getChainConstant(
      critical ? config.urls.ZEROX_QUOTE_URL : config.urls.ZEROX_PRICE_URL,
      network,
      null
    );
    if (!zeroUrl) {
      throw new Error(`${network} is not a supported network for the 0x API`);
    }
    const url = `${zeroUrl}/swap/v1/${type}?${query}&affiliateAddress=0xaA29881aAc939A025A3ab58024D7dd46200fB93D`;
    const headers: Record<string, string> = {};
    const zeroApiKey = getChainConstant(API_KEYS, network, null);
    if (zeroApiKey) {
      headers['0x-api-key'] = zeroApiKey;
    }
    const response = await fetch(url, { headers });
    if (!response.ok) {
      const json = await response.json();
      throw { ...json, status: response.status };
    }
    const data: ZeroXQuote = await response.json();

    return {
      ...data,
      sources: data.sources.filter((source) => source.proportion !== '0'),
    };
  } catch (e) {
    // If the non-critical endpoint fails, it might be that our fork is down
    // We should fall back to hitting the 0x api directly
    if (!critical) {
      return fetch0xQuote({
        buyToken,
        sellToken,
        buyAmount,
        critical: true,
        network,
        sellAmount,
        slippagePercentage,
        type,
      });
    }
    throw e;
  }
};

export default fetch0xQuote;
