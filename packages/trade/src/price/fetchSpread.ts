import { Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import fetchBuyPrice from './fetchBuyPrice';
import fetchSellPrice from './fetchSellPrice';
import type { BigNumber } from '@ethersproject/bignumber';

const fetchSpread = async ({
  network = config.network,
  provider,
  tokenAddress,
  quote,
  critical,
}: {
  network?: number;
  provider: Provider;
  tokenAddress: string;
  quote?: 'ETH';
  critical?: boolean;
}): Promise<BigNumber> => {
  try {
    const { price: buyPrice } = await fetchBuyPrice({
      network,
      provider,
      tokenAddress,
      quote,
      critical,
    });
    const { price: sellPrice } = await fetchSellPrice({
      network,
      provider,
      tokenAddress,
      quote,
      critical,
    });

    return buyPrice.sub(sellPrice);
  } catch {
    return Zero;
  }
};

export default fetchSpread;
