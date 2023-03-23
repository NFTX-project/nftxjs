import config from '@nftx/config';
import {
  UNISWAP_QUOTER,
  USDC,
  WeiPerEther,
  WETH_TOKEN,
  Zero,
} from '@nftx/constants';
import { UniswapQuoter } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import type { Provider } from '@nftx/types';

const fetchEthPriceFromApi = async ({ network }: { network: number }) => {
  const { sellAmount } = await fetch0xPrice({
    network,
    buyToken: 'ETH',
    sellToken: 'USDC',
    buyAmount: WeiPerEther,
  });

  return BigInt(sellAmount);
};

const fetchEthPriceFromWeb3 = async ({
  network,
  provider,
}: {
  network: number;
  provider: Provider;
}) => {
  const contract = getContract({
    provider,
    abi: UniswapQuoter,
    address: getChainConstant(UNISWAP_QUOTER, network),
  });

  const quote = await contract.read.quoteExactOutputSingle({
    args: [
      getChainConstant(USDC, network),
      getChainConstant(WETH_TOKEN, network),
      3000, // the fee (0.3%)
      WeiPerEther,
      Zero, // don't care about pool limits etc
    ],
  });

  return quote;
};

/** Fetches the current ETH price in $ terms.
 * For test networks and testing in general, you can configure a hardcoded price using nftx.js's configure method.
 */
const fetchEthPrice = (args: { network?: number; provider: Provider }) => {
  const { network = config.network, provider } = args;

  const hardcodedPrice = getChainConstant(
    config.contracts.ethPrice,
    network,
    null
  );
  if (hardcodedPrice != null) {
    return BigInt(hardcodedPrice);
  }

  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    return fetchEthPriceFromApi({ network });
  }
  return fetchEthPriceFromWeb3({ network, provider });
};

export default fetchEthPrice;
