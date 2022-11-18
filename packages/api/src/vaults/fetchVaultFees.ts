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
    // Round timestamps to the nearest 60m
    fromTimestamp = Math.floor(Math.round(fromTimestamp / 3600) * 3600);
  }

  return queryApi<VaultFeeReceipt[]>({
    url: `/${network}/vaults/${vaultId}/fees`,
    query: {
      fromTimestamp,
    },
  });
};

export default fetchVaultFees;
