import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { queryApi } from '../utils';

type Response = Array<{
  type: 'inventory' | 'liquidity';
  amount: bigint;
  ethValue: bigint;
}>;

/** Get the lifetime yield amount for a specific position */
const fetchPositionYield = ({
  userAddress,
  vaultId,
  network = config.network,
}: {
  network?: number;
  userAddress: Address;
  vaultId: string;
}) => {
  return queryApi<Response>({
    url: `/${network}/users/${userAddress}/positions/${vaultId}/yield`,
  });
};

export default fetchPositionYield;
