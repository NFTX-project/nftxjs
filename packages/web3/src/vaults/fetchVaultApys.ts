import type { VaultAddress, VaultApy } from './types';

const fetchVaultApys = async ({
  vaultAddresses,
}: {
  vaultAddresses: VaultAddress[];
}): Promise<VaultApy[]> => {
  // TODO: implement this
  console.warn('fetchVaultApys is currently stubbed');
  return vaultAddresses.map((vaultAddress): VaultApy => {
    return {
      vaultAddress,
      vaultId: '0',
      liquidityApy: Math.floor(Math.random() * 300) / 100,
      inventoryApy: Math.floor(Math.random() * 100) / 100,
    };
  });
};

export default fetchVaultApys;
