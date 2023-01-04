import type { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import { queryApi } from '../utils';

type Response = Array<{
  type: 'inventory' | 'liquidity';
  amount: BigNumber;
  ethValue: BigNumber;
}>;

/** Get the lifetime yield amount for a specific position */
const fetchPositionYield = ({
  userAddress,
  vaultId,
  network = config.network,
}: {
  network?: number;
  userAddress: string;
  vaultId: string;
}) => {
  return queryApi<Response>({
    url: `/${network}/users/${userAddress}/positions/${vaultId}/yield`,
  });
};

export default fetchPositionYield;
