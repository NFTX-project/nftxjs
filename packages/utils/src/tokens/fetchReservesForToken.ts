import type { Address } from '@nftx/types';
import type fetchReservesForTokens from './fetchReservesForTokens';

type FetchReservesForTokens = ReturnType<typeof fetchReservesForTokens>;

/**
 * Fetch token/weth reserves for the given address
 * The reserves are pulled from the Sushi subgraph
 * @returns Promise<{@link @nftx/types!TokenReserve}[]>
 */
const fetchReservesForToken =
  ({
    fetchReservesForTokens,
  }: {
    fetchReservesForTokens: FetchReservesForTokens;
  }) =>
  async ({
    network,
    tokenAddress,
  }: {
    network: number;
    tokenAddress: Address;
  }) => {
    const results = await fetchReservesForTokens({
      network,
      tokenAddresses: [tokenAddress],
    });
    return results?.[0];
  };

export default fetchReservesForToken;
