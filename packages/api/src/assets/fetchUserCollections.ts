import config from '@nftx/config';
import type { Address, Collection } from '@nftx/types';
import { queryApi } from '../utils';

/** Returns a list of all collections held by a user */
const fetchUserCollections = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: Address;
}) => {
  const url = `/${network}/collections`;
  return queryApi<Collection[]>({
    url,
    query: { userAddress },
  });
};

export default fetchUserCollections;
