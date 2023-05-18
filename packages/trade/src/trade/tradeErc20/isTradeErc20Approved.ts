import config from '@nftx/config';
import {
  QuoteToken,
  doesNetworkSupport0x,
  doesNetworkSupportNftxRouter,
  parseQuoteToken,
} from '../../price';
import isApproved from '../isApproved';
import { getChainConstant } from '@nftx/utils';
import { NFTX_ROUTER, ZEROX_ROUTER } from '@nftx/constants';

type Args = Omit<
  Parameters<typeof isApproved>[0],
  'spenderAddress' | 'amount' | 'tokenAddress' | 'tokenId' | 'tokenIds'
> & { sellToken: QuoteToken };

const isTradeApprovedNftx = (_args: Args) => {
  const { network = config.network, sellToken, ...args } = _args;

  if (sellToken === 'ETH') {
    return true;
  }

  const tokenAddress = parseQuoteToken(sellToken, network);
  const spenderAddress = getChainConstant(NFTX_ROUTER, network);

  return isApproved({
    network,
    spenderAddress,
    tokenAddress,
    ...args,
  });
};

const isTradeApproved0x = (_args: Args) => {
  const { network = config.network, sellToken, ...args } = _args;

  if (sellToken === 'ETH') {
    return true;
  }

  const spenderAddress = getChainConstant(ZEROX_ROUTER, network);
  const tokenAddress = parseQuoteToken(sellToken, network);

  return isApproved({
    network,
    spenderAddress,
    tokenAddress,
    ...args,
  });
};

const isTradeErc20Approved = (args: Args) => {
  const { network = config.network } = args;

  if (doesNetworkSupportNftxRouter(network)) {
    return isTradeApprovedNftx(args);
  }
  if (doesNetworkSupport0x(network)) {
    return isTradeApproved0x(args);
  }
  throw new Error(
    `isTradeErc20Approved is not supported for network ${network}`
  );
};

export default isTradeErc20Approved;
