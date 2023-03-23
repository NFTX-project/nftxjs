import config from '@nftx/config';
import { NFTX_INVENTORY_STAKING, NFTX_LP_STAKING } from '@nftx/constants';
import { NFTXInventoryStaking, NFTXLpStaking } from '@nftx/abi';
import { getChainConstant, getContract } from '../web3';
import type { Address, Provider } from '@nftx/types';

/**
 * For a given vault, returns the date that the user is locked in for staking
 */
const fetchUserTimelock = async ({
  network = config.network,
  provider,
  userAddress,
  vaultId,
}: {
  network?: number;
  provider: Provider;
  userAddress: Address;
  vaultId: string;
}) => {
  const ipContract = getContract({
    provider,
    abi: NFTXInventoryStaking,
    address: getChainConstant(NFTX_INVENTORY_STAKING, network),
  });
  let inventoryTimelock = 0;

  try {
    const x = await ipContract.read.timelockUntil({
      args: [BigInt(vaultId), userAddress],
    });
    inventoryTimelock = Number(`${x}`);
  } catch {
    // Failed to fetch the timelock
  }

  const lpContract = getContract({
    provider,
    abi: NFTXLpStaking,
    address: getChainConstant(NFTX_LP_STAKING, network),
  });
  let liquidityTimelock = 0;

  try {
    const x = await lpContract.read.lockedUntil({
      args: [BigInt(vaultId), userAddress],
    });
    liquidityTimelock = Number(`${x}`);
  } catch {
    // Failed to fetch timelock
  }

  return { inventoryTimelock, liquidityTimelock };
};

export default fetchUserTimelock;
