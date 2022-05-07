import { ZEROX_URL } from '@nftx/constants';
import { getChainConstant } from '../utils';

const doesNetworkSupport0x = (network: number) => {
  return getChainConstant(ZEROX_URL, network, null) != null;
};

export default doesNetworkSupport0x;
