import config from '@nftx/config';
import type { UserVaultBalance } from '@nftx/types';
import { queryApi } from '../utils';

const fetchVaultBalances = ({
  network = config.network,
  userAddress,
  type,
  types,
  vaultId,
}: {
  network?: number;
  userAddress: string;
  type?: string;
  types?: string[];
  vaultId: string;
}) => {
  return queryApi<UserVaultBalance[]>({
    url: `${network}/users/${userAddress}/balances/${vaultId}`,
    query: {
      type: type ?? types,
    },
  });
};

export default fetchVaultBalances;
