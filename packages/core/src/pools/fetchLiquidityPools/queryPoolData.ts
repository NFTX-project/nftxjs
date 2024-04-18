import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import type { NftxV3Uniswap, Address, Vault } from '@nftx/types';

type QuerySubgraph = typeof querySubgraph;

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

    const q = createQuery<NftxV3Uniswap.Query>();
    const query = q.pools
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
        s.liquidity,
        s.totalLiquidity,
        s.totalValueLockedToken0,
        s.totalValueLockedToken1,
        s.totalValueLockedETH,
        s.openPositionCount,
        s.createdAtTimestamp,
        s.token0((token0) => [token0.id, token0.symbol, token0.name]),
        s.token1((token1) => [token1.id, token1.symbol, token1.name]),
        s.fees((fee) => [fee.id, fee.feePercentage, fee.feeType]),
        s.inputTokens((token) => [token.id, token.symbol, token.name]),
        s.poolHourData(
          q.poolHourDatas
            .first(1000)
            .orderBy('periodStartUnix')
            .orderDirection('desc')
            .select((s) => [
              s.volumeToken0,
              s.volumeToken1,
              s.feesETH,
              s.id,
              s.totalValueLockedToken0,
              s.totalValueLockedToken1,
              s.periodStartUnix,
            ])
        ),
        s.poolDayData(
          q.poolDayDatas
            .first(1000)
            .orderBy('date')
            .orderDirection('desc')
            .select((s) => [
              s.id,
              s.date,
              s.volumeToken0,
              s.volumeToken1,
              s.feesETH,
              s.totalValueLockedToken0,
              s.totalValueLockedToken1,
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
