import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP } from '@nftx/constants';
import { doesNetworkSupport0x } from '../../price';
import { Address, getChainConstant } from '../../web3';
import isApproved from '../isApproved';

type Args = Omit<
  Parameters<typeof isApproved>[0],
  'spenderAddress' | 'tokenAddress' | 'amount'
> & { assetAddress: Address };

const isSellApproved = ({
  network = config.network,
  assetAddress,
  ...args
}: Args) => {
  const supports0x = doesNetworkSupport0x(network);
  const spenderAddress = getChainConstant(
    supports0x ? NFTX_MARKETPLACE_0X_ZAP : NFTX_MARKETPLACE_0X_ZAP,
    network
  );

  return isApproved({
    network,
    spenderAddress,
    tokenAddress: assetAddress,
    ...args,
  });
};

export default isSellApproved;
