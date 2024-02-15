import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import type { NftxV3Uniswap, Address, Vault } from '@nftx/types';

type QuerySubgraph = typeof querySubgraph;

const ONE_DAY = 60 * 60 * 24;
const ONE_WEEK = ONE_DAY * 7;

const getAddressesForVaultIds = (
  vaultIds: string[],
  vaults: Pick<Vault, 'id' | 'vaultId'>[]
) => {
  return vaults.reduce((acc, vault) => {
    if (vaultIds.includes(vault.vaultId)) {
      return [...acc, vault.id];
    }
    return acc;
  }, [] as Address[]);
};

export const makeQueryPoolData =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  ({
    network,
    vaults,
    poolIds,
    vaultAddresses,
    vaultIds,
  }: {
    network: number;
    vaults: Pick<Vault, 'id' | 'vaultId'>[];
    poolIds?: Address[];
    vaultAddresses?: Address[];
    vaultIds?: string[];
  }) => {
    if (vaultIds) {
      vaultAddresses = getAddressesForVaultIds(vaultIds, vaults);
    }

    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - ONE_DAY;
    const oneWeekAgo = now - ONE_WEEK;

    const q = createQuery<NftxV3Uniswap.Query>();
    const query = q.liquidityPools
      .first(1000)
      .orderBy('id')
      .where((w) => [
        w.id.in(poolIds),
        w.inputTokens((w) => [w.id.in(vaultAddresses)]),
      ])
      .select((s) => [
        s.id,
        s.name,
        s.tick,
        s.totalLiquidity,
        s.activeLiquidity,
        s.inputTokenBalances,
        s.totalValueLockedETH,
        s.openPositionCount,
        s.createdTimestamp,
        s.fees((fee) => [fee.id, fee.feePercentage, fee.feeType]),
        s.inputTokens((token) => [token.id, token.symbol, token.name]),
        s.hourlySnapshots(
          q.liquidityPoolHourlySnapshots
            .first(1000)
            .orderBy('hour')
            .orderDirection('desc')
            .select((s) => [
              s.hourlyVolumeByTokenAmount,
              s.hourlyTotalRevenueETH,
              s.id,
              s.inputTokenBalances,
              s.timestamp,
            ])
        ),
        s.dailySnapshots(
          q.liquidityPoolDailySnapshots
            .first(1000)
            .orderBy('day')
            .orderDirection('desc')
            .select((s) => [
              s.id,
              s.day,
              s.dailyVolumeByTokenAmount,
              s.dailyTotalRevenueETH,
              s.inputTokenBalances,
              s.timestamp,
            ])
        ),
      ]);

    return querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_UNISWAP_SUBGRAPH, network),
      query,
    });
  };

const queryPoolData = makeQueryPoolData({ querySubgraph });

export default queryPoolData;
