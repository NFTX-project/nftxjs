import fetchSpotPrice from './fetchSpotPrice';

const fetchEthPrice = async ({ network }: { network?: number }) => {
  const { price } = await fetchSpotPrice({
    network,
    tokenAddress: 'ETH',
    quoteToken: 'USDC',
  });

  return price;
};

export default fetchEthPrice;
