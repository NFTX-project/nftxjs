import type { VaultAddress, VaultApr } from './types';

const fetchVaultAprs = async ({
  vaultAddresses,
}: {
  vaultAddresses: VaultAddress[];
}): Promise<VaultApr[]> => {
  // TODO: implement this
  console.warn('fetchVaultAprs is currently stubbed');
  return vaultAddresses.map((vaultAddress): VaultApr => {
    return {
      vaultAddress,
      vaultId: '0',
      liquidityApr: Math.floor(Math.random() * 300) / 100,
      inventoryApr: Math.floor(Math.random() * 100) / 100,
    };
  });
};

export default fetchVaultAprs;
