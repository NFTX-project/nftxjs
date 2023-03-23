import { ERC20 } from '@nftx/abi';
import getContract from './getContract';
import type { Address, Provider } from '@nftx/types';

/** Return the user's balance of a given token */
const balanceOf = async (args: {
  provider: Provider;
  /** The token address */
  tokenAddress: Address;
  /** The owner (i.e. the user) whose balance we're fetching */
  ownerAddress: Address;
}) => {
  const { ownerAddress, provider, tokenAddress } = args;
  const contract = getContract({
    address: tokenAddress,
    abi: ERC20,
    provider,
  });

  const result = await contract.read.balanceOf({ args: [ownerAddress] });

  return result;
};

export default balanceOf;
