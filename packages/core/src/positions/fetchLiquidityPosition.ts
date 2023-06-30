import config from '@nftx/config';
import type { Address, Provider } from '@nftx/types';
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
    provider,
  }: {
    positionId: Address;
    provider: Provider;
    network?: number;
  }) {
    const [position] = await fetchLiquidityPositions({
      provider,
      positionIds: [positionId],
    });
    return position;
  };

export default makeFetchLiquidityPosition({ fetchLiquidityPositions });
