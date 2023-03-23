import getContract from './getContract';
import { ERC20 } from '@nftx/abi';
import type { Address, Provider } from '@nftx/types';

/** Return the total supply of a given token */
const totalSupply = async ({
  provider,
  tokenAddress,
}: {
  provider: Provider;
  tokenAddress: Address;
}) => {
  const contract = getContract({
    address: tokenAddress,
    provider,
    abi: ERC20,
  });

  const supply = await contract.read.totalSupply({});

  return supply;
};

export default totalSupply;
