import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';

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
    const url = `${zeroUrl}/swap/v1/${type}?${query}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
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
