import config from '@nftx/config';
import type {
  Address,
  InventoryPool,
  InventoryPosition,
  LiquidityPool,
  Provider,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';
import filterVaults from './filterVaults';
import transformPool from './transformPool';
import { getChainConstant, getContract } from '@nftx/utils';
import { INVENTORY_STAKING } from '@nftx/constants';
import { InventoryStaking } from '@nftx/abi';

type GetContract = typeof getContract;

export const makeFetchInventoryPools =
  ({ getContract }: { getContract: GetContract }) =>
  async ({
    network = config.network,
    vaultAddresses,
    vaultIds,
    provider,
    vaults: allVaults,
    feeReceipts,
    positions,
    liquidityPools: allLiquidityPools,
  }: {
    network?: number;
    vaultAddresses?: Address[];
    vaultIds?: string[];
    provider: Provider;
    vaults: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth' | 'createdAt'>[];
    feeReceipts: Pick<VaultFeeReceipt, 'date' | 'amount' | 'vaultId'>[];
    positions: Pick<InventoryPosition, 'vaultId' | 'vToken' | 'vTokenValue'>[];
    liquidityPools: Pick<
      LiquidityPool,
      'dailyVolume' | 'weeklyVolume' | 'vaultId'
    >[];
  }): Promise<InventoryPool[]> => {
    const vaults = filterVaults({
      vaults: allVaults,
      vaultAddresses,
      vaultIds,
    });

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
      const liquidityPools = allLiquidityPools.filter(
        (pool) => pool.vaultId === vault.vaultId
      );

      return transformPool({
        positions,
        vault,
        receipts,
        timelock,
        liquidityPools,
      });
    });
  };

const fetchInventoryPools = makeFetchInventoryPools({ getContract });

export default fetchInventoryPools;
