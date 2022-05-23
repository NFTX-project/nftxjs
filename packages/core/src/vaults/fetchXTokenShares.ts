import type { Provider } from '@ethersproject/providers';
import fetchXTokenShare from './fetchXTokenShare';
import type { VaultId } from './types';

const fetchXTokenShares = async ({
  network,
  provider,
  vaultIds,
}: {
  network: number;
  provider: Provider;
  vaultIds: VaultId[];
}) => {
  const shares = await Promise.all(
    vaultIds.map(async (vaultId) => {
      try {
        const share = await fetchXTokenShare({ network, provider, vaultId });
        return { vaultId, share };
      } catch (e) {
        console.warn(e);
        return null;
      }
    })
  );

  return shares.filter(Boolean);
};

export default fetchXTokenShares;
