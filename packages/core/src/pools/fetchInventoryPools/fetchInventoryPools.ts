import config from '@nftx/config';
import type {
  Address,
  InventoryPool,
  InventoryPosition,
  Provider,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';
import { fetchInventoryPositions } from '../../positions';
import filterVaults from './filterVaults';
import transformPool from './transformPool';
import fetchFeeReceipts from '../../vaults/fetchFeeReceipts';
import { getChainConstant, getContract } from '@nftx/utils';
import { INVENTORY_STAKING } from '@nftx/constants';
import { InventoryStaking } from '@nftx/abi';

const fetchInventoryPools = async ({
  network = config.network,
  vaultAddresses,
  vaultIds,
  provider,
  vaults: allVaults,
  feeReceipts: givenFeeReceipts,
  positions: givenPositions,
}: {
  network?: number;
  vaultAddresses?: Address[];
  vaultIds?: string[];
  provider: Provider;
  vaults: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth' | 'createdAt'>[];
  feeReceipts?: VaultFeeReceipt[];
  positions?: InventoryPosition[];
}): Promise<InventoryPool[]> => {
  const vaults = filterVaults({
    vaults: allVaults,
    vaultAddresses,
    vaultIds,
  });

  const feeReceipts =
    givenFeeReceipts ??
    (await fetchFeeReceipts({
      network,
      vaultAddresses: vaults.map((v) => v.id),
    }));

  const positions =
    givenPositions ??
    (await fetchInventoryPositions({
      network,
      vaultIds: vaults.map((v) => v.vaultId),
      vaults: allVaults,
    }));

  const inventoryContract = getContract({
    provider,
    address: getChainConstant(INVENTORY_STAKING, network),
    abi: InventoryStaking,
  });

  const timelock = Number(await inventoryContract.read.timelock({}));

  return vaults.map((vault) => {
    const receipts = feeReceipts.filter(
      (receipt) => receipt.vaultId === vault.vaultId
    );

    return transformPool({ positions, vault, receipts, timelock });
  });
};

export default fetchInventoryPools;
