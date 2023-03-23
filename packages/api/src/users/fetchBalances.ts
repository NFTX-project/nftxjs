import config from '@nftx/config';
import type { UserVaultBalance, NftxTokenType, Address } from '@nftx/types';
import { queryApi } from '../utils';

type Type = keyof typeof NftxTokenType;

/**
 * Get a list of NFTX balances for a given user.
 * You can further filter the balances by type or vault.
 */
const fetchBalances = ({
  network = config.network,
  userAddress,
  type,
  types,
  vaultId,
  vaultIds,
}: {
  network?: number;
  userAddress: Address;
  type?: Type;
  types?: Type[];
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
