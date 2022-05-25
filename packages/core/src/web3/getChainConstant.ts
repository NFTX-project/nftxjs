import { Network } from '@nftx/constants';

const getChainConstant = <T>(
  obj: Record<number, T>,
  network: number,
  fallback = obj[Network.Mainnet]
): T => {
  return obj[network] ?? fallback;
};

export default getChainConstant;
