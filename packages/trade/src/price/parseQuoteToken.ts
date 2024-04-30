import { USDC, WETH_TOKEN } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import type { Address, QuoteToken } from '@nftx/types';

const parseQuoteToken = (address: QuoteToken, network: number) => {
  switch (address) {
    case 'ETH':
      return 'ETH' as Address;
    case 'WETH':
      return getChainConstant(WETH_TOKEN, network);
    case 'USDC':
      return getChainConstant(USDC, network);
    default:
      return address;
  }
};

export default parseQuoteToken;
