import type { Provider } from '@ethersproject/providers';
import type { BigNumber } from '@ethersproject/bignumber';
import abi from '@nftx/constants/abis/ERC20.json';
import getContract from './getContract';
import config from '@nftx/config';

/** Return the user's balance of a given token */
const balanceOf = async ({
  network = config.network,
  ownerAddress,
  provider,
  tokenAddress,
}: {
  network?: number;
  provider: Provider;
  /** The token address */
  tokenAddress: string;
  /** The owner (i.e. the user) whose balance we're fetching */
  ownerAddress: string;
}) => {
  const contract = getContract({
    network,
    address: tokenAddress.toLowerCase(),
    abi,
    provider,
  });

  const result: BigNumber = await contract.balanceOf(ownerAddress);

  return result;
};

export default balanceOf;
