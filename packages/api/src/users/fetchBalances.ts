import config from '@nftx/config';
import type { UserVaultBalance } from '@nftx/types';
import { queryApi } from '../utils';

const fetchBalances = ({
  network = config.network,
  userAddress,
  type,
  types,
  vaultId,
  vaultIds,
}: {
  network?: number;
  userAddress: string;
  type?: string;
  types?: string[];
  vaultId?: string;
  vaultIds?: string[];
}) => {
  return queryApi<UserVaultBalance[]>({
    url: `/${network}/users/${userAddress}/balances`,
    query: {
      type: type ?? types,
      vaultId: vaultId ?? vaultIds,
    },
  });
};

export default fetchBalances;
