import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import { queryApi } from '../utils';

/** Get vaults created and managed by a user */
const fetchManagedVaults = ({
  userAddress,
  network = config.network,
}: {
  network?: number;
  userAddress: string;
}) => {
  return queryApi<Vault[]>({
    url: `/${network}/users/${userAddress}/vaults`,
  });
};

export default fetchManagedVaults;
