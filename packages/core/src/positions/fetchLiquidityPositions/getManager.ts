import {
  NONFUNGIBLE_POSITION_MANAGER,
  Network,
  POOL_ROUTER,
} from '@nftx/constants';
import { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

const poolRouterAddresses: Record<string, Record<string, Address>> = {
  [Network.Sepolia]: {
    '0x55bdc76262b1e6e791d0636a0bc61cee23cdfa87':
      '0xd36ece08f76c50ec3f01db65bbc5ef5aa5fbe849',
  },
};

const getPoolRouterAddress = (network: number, managerAddress: Address) => {
  return (
    poolRouterAddresses[network]?.[managerAddress.toLowerCase()] ??
    getChainConstant(POOL_ROUTER, network)
  );
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
