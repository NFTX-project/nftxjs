import {
  NONFUNGIBLE_POSITION_MANAGER,
  POOL_ROUTER,
  POOL_ROUTER_LEGACY,
} from '@nftx/constants';
import { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

const getPoolRouterAddress = (network: number, managerAddress: Address) => {
  const legacyAddresses = getChainConstant(POOL_ROUTER_LEGACY, network, {});
  const address = legacyAddresses[managerAddress.toLowerCase()];
  return address || getChainConstant(POOL_ROUTER, network);
};

const getManagerAddress = (
  network: number,
  position: { nfpmAddress: string }
) => {
  return (
    (position.nfpmAddress as Address) ||
    getChainConstant(NONFUNGIBLE_POSITION_MANAGER, network)
  );
};

const getManager = (network: number, position: { nfpmAddress: string }) => {
  const manager = getManagerAddress(network, position);
  const poolRouter = getPoolRouterAddress(network, manager);
  return { manager, poolRouter };
};

export default getManager;
