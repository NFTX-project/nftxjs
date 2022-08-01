import config from '@nftx/config';
import { getChainConstant } from '../web3';

const doesNetworkSupport0x = (network: number) => {
  return getChainConstant(config.urls.ZEROX_URL, network, null) != null;
};

export default doesNetworkSupport0x;
