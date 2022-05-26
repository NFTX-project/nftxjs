import fetchVaultAprs from './fetchVaultAprs';

const fetchVaultArs = async ({ vaultAddress }: { vaultAddress: string }) => {
  const [vaultApy] = await fetchVaultAprs({ vaultAddresses: [vaultAddress] });
  return vaultApy;
};

export default fetchVaultArs;
