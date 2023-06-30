import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import isApproved from '../isApproved';
import { MARKETPLACE_ZAP } from '@nftx/constants';

type Args = Omit<
  Parameters<typeof isApproved>[0],
  'spenderAddress' | 'tokenAddress' | 'amount'
> & { assetAddress: Address };

/** Returns whether you are approved to sell NFTs for a given collection */
const isSellApproved = (_args: Args) => {
  const { network = config.network, assetAddress, ...args } = _args;

  // TODO: implement NFTX Router
  const spenderAddress = getChainConstant(MARKETPLACE_ZAP, network);

  return isApproved({
    network,
    spenderAddress,
    tokenAddress: assetAddress,
    ...args,
  });
};

export default isSellApproved;
