import {
  type Address,
  type LiquidityPool,
  type Vault,
  type VaultFeeReceipt,
} from '@nftx/types';
import queryPoolData from './queryPoolData';
import transformPool from './transformPool';
import { addressEqual } from '@nftx/utils';

const getVaultByTokens = <V extends Pick<Vault, 'id'>>({
  inputTokens,
  vaults,
}: {
  vaults: V[];
  inputTokens: { id: string }[];
}) => {
  return vaults.find((vault) => {
    return inputTokens.some((inputToken) => {
      return addressEqual(inputToken.id, vault.id);
    });
  });
};

const fetchPoolsSet = async ({
  network,
  vaults,
  poolIds,
  vaultAddresses,
  vaultIds,
  feeReceipts,
  premiumPaids: allPremiumPaids,
}: {
  network: number;
  vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth' | 'createdAt'>[];
  poolIds?: Address[];
  vaultAddresses?: Address[];
  vaultIds?: string[];
  feeReceipts: VaultFeeReceipt[];
  premiumPaids: { vaultId: string; amount: bigint; date: number }[];
}) => {
  const data = await queryPoolData({
    network,
    vaults,
    poolIds,
    vaultAddresses,
    vaultIds,
  });

  const pools = data.liquidityPools.reduce((acc, pool) => {
    const vault = getVaultByTokens({
      inputTokens: pool.inputTokens,
      vaults,
    });
    if (!vault) {
      return acc;
    }
    const receipts = feeReceipts.filter(
      (receipt) => receipt.vaultId === vault.vaultId
    );
    const premiumPaids = allPremiumPaids.filter(
      (p) => p.vaultId === vault.vaultId
    );
    const p = transformPool(
      network,
      pool,
      vault,
      pool.openPositionCount,
      receipts,
      premiumPaids
    );
    return [...acc, p];
  }, [] as LiquidityPool[]);

  let nextId: Address | undefined;
  if (data.liquidityPools.length === 1000) {
    nextId = data.liquidityPools.pop()?.id as Address;
  }

  return [pools, nextId] as const;
};

export default fetchPoolsSet;
