import config from '@nftx/config';
import type { VaultHolding } from '@nftx/types';
import { queryApi } from '../utils';

/** Get all tokens held by a vault */
const fetchVaultAssets = ({
  vaultId,
  network = config.network,
}: {
  network?: number;
  vaultId: string;
}) => {
  return queryApi<VaultHolding[]>({
    url: `/${network}/assets`,
    query: {
      vaultId,
    },
  });
};

export default fetchVaultAssets;
