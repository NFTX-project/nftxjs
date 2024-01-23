import config from '@nftx/config';
import type {
  Address,
  LiquidityPosition,
  Provider,
  TokenId,
  Vault,
} from '@nftx/types';
import fetchPoolIdsForVaultIds from './fetchPoolIdsForVaultIds';
import fetchPositionsSet from './fetchPositionsSet';
import { WeiPerEther, Zero } from '@nftx/constants';

type FetchPoolIdsForVaultIds = typeof fetchPoolIdsForVaultIds;
type FetchPositionsSet = typeof fetchPositionsSet;

const updatePoolShares = (positions: LiquidityPosition[]) => {
  const poolVTokens: Record<string, bigint> = {};
  positions.forEach((position) => {
    const { poolId, vToken } = position;
    const current = poolVTokens[poolId] ?? Zero;
    const updated = current + vToken;

    poolVTokens[poolId] = updated;
  });

  positions.forEach((position) => {
    const { vToken, poolId } = position;
    const total = poolVTokens[poolId];

    if (!total) {
      return;
    }

    const share = (vToken * WeiPerEther) / total;

    position.poolShare = share;
  });
};

export const makeFetchLiquidityPositions =
  ({
    fetchPoolIdsForVaultIds,
    fetchPositionsSet,
  }: {
    fetchPoolIdsForVaultIds: FetchPoolIdsForVaultIds;
    fetchPositionsSet: FetchPositionsSet;
  }) =>
  async ({
    userAddresses,
    vaultIds,
    poolIds,
    positionIds,
    tokenIds,
    network = config.network,
    vaults,
    provider,
  }: {
    userAddresses?: Address[];
    vaultIds?: string[];
    poolIds?: Address[];
    positionIds?: Address[];
    tokenIds?: TokenId[];
    network?: number;
    vaults: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>[];
    provider: Provider;
  }): Promise<LiquidityPosition[]> => {
    if (vaultIds) {
      poolIds = await fetchPoolIdsForVaultIds({ network, vaultIds, vaults });
    }

    const positions: LiquidityPosition[] = [];
    let lastId: Address | undefined;

    do {
      let morePositions: LiquidityPosition[];

      [morePositions, lastId] = await fetchPositionsSet({
        lastId,
        network,
        vaults,
        poolIds,
        positionIds,
        userAddresses,
        provider,
        tokenIds,
      });

      positions.push(...morePositions);
    } while (lastId);

    updatePoolShares(positions);

    return positions;
  };

const fetchLiquidityPositions = makeFetchLiquidityPositions({
  fetchPoolIdsForVaultIds,
  fetchPositionsSet,
});

export default fetchLiquidityPositions;
