import config from '@nftx/config';
import type { Address, Vault } from '@nftx/types';
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
  }: {
    positionId: Address;
    network?: number;
    vaults: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>[];
  }) {
    const [position] = await fetchLiquidityPositions({
      network,
      positionIds: [positionId],
      vaults,
    });
    return position;
  };

export default makeFetchLiquidityPosition({ fetchLiquidityPositions });
