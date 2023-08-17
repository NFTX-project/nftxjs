import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import { queryApi } from '../utils';

/** Get all tokens held by a vault */
const fetchVaultAssets = ({
  vaultId,
  network = config.network,
}: {
  network?: number;
  vaultId: string;
}) => {
  return queryApi<Asset[]>({
    url: `/${network}/assets`,
    query: {
      vaultId,
    },
  });
};

export default fetchVaultAssets;
