import { Network } from '@nftx/constants';

/** Takes an network/value key pair and returns the value for the current network */
const getChainConstant = <T>(
  obj: Record<number, T>,
  network: number,
  fallback: T = obj[Network.Mainnet]
): T => {
  return obj[network] ?? fallback;
};

export default getChainConstant;
