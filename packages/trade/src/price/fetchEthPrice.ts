import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import fetchQuote from './fetchQuote';

const fetchEthPriceFromNftxRouter = async ({
  network,
}: {
  network: number;
}) => {
  const { quote } = await fetchQuote({
    network,
    buyToken: 'ETH',
    sellToken: 'USDC',
    buyAmount: WeiPerEther,
  });

  return BigInt(quote);
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

  return fetchEthPriceFromNftxRouter({ network });
};

export default fetchEthPrice;
