import config from '@nftx/config';
import { NFTX_ROUTER } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';

const doesNetworkSupportNftxRouter = (network: number) => {
  return (
    getChainConstant(config.urls.NFTX_ROUTER_URL, network, null) != null &&
    getChainConstant(NFTX_ROUTER, network, null) != null
  );
};

export default doesNetworkSupportNftxRouter;
