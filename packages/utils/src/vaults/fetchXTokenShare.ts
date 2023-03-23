import { NFTXInventoryStaking } from '@nftx/abi';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import { getChainConstant, getContract } from '../web3';
import config from '@nftx/config';
import type { Provider } from '@nftx/types';

/**
 * For the given vaultId, returns the xTokenShare.
 * The xTokenShare is what 1 xToken is worth in vToken.
 */
const fetchXTokenShare = async ({
  network = config.network,
  provider,
  vaultId,
}: {
  network?: number;
  provider: Provider;
  vaultId: string;
}) => {
  const address = getChainConstant(NFTX_INVENTORY_STAKING, network);
  const contract = getContract({
    provider,
    abi: NFTXInventoryStaking,
    address,
  });
  const share = await contract.read.xTokenShareValue({
    args: [BigInt(vaultId)],
  });

  return share;
};

export default fetchXTokenShare;
