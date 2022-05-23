import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import { ZEROX_URL } from '@nftx/constants';
import { getChainConstant } from '../utils';
import type { Address } from '../web3';

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
  network,
  buyToken,
  sellToken,
  amount = WeiPerEther,
  type = 'quote',
}: {
  network: number;
  buyToken: Address;
  sellToken: Address;
  amount?: BigNumberish;
  /** Whether to fetch an actual quote that can be directly submitted as a transaction, or just a readonly price */
  type?: 'quote' | 'price';
}) => {
  const searchParams = new URLSearchParams();
  searchParams.append('buyToken', buyToken);
  searchParams.append('sellToken', sellToken);
  searchParams.append('buyAmount', BigNumber.from(amount).toString());
  const query = searchParams.toString();
  const zeroUrl = getChainConstant(ZEROX_URL, network, null);
  if (!zeroUrl) {
    throw new Error(`${network} is not a supported network for the 0x API`);
  }
  const url = `${zeroUrl}/swap/v1/${type}?${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const data: Response = await response.json();

  return data;
};

export default fetch0xQuote;
