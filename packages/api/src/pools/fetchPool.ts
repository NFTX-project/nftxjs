import config from '@nftx/config';
import type { Pool } from '@nftx/types';
import { queryApi } from '../utils';

const fetchPool = ({
  network = config.network,
  vaultId,
}: {
  network?: number;
  vaultId: string;
}) => {
  return queryApi<Pool>({
    url: `/${network}/pools/${vaultId}`,
  });
};

export default fetchPool;
