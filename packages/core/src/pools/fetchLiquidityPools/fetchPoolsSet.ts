import type { Address, Vault, VaultFeeReceipt } from '@nftx/types';
import queryPoolData from './queryPoolData';
import transformPool from './transformPool';
import { addressEqual } from '@nftx/utils';
import { NotFoundError } from '@nftx/errors';
import fetchFeeReceipts from '../../vaults/fetchFeeReceipts';

const getVaultByTokens = <V extends Pick<Vault, 'id'>>({
  inputTokens,
  pool,
  vaults,
}: {
  vaults: V[];
  inputTokens: { id: string }[];
  pool: { id: string };
}) => {
  const vault = vaults.find((vault) => {
    return inputTokens.some((inputToken) => {
      return addressEqual(inputToken.id, vault.id);
    });
  });
  if (vault == null) {
    throw new NotFoundError('vault for position', pool.id);
  }
  return vault;
};

const fetchPoolsSet = async ({
  network,
  vaults,
  poolIds,
  vaultAddresses,
  vaultIds,
  feeReceipts: givenFeeReceipts,
}: {
  network: number;
  vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth' | 'createdAt'>[];
  poolIds?: Address[];
  vaultAddresses?: Address[];
  vaultIds?: string[];
  feeReceipts?: VaultFeeReceipt[];
}) => {
  const feeReceipts =
    givenFeeReceipts ??
    (await fetchFeeReceipts({
      network,
      vaultAddresses: vaults.map((v) => v.id),
    }));

  const data = await queryPoolData({
    network,
    vaults,
    poolIds,
    vaultAddresses,
    vaultIds,
  });

  const pools = data.liquidityPools.map((pool) => {
    const vault = getVaultByTokens({
      inputTokens: pool.inputTokens,
      pool,
      vaults,
    });
    const receipts = feeReceipts.filter(
      (receipt) => receipt.vaultId === vault.vaultId
    );
    return transformPool(
      network,
      pool,
      vault,
      pool.openPositionCount,
      receipts
    );
  });

  let nextId: Address | undefined;
  if (data.liquidityPools.length === 1000) {
    nextId = data.liquidityPools.pop()?.id as Address;
  }

  return [pools, nextId] as const;
};

export default fetchPoolsSet;
