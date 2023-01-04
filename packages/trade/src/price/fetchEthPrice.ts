import { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { UNISWAP_QUOTER, USDC, WETH_TOKEN } from '@nftx/constants';
import abi from '@nftx/constants/abis/UniswapQuoter.json';
import { getChainConstant, getContract } from '@nftx/utils';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';

const fetchEthPriceFromApi = async ({ network }: { network: number }) => {
  const { sellAmount } = await fetch0xPrice({
    network,
    buyToken: 'ETH',
    sellToken: 'USDC',
    buyAmount: WeiPerEther,
  });

  return BigNumber.from(sellAmount);
};

const fetchEthPriceFromWeb3 = async ({
  network,
  provider,
}: {
  network: number;
  provider: Provider;
}) => {
  const contract = getContract({
    network,
    provider,
    abi,
    address: getChainConstant(UNISWAP_QUOTER, network),
  });

  const quote: BigNumber = await contract.quoteExactOutputSingle(
    getChainConstant(USDC, network),
    getChainConstant(WETH_TOKEN, network),
    '3000', // the fee (0.3%)
    WeiPerEther,
    '0' // don't care about pool limits etc
  );

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
    return BigNumber.from(hardcodedPrice);
  }

  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    return fetchEthPriceFromApi({ network });
  }
  return fetchEthPriceFromWeb3({ network, provider });
};

export default fetchEthPrice;
