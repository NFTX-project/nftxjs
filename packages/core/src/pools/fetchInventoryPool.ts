import config from '@nftx/config';
import fetchInventoryPools from './fetchInventoryPools';
import type { Provider, Vault } from '@nftx/types';

type FetchInventoryPools = typeof fetchInventoryPools;

export const makeFetchInventoryPool =
  ({ fetchInventoryPools }: { fetchInventoryPools: FetchInventoryPools }) =>
  async ({
    vaultId,
    network = config.network,
    provider,
    vaults,
  }: {
    network?: number;
    vaultId: string;
    provider: Provider;
    vaults?: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>[];
  }) => {
    const pools = await fetchInventoryPools({
      network,
      vaultIds: [vaultId],
      provider,
      vaults,
    });
    return pools?.[0];
  };

export default makeFetchInventoryPool({ fetchInventoryPools });
