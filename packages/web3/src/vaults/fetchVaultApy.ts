import fetchVaultApys from './FetchVaultApys';
import type { VaultAddress, VaultApy } from './types';

const fetchVaultApy = async ({
  vaultAddress,
}: {
  vaultAddress: VaultAddress;
}): Promise<VaultApy> => {
  const [vaultApy] = await fetchVaultApys({ vaultAddresses: [vaultAddress] });
  return vaultApy;
};

export default fetchVaultApy;
