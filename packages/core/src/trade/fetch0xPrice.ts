import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Address } from '../web3';
import fetch0xQuote from './fetch0xQuote';

/** Fetch a quote price from the 0x api */
const fetch0xPrice = async ({
  buyToken,
  sellToken,
  amount = WeiPerEther,
  network,
}: {
  network: number;
  buyToken: Address;
  sellToken: Address;
  amount?: BigNumberish;
}) => {
  const { sellAmount } = await fetch0xQuote({
    network,
    buyToken,
    sellToken,
    amount,
    type: 'price',
  });

  return BigNumber.from(sellAmount);
};

export default fetch0xPrice;
