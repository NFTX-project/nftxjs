import type { Provider } from '@ethersproject/providers';
import type { BigNumber } from '@ethersproject/bignumber';
import abi from '@nftx/constants/abis/ERC20.json';
import type { Address } from './types';
import getContract from './getContract';

/** Return the user's balance of a given token */
const fetchTokenBalance = async ({
  network,
  ownerAddress,
  provider,
  tokenAddress,
}: {
  network: number;
  provider: Provider;
  /** The token address */
  tokenAddress: Address;
  /** The owner (i.e. the user) whose balance we're fetching */
  ownerAddress: Address;
}) => {
  const contract = getContract({
    network,
    address: tokenAddress,
    abi,
    provider,
  });

  const result: BigNumber = await contract.balanceOf(ownerAddress);

  return result;
};

export default fetchTokenBalance;
