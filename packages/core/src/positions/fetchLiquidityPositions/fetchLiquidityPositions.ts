import config from '@nftx/config';
import type { Address, LiquidityPosition, Provider, Vault } from '@nftx/types';
import { fetchVaults } from '../../vaults';
import fetchPoolIdsForVaultIds from './fetchPoolIdsForVaultIds';
import fetchPositionsSet from './fetchPositionsSet';

const fetchLiquidityPositions = async ({
  userAddresses,
  vaultIds,
  poolIds,
  positionIds,
  network = config.network,
  provider,
  vaults: givenVaults,
}: {
  userAddresses?: Address[];
  vaultIds?: string[];
  poolIds?: Address[];
  positionIds?: Address[];
  network?: number;
  provider: Provider;
  vaults?: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>[];
}): Promise<LiquidityPosition[]> => {
  const vaults = givenVaults ?? (await fetchVaults({ provider, network }));

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
    });

    positions.push(...morePositions);
  } while (lastId);

  return positions;
};

export default fetchLiquidityPositions;
