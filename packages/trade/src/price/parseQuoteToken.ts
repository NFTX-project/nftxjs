import { USDC, WETH_TOKEN } from '@nftx/constants';
import type { QuoteToken } from './types';
import { getChainConstant } from '@nftx/utils';

const parseQuoteToken = (address: QuoteToken, network: number) => {
  switch (address) {
    case 'ETH':
      return getChainConstant(WETH_TOKEN, network);
    case 'USDC':
      return getChainConstant(USDC, network);
    default:
      return address;
  }
};

export default parseQuoteToken;
