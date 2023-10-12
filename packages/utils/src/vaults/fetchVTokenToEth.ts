import { WeiPerEther } from '@nftx/constants';
import type { Address, Provider } from '@nftx/types';
import { NFTXVaultUpgradeable } from '@nftx/abi';
import { getContract } from '../web3';

const fetchVTokenToEth = async ({
  provider,
  vaultAddress,
}: {
  provider: Provider;
  vaultAddress: Address;
}) => {
  const contract = getContract({
    abi: NFTXVaultUpgradeable,
    address: vaultAddress,
    provider,
  });
  const vTokenToEth = await contract.read.vTokenToETH({
    args: [WeiPerEther],
  });

  return vTokenToEth as unknown as bigint;
};

export default fetchVTokenToEth;
