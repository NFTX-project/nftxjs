import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import config from '@nftx/config';
import { Address, getChainConstant } from '../web3';

type Response = {
  price: string;
  guaranteedPrice: string;
  to: string;
  data: string;
  value: string;
  gasPrice: string;
  gas: string;
  estimatedGas: string;
  protocolFee: string;
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

/** Fetch a quote price from the 0x api */
const fetch0xQuote = async ({
  network = config.network,
  buyToken,
  sellToken,
  buyAmount,
  sellAmount,
  slippagePercentage,
  type = 'quote',
  critical = type === 'quote',
}: {
  network?: number;
  buyToken: Address;
  buyAmount?: BigNumberish;
  sellToken: Address;
  sellAmount?: BigNumberish;
  slippagePercentage?: number;
  /** Whether to fetch the quote from 0x or from our fork */
  critical?: boolean;
  /** Whether to fetch an actual quote that can be directly submitted as a transaction, or just a readonly price */
  type?: 'quote' | 'price';
}) => {
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
  if (slippagePercentage) {
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
  const data: Response = await response.json();

  return {
    ...data,
    sources: data.sources.filter((source) => source.proportion !== '0'),
  };
};

export default fetch0xQuote;
