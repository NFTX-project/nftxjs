import { Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Address } from '../web3';
import fetchBuyPrice from './fetchBuyPrice';
import fetchSellPrice from './fetchSellPrice';

const fetchSpread = async ({
  network = config.network,
  provider,
  tokenAddress,
  quote,
  critical,
}: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  quote?: 'ETH';
  critical?: boolean;
}) => {
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
