import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP, NFTX_MARKETPLACE_ZAP } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import { doesNetworkSupport0x } from '../../price';
import approve from '../approve';

type Args = Omit<
  Parameters<typeof approve>[0],
  'spenderAddress' | 'tokenAddress' | 'amount'
> & { assetAddress: string };

const approveSell = ({
  network = config.network,
  assetAddress,
  ...args
}: Args) => {
  const supports0x = doesNetworkSupport0x(network);
  const zap = supports0x ? NFTX_MARKETPLACE_0X_ZAP : NFTX_MARKETPLACE_ZAP;
  const spenderAddress = getChainConstant(zap, network);

  return approve({
    network,
    tokenAddress: assetAddress,
    spenderAddress,
    ...args,
  });
};

export default approveSell;
