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
}: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  quote?: 'ETH';
}) => {
  try {
    const buyPrice = await fetchBuyPrice({
      network,
      provider,
      tokenAddress,
      quote,
    });
    const sellPrice = await fetchSellPrice({
      network,
      provider,
      tokenAddress,
      quote,
    });

    return buyPrice.sub(sellPrice);
  } catch {
    return Zero;
  }
};

export default fetchSpread;
