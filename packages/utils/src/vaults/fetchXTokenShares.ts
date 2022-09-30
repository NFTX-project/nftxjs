import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import fetchXTokenShare from './fetchXTokenShare';

const fetchXTokenShares = async ({
  network = config.network,
  provider,
  vaultIds,
}: {
  network?: number;
  provider: Provider;
  vaultIds: string[];
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
