import config from '@nftx/config';
import type { Address, Provider, Vault } from '@nftx/types';
import fetchLiquidityPositions from './fetchLiquidityPositions';

type FetchLiquidityPositions = typeof fetchLiquidityPositions;

export const makeFetchLiquidityPosition = ({
  fetchLiquidityPositions,
}: {
  fetchLiquidityPositions: FetchLiquidityPositions;
}) =>
  /** Fetch useful information about a user's position such as their inventory/liquidity balances, pool split, pool share */
  async function fetchLiquidityPosition({
    positionId,
    network = config.network,
    vaults,
    provider,
  }: {
    positionId: Address;
    network?: number;
    vaults: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>[];
    provider: Provider;
  }) {
    const [position] = await fetchLiquidityPositions({
      network,
      positionIds: [positionId],
      vaults,
      provider,
    });
    return position;
  };

export default makeFetchLiquidityPosition({ fetchLiquidityPositions });
