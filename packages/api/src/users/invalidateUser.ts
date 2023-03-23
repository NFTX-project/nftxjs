import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { bustCache, queryApi } from '../utils';

/**
 * Flags a user as stale and waits for the NFTX api to refetch the user's positions and balances
 */
const invalidateUser = async ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: Address;
}) => {
  await queryApi({
    url: `/${network}/users/${userAddress}`,
    method: 'POST',
  });
  bustCache();
};

export default invalidateUser;
