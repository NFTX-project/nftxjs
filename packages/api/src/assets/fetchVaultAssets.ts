import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import { queryApi } from '../utils';

/** Get all tokens held by a vault */
const fetchVaultAssets = async ({
  vaultId,
  network = config.network,
}: {
  network?: number;
  vaultId: string;
}) => {
  const { assets } = await queryApi<{ assets: Asset[] }>({
    url: `/${network}/assets`,
    query: {
      vaultId,
    },
  });
  return assets;
};

export default fetchVaultAssets;
