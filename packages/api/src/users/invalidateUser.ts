import config from '@nftx/config';
import { bustCache, queryApi } from '../utils';

const invalidateUser = async ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: string;
}) => {
  await queryApi({
    url: `/${network}/users/${userAddress}`,
    method: 'POST',
  });
  bustCache();
};

export default invalidateUser;
