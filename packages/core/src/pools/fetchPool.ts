import config from '@nftx/config';
import type { VaultAddress } from '../vaults/types';
import fetchPools from './fetchPools';

/** Fetches a single pool */
const fetchPool = async ({
  network = config.network,
  vaultAddress,
}: {
  network?: number;
  vaultAddress: VaultAddress;
}) => {
  const pools = await fetchPools({ network, vaultAddress });

  return pools?.[0];
};

export default fetchPool;
