import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { queryApi } from '../utils';

type Response = {
  lifetimeYield: bigint;
};

/**
 * Gets the lifetime amount of yield a user has earned in ETH
 */
const fetchUserYield = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: Address;
}) => {
  return queryApi<Response>({
    url: `/${network}/users/${userAddress}/yield`,
  });
};

export default fetchUserYield;
