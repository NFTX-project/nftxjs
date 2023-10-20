import config from '@nftx/config';
import type { Address, LiquidityPosition, Provider, Vault } from '@nftx/types';
import fetchPoolIdsForVaultIds from './fetchPoolIdsForVaultIds';
import fetchPositionsSet from './fetchPositionsSet';

const fetchLiquidityPositions = async ({
  userAddresses,
  vaultIds,
  poolIds,
  positionIds,
  network = config.network,
  vaults,
  provider,
}: {
  userAddresses?: Address[];
  vaultIds?: string[];
  poolIds?: Address[];
  positionIds?: Address[];
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
    });

    positions.push(...morePositions);
  } while (lastId);

  return positions;
};

export default fetchLiquidityPositions;
