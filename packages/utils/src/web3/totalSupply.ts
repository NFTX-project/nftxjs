import type { Provider } from '@ethersproject/providers';
import type { BigNumber } from '@ethersproject/bignumber';
import getContract from './getContract';
import abi from '@nftx/constants/abis/ERC20.json';
import config from '@nftx/config';

/** Return the total supply of a given token */
const totalSupply = async ({
  network = config.network,
  provider,
  tokenAddress,
}: {
  network?: number;
  provider: Provider;
  tokenAddress: string;
}) => {
  const contract = getContract({
    network,
    address: tokenAddress.toLowerCase(),
    provider,
    abi,
  });

  const supply: BigNumber = await contract.totalSupply();

  return supply;
};

export default totalSupply;
