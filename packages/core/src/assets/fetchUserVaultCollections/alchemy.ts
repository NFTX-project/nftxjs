import type { Vault } from '@nftx/types';
import { addressEqual, isCryptoKitty } from '@nftx/utils';
import fetchUserCollections from '../fetchUserCollections';

const fetchUserVaultCollectionsAlchemy = async ({
  network,
  userAddress,
  vaults,
}: {
  network: number;
  userAddress: string;
  vaults: Pick<Vault, 'asset' | 'vaultId'>[];
}) => {
  const contracts = await fetchUserCollections({ network, userAddress });

  return (
    contracts?.flatMap((collection) => {
      return vaults
        .filter(
          (v) =>
            addressEqual(v.asset.id, collection.address) &&
            !isCryptoKitty(v.asset.id)
        )
        .map((vault) => {
          return {
            ...collection,
            vaultId: vault.vaultId,
          };
        });
    }) ?? []
  );
};

export default fetchUserVaultCollectionsAlchemy;
