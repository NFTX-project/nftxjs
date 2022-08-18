import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP, NFTX_MARKETPLACE_ZAP } from '@nftx/constants';
import { doesNetworkSupport0x } from '../../price';
import { Address, getChainConstant } from '../../web3';
import isApproved from '../isApproved';

type Args = Omit<
  Parameters<typeof isApproved>[0],
  'spenderAddress' | 'tokenAddress' | 'amount'
> & { assetAddress: Address };

const isSwapApproved = ({
  network = config.network,
  assetAddress,
  ...args
}: Args) => {
  const supports0x = doesNetworkSupport0x(network);
  const zap = supports0x ? NFTX_MARKETPLACE_0X_ZAP : NFTX_MARKETPLACE_ZAP;
  const spenderAddress = getChainConstant(zap, network);

  return isApproved({
    ...args,
    network,
    spenderAddress,
    tokenAddress: assetAddress,
  });
};

export default isSwapApproved;
