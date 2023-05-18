import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';

const doesNetworkSupport0x = (network: number) => {
  return (
    getChainConstant(config.urls.ZEROX_PRICE_URL, network, null) != null &&
    getChainConstant(config.urls.ZEROX_QUOTE_URL, network, null) != null &&
    getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network, null) != null
  );
};

export default doesNetworkSupport0x;
