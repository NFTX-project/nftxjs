import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import { queryApi } from '../utils';

const fetchVault = ({
  vaultId,
  network = config.network,
}: {
  network?: number;
  vaultId: string;
}) => {
  return queryApi<Vault>({
    url: `/${network}/vaults/${vaultId}`,
  });
};

export default fetchVault;
