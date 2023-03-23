import config from '@nftx/config';
import type { VaultActivity } from '@nftx/types';
import { queryApi } from '../utils';

/** Get recent vault activity for a specific vault */
const fetchVaultActivity = ({
  network = config.network,
  fromTimestamp,
  vaultId,
}: {
  network?: number;
  fromTimestamp?: number;
  vaultId: string;
}) => {
  if (fromTimestamp != null) {
    // Round timestamps to the nearest 60m
    fromTimestamp = Math.floor(Math.round(fromTimestamp / 3600) * 3600);
  }

  return queryApi<VaultActivity[]>({
    url: `/${network}/vaults/${vaultId}/activity`,
    query: {
      fromTimestamp,
    },
  });
};

export default fetchVaultActivity;
