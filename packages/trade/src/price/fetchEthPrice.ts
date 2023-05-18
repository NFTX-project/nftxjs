import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import fetchNftxQuote from './fetchNftxQuote';
import doesNetworkSupportNftxRouter from './doesNetworkSupportNftxRouter';

const fetchEthPriceFromNftxRouter = async ({
  network,
}: {
  network: number;
}) => {
  const { quote } = await fetchNftxQuote({
    network,
    buyToken: 'ETH',
    sellToken: 'USDC',
    buyAmount: WeiPerEther,
  });

  return BigInt(quote);
};

const fetchEthPriceFrom0x = async ({ network }: { network: number }) => {
  const { sellAmount } = await fetch0xPrice({
    network,
    buyToken: 'ETH',
    sellToken: 'USDC',
    buyAmount: WeiPerEther,
  });

  return BigInt(sellAmount);
};

/** Fetches the current ETH price in $ terms.
 * For test networks and testing in general, you can configure a hardcoded price using nftx.js's configure method.
 */
const fetchEthPrice = (args: { network?: number }) => {
  const { network = config.network } = args;

  const hardcodedPrice = getChainConstant(
    config.contracts.ethPrice,
    network,
    null
  );
  if (hardcodedPrice != null) {
    return BigInt(hardcodedPrice);
  }

  if (doesNetworkSupportNftxRouter(network)) {
    return fetchEthPriceFromNftxRouter({ network });
  }
  if (doesNetworkSupport0x(network)) {
    return fetchEthPriceFrom0x({ network });
  }
  throw new Error(`fetchEthPrice is not supported for network ${network}`);
};

export default fetchEthPrice;
