import config from '@nftx/config';
import { QuoteToken, parseQuoteToken } from '../../price';
import isApproved from '../isApproved';
import { getChainConstant } from '@nftx/utils';
import { NFTX_ROUTER } from '@nftx/constants';

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

const isTradeErc20Approved = (args: Args) => {
  return isTradeApprovedNftx(args);
};

export default isTradeErc20Approved;
