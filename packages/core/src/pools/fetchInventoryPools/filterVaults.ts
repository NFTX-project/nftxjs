import type { Address, Vault } from '@nftx/types';
import { addressEqual } from '@nftx/utils';

const filterVaults = <V extends Pick<Vault, 'id' | 'vaultId'>>({
  vaultAddresses,
  vaultIds,
  vaults,
}: {
  vaultAddresses?: Address[];
  vaultIds?: string[];
  vaults: V[];
}) => {
  if (!vaultIds && !vaultAddresses) {
    return vaults;
  }

  return vaults.filter((vault) => {
    if (vaultIds && !vaultIds.includes(vault.vaultId)) {
      return false;
    }
    if (
      vaultAddresses &&
      !vaultAddresses.some((address) => addressEqual(address, vault.id))
    ) {
      return false;
    }
    return true;
  });
};

export default filterVaults;
