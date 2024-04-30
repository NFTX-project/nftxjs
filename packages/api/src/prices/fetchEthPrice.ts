import fetchSpotPrice from './fetchSpotPrice';

/** Returns the current price of ETH in USDC terms */
const fetchEthPrice = async ({ network }: { network?: number }) => {
  const { price } = await fetchSpotPrice({
    network,
    tokenAddress: 'ETH',
    quoteToken: 'USDC',
  });

  return price;
};

export default fetchEthPrice;
