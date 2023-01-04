import config from '@nftx/config';
import { queryApi } from '../utils';

type Response = { vaultId: string; assetAddress: string }[];

/** Returns a list of all collections held by a user that have a corresponding NFTX vault */
const fetchUserVaultCollections = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: string;
}) => {
  const url = `/${network}/users/${userAddress}/vault-collections`;
  return queryApi<Response>({
    url,
  });
};

export default fetchUserVaultCollections;
