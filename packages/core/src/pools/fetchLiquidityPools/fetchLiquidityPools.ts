import config from '@nftx/config';
import type { Address, LiquidityPool, Provider, Vault } from '@nftx/types';
import fetchPoolsSet from './fetchPoolsSet';
import stubMissingPools from './stubMissingPools';
import { fetchFeeReceipts } from '../../vaults';
import fetchPremiumPaids from '../fetchPremiumPaids';

type FetchPoolsSet = typeof fetchPoolsSet;
type StubMissingPools = typeof stubMissingPools;
type FetchFeeReceipts = typeof fetchFeeReceipts;
type FetchPremiumnPaids = typeof fetchPremiumPaids;

export const makeFetchLiquidityPools =
  ({
    fetchFeeReceipts,
    fetchPoolsSet,
    fetchPremiumPaids,
    stubMissingPools,
  }: {
    fetchPoolsSet: FetchPoolsSet;
    stubMissingPools: StubMissingPools;
    fetchFeeReceipts: FetchFeeReceipts;
    fetchPremiumPaids: FetchPremiumnPaids;
  }) =>
  async ({
    network = config.network,
    vaultIds,
    vaultAddresses,
    poolIds,
    vaults,
    provider,
    exists,
  }: {
    network?: number;
    /** Only return pools for a specific vault */
    vaultAddresses?: Address[];
    /** Only return pools for specific vault ids */
    vaultIds?: string[];
    poolIds?: Address[];
    /** Only return pools that exist */
    exists?: boolean;
    vaults: Pick<
      Vault,
      'vaultId' | 'id' | 'vTokenToEth' | 'token' | 'createdAt'
    >[];
    provider: Provider;
  }): Promise<LiquidityPool[]> => {
    const allVaultAddresses = vaults.map((v) => v.id);
    const feeReceipts = await fetchFeeReceipts({
      network,
      vaultAddresses: allVaultAddresses,
    });
    const premiumPaids = await fetchPremiumPaids({
      network,
    });

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
        feeReceipts,
        premiumPaids,
      });

      pools.push(...morePools);
    } while (lastId);

    if (!exists) {
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
    }

    return pools;
  };

const fetchLiquidityPools = makeFetchLiquidityPools({
  fetchFeeReceipts,
  fetchPoolsSet,
  fetchPremiumPaids,
  stubMissingPools,
});

export default fetchLiquidityPools;
