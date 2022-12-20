import fetchReservesForTokens from './fetchReservesForTokens';

/**
 * Fetch token/weth reserves for the given address
 * The reserves are pulled from the Sushi subgraph
 * @returns Promise<{@link @nftx/types!TokenReserve}[]>
 */
const fetchReservesForToken = async ({
  network,
  tokenAddress,
}: {
  network: number;
  tokenAddress: string;
}) => {
  const results = await fetchReservesForTokens({
    network,
    tokenAddresses: [tokenAddress],
  });
  return results?.[0];
};

export default fetchReservesForToken;
