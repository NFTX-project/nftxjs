import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { queryApi } from '../utils';

type Response = { vaultId: string; assetAddress: string }[];

/** Returns a list of all collections held by a user that have a corresponding NFTX vault */
const fetchUserVaultCollections = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: Address;
}) => {
  const url = `${network}/collections`;
  return queryApi<Response>({
    url,
    query: { userAddress, mintable: true },
  });
};

export default fetchUserVaultCollections;
