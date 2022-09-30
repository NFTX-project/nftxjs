import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import { queryApi } from '../utils';

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
