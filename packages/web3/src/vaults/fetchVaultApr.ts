import fetchVaultAprs from './fetchVaultAprs';
import type { VaultAddress, VaultApr } from './types';

const fetchVaultArs = async ({
  vaultAddress,
}: {
  vaultAddress: VaultAddress;
}): Promise<VaultApr> => {
  const [vaultApy] = await fetchVaultAprs({ vaultAddresses: [vaultAddress] });
  return vaultApy;
};

export default fetchVaultArs;
