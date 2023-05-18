import type { Provider, Signer } from '@nftx/types';
import {
  QuoteToken,
  doesNetworkSupport0x,
  doesNetworkSupportNftxRouter,
  parseQuoteToken,
} from '../../price';
import config from '@nftx/config';
import approve from '../approve';
import { getChainConstant } from '@nftx/utils';
import { NFTX_ROUTER, ZEROX_ROUTER } from '@nftx/constants';

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

const approveTrade0x = (args: Args) => {
  const { provider, sellToken, signer, network = config.network } = args;

  const tokenAddress = parseQuoteToken(sellToken, network);
  const spenderAddress = getChainConstant(ZEROX_ROUTER, network);

  return approve({
    provider,
    signer,
    spenderAddress,
    tokenAddress,
    standard: 'ERC20',
  });
};

const approveTradeErc20 = (args: Args) => {
  const { network = config.network } = args;

  if (doesNetworkSupportNftxRouter(network)) {
    return approveTradeNftx(args);
  }
  if (doesNetworkSupport0x(network)) {
    return approveTrade0x(args);
  }
  throw new Error(
    `isTradeErc20Approved is not supported for network ${network}`
  );
};

export default approveTradeErc20;
