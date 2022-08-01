import type { BigNumber } from '@ethersproject/bignumber';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { NFTX_INVENTORY_STAKING, NFTX_LP_STAKING } from '@nftx/constants';
import NftxInventoryStakingAbi from '@nftx/constants/abis/NFTXInventoryStaking.json';
import NftxLpStakingAbi from '@nftx/constants/abis/NFTXLpStaking.json';
import type { VaultId } from '../vaults';
import { Address, getChainConstant, getContract } from '../web3';

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
  vaultId: VaultId;
}) => {
  const ipContract = getContract({
    network,
    provider,
    abi: NftxInventoryStakingAbi,
    address: getChainConstant(NFTX_INVENTORY_STAKING, network),
  });
  let inventoryTimelock: number = null;

  try {
    const x: BigNumber = await ipContract.timelockUntil(vaultId, userAddress);
    inventoryTimelock = Number(`${x}`);
  } catch {
    // Failed to fetch the timelock
  }

  const lpContract = getContract({
    network,
    provider,
    abi: NftxLpStakingAbi,
    address: getChainConstant(NFTX_LP_STAKING, network),
  });
  let liquidityTimelock: number = null;

  try {
    const x: BigNumber = await lpContract.lockedUntil(vaultId, userAddress);
    liquidityTimelock = Number(`${x}`);
  } catch {
    // Failed to fetch timelock
  }

  return { inventoryTimelock, liquidityTimelock };
};

export default fetchUserTimelock;
