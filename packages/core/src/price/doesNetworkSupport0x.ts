import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP } from '@nftx/constants';
import { getChainConstant } from '../web3';

const doesNetworkSupport0x = (network: number) => {
  return (
    // If 0x isn't explicitly disabled for a network, assume it's enabled
    // (unless the api and zaps don't exist)
    getChainConstant(config.contracts.use0xApi, network, true) === true &&
    getChainConstant(config.urls.ZEROX_URL, network, null) != null &&
    getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network, null) != null
  );
};

export default doesNetworkSupport0x;