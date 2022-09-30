import config from '@nftx/config';
import type { VaultActivity } from '@nftx/types';
import { queryApi } from '../utils';

const fetchVaultActivity = ({
  network = config.network,
  fromTimestamp,
  vaultId,
}: {
  network?: number;
  fromTimestamp?: number;
  vaultId: string;
}) => {
  if (fromTimestamp) {
    // Round timestamps to the nearest 30s
    fromTimestamp = Math.floor(Math.round(fromTimestamp / 60) * 60);
  }

  return queryApi<VaultActivity[]>({
    url: `/${network}/vaults/${vaultId}/activity`,
    query: {
      fromTimestamp,
    },
  });
};

export default fetchVaultActivity;
