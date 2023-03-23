import type { Address } from '@nftx/types';
import fetchVaultAprs from './fetchVaultAprs';

const fetchVaultArs = async ({ vaultAddress }: { vaultAddress: Address }) => {
  const [vaultApy] = await fetchVaultAprs({ vaultAddresses: [vaultAddress] });
  return vaultApy;
};

export default fetchVaultArs;
