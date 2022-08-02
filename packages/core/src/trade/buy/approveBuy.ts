import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP, NFTX_MARKETPLACE_ZAP } from '@nftx/constants';
import { doesNetworkSupport0x } from '../../price';
import type { VaultAddress } from '../../vaults';
import { getChainConstant } from '../../web3';
import approve from '../approve';

type Args = Omit<
  Parameters<typeof approve>[0],
  'spenderAddress' | 'tokenAddress' | 'amount'
> & { vaultAddress: VaultAddress };

const approveBuy = ({
  network = config.network,
  vaultAddress,
  ...args
}: Args) => {
  const supports0x = doesNetworkSupport0x(network);
  const zap = supports0x ? NFTX_MARKETPLACE_0X_ZAP : NFTX_MARKETPLACE_ZAP;
  const spenderAddress = getChainConstant(zap, network);

  return approve({
    spenderAddress,
    tokenAddress: vaultAddress,
    network,
    ...args,
  });
};

export default approveBuy;
