import config from '@nftx/config';
import { bustCache, queryApi } from '../utils';

const invalidateVault = async ({
  vaultId,
  network = config.network,
}: {
  network?: number;
  vaultId: string;
}) => {
  await queryApi({
    url: `/${network}/vaults/${vaultId}`,
    method: 'POST',
  });
  bustCache();
};

export default invalidateVault;
