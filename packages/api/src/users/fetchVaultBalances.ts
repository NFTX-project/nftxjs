import config from '@nftx/config';
import type { Address, NftxTokenType, UserVaultBalance } from '@nftx/types';
import { queryApi } from '../utils';

type Type = keyof typeof NftxTokenType;

/**
 * Get a list of NFTX balances for a given user/vault.
 * You can further filter the balances by type.
 */
const fetchVaultBalances = ({
  network = config.network,
  userAddress,
  type,
  types,
  vaultId,
}: {
  network?: number;
  userAddress: Address;
  type?: Type;
  types?: Type[];
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
