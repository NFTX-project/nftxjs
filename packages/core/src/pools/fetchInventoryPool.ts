import config from '@nftx/config';
import fetchInventoryPools from './fetchInventoryPools';
import type {
  InventoryPosition,
  LiquidityPool,
  Provider,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';

type FetchInventoryPools = typeof fetchInventoryPools;

export const makeFetchInventoryPool =
  ({ fetchInventoryPools }: { fetchInventoryPools: FetchInventoryPools }) =>
  async ({
    vaultId,
    network = config.network,
    provider,
    vaults,
    feeReceipts,
    liquidityPools,
    positions,
  }: {
    network?: number;
    vaultId: string;
    provider: Provider;
    vaults: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth' | 'createdAt'>[];
    feeReceipts: Pick<VaultFeeReceipt, 'vaultId' | 'date' | 'amount'>[];
    liquidityPools: Pick<
      LiquidityPool,
      'vaultId' | 'weeklyVolume' | 'dailyVolume'
    >[];
    positions: Pick<InventoryPosition, 'vaultId' | 'vToken' | 'vTokenValue'>[];
  }) => {
    const pools = await fetchInventoryPools({
      network,
      vaultIds: [vaultId],
      provider,
      vaults,
      feeReceipts,
      liquidityPools,
      positions,
    });
    return pools?.[0];
  };

const fetchInventoryPool = makeFetchInventoryPool({ fetchInventoryPools });

export default fetchInventoryPool;
