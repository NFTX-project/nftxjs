import config from '@nftx/config';
import { NFTX_MARKETPLACE_ZAP } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import isApproved from '../isApproved';

type Args = Omit<
  Parameters<typeof isApproved>[0],
  'spenderAddress' | 'tokenAddress' | 'amount'
> & { assetAddress: string };

/** Returns whether you are approved to sell NFTs for a given collection */
const isSellApproved = (_args: Args) => {
  const { network = config.network, assetAddress, ...args } = _args;

  const spenderAddress = getChainConstant(NFTX_MARKETPLACE_ZAP, network);

  return isApproved({
    network,
    spenderAddress,
    tokenAddress: assetAddress,
    ...args,
  });
};

export default isSellApproved;
