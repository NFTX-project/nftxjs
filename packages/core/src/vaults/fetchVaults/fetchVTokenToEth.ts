import { WeiPerEther } from '@nftx/constants';
import type { Address, Provider } from '@nftx/types';
import { getContract } from '@nftx/utils';

const abi: any = {};

const fetchVTokenToEth = async ({
  provider,
  vaultAddress,
}: {
  provider: Provider;
  vaultAddress: Address;
}) => {
  const contract = getContract({
    abi,
    address: vaultAddress,
    provider,
  });
  const vTokenToEth = await contract.read.vTokenToETH({
    args: [WeiPerEther],
  });

  return vTokenToEth as unknown as bigint;
};

export default fetchVTokenToEth;
