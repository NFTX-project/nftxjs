import config from '@nftx/config';
import type { Collection } from '@nftx/types';
import { queryApi } from '../utils';

/** Returns a list of all collections held by a user */
const fetchUserCollections = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: string;
}) => {
  const url = `/${network}/users/${userAddress}/collections`;
  return queryApi<Collection[]>({
    url,
  });
};

export default fetchUserCollections;
