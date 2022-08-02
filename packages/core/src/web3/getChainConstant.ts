import { Network } from '@nftx/constants';

const getChainConstant = <T>(
  obj: Record<number, T>,
  network: number,
  fallback?: T
): T => {
  return obj[network] ?? fallback ?? obj[Network.Mainnet];
};

export default getChainConstant;
