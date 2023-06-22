import type { Provider, Signer } from '@nftx/types';
import { QuoteToken, parseQuoteToken } from '../../price';
import config from '@nftx/config';
import approve from '../approve';
import { getChainConstant } from '@nftx/utils';
import { NFTX_ROUTER } from '@nftx/constants';

type Args = {
  network?: number;
  provider: Provider;
  signer: Signer;
  sellToken: QuoteToken;
};

const approveTradeNftx = (args: Args) => {
  const { provider, signer, sellToken, network = config.network } = args;

  const tokenAddress = parseQuoteToken(sellToken, network);
  const spenderAddress = getChainConstant(NFTX_ROUTER, network);

  return approve({
    provider,
    signer,
    spenderAddress,
    tokenAddress,
    standard: 'ERC20',
  });
};

const approveTradeErc20 = (args: Args) => {
  return approveTradeNftx(args);
};

export default approveTradeErc20;
