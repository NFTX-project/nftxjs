import config from '@nftx/config';
import type { Pool } from '@nftx/types';
import { queryApi } from '../utils';

const fetchPools = ({
  network = config.network,
  liquidityPoolId,
  liquidityPoolIds,
  vaultAddress,
  vaultAddresses,
  vaultId,
  vaultIds,
}: {
  network?: number;
  liquidityPoolId?: string;
  liquidityPoolIds?: string[];
  vaultAddress?: string;
  vaultAddresses?: string[];
  vaultId?: string;
  vaultIds?: string[];
} = {}) => {
  return queryApi<Pool[]>({
    url: `/${network}/pools`,
    query: {
      liquidityPoolId: liquidityPoolId ?? liquidityPoolIds,
      id: vaultAddress ?? vaultAddresses,
      vaultId: vaultId ?? vaultIds,
    },
  });
};
export default fetchPools;
