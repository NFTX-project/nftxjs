import config from '@nftx/config';
import type { VaultFeeReceipt } from '@nftx/types';
import { queryApi } from '../utils';

const fetchVaultFees = ({
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

  return queryApi<VaultFeeReceipt[]>({
    url: `/${network}/vaults/${vaultId}/fees`,
    query: {
      fromTimestamp,
    },
  });
};

export default fetchVaultFees;
