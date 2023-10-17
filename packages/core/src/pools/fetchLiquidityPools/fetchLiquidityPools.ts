import config from '@nftx/config';
import type { Address, LiquidityPool, Provider, Vault } from '@nftx/types';
import fetchPoolsSet from './fetchPoolsSet';
import stubMissingPools from './stubMissingPools';

const fetchLiquidityPools = async ({
  network = config.network,
  vaultIds,
  vaultAddresses,
  poolIds,
  vaults,
  provider,
}: {
  network?: number;
  /** Only return pools for a specific vault */
  vaultAddresses?: Address[];
  /** Only return pools for specific vault ids */
  vaultIds?: string[];
  poolIds?: Address[];
  vaults: Pick<
    Vault,
    'vaultId' | 'id' | 'vTokenToEth' | 'token' | 'createdAt'
  >[];
  provider: Provider;
}): Promise<LiquidityPool[]> => {
  const pools: LiquidityPool[] = [];
  let lastId: Address | undefined;

  do {
    let morePools: LiquidityPool[];

    [morePools, lastId] = await fetchPoolsSet({
      network,
      vaults,
      poolIds,
      vaultAddresses,
      vaultIds,
    });

    pools.push(...morePools);
  } while (lastId);

  const missingPools = await stubMissingPools({
    network,
    pools,
    provider,
    vaults,
    poolIds,
    vaultAddresses,
    vaultIds,
  });

  pools.push(...missingPools);

  return pools;
};

export default fetchLiquidityPools;
