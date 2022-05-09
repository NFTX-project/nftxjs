import type { BaseProvider } from '@ethersproject/providers';
import type { BigNumber } from '@ethersproject/bignumber';
import type { Address } from './types';
import getContract from './getContract';
import abi from '@nftx/constants/abis/ERC20.json';

/** Return the total supply of a given token */
const fetchTotalSupply = async ({
  network,
  provider,
  tokenAddress,
}: {
  network: number;
  provider: BaseProvider;
  tokenAddress: Address;
}) => {
  const contract = getContract({
    network,
    address: tokenAddress,
    provider,
    abi,
  });

  const supply: BigNumber = await contract.totalSupply();

  return supply;
};

export default fetchTotalSupply;
