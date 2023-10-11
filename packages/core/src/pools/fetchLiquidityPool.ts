import config from '@nftx/config';
import fetchLiquidityPools from './fetchLiquidityPools';
import type { Address, Provider, Vault } from '@nftx/types';

/** Fetches a single pool */
const makeFetchLiquidityPool =
  () =>
  async ({
    network = config.network,
    poolId,
    provider,
    vaults,
  }: {
    network?: number;
    poolId: Address;
    provider: Provider;
    vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth' | 'token'>[];
  }) => {
    const pools = await fetchLiquidityPools({
      network,
      poolIds: [poolId],
      provider,
      vaults,
    });

    return pools?.[0];
  };

export default makeFetchLiquidityPool();
