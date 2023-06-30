import config from '@nftx/config';
import type { VTokenBalance, Address } from '@nftx/types';
import { queryApi } from '../utils';

const fetchVTokenBalances = ({
  network = config.network,
  userAddress,
  vaultAddress,
  vaultId,
}: {
  network?: number;
  userAddress?: Address;
  vaultId?: string;
  vaultAddress?: Address;
}) => {
  return queryApi<VTokenBalance[]>({
    url: `/${network}/balances`,
    query: { userAddress, vaultAddress, vaultId },
  });
};

export default fetchVTokenBalances;
