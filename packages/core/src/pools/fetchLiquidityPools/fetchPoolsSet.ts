import type { Address, Vault } from '@nftx/types';
import queryPoolData from './queryPoolData';
import transformPool from './transformPool';
import { addressEqual } from '@nftx/utils';

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
    throw new Error(`Could not find vault for position ${pool.id}`);
  }
  return vault;
};

const fetchPoolsSet = async ({
  network,
  vaults,
  poolIds,
  vaultAddresses,
  vaultIds,
}: {
  network: number;
  vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
  poolIds?: Address[];
  vaultAddresses?: Address[];
  vaultIds?: string[];
}) => {
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
    return transformPool(pool, vault);
  });

  let nextId: Address | undefined;
  if (data.liquidityPools.length === 1000) {
    nextId = data.liquidityPools.pop()?.id as Address;
  }

  return [pools, nextId] as const;
};

export default fetchPoolsSet;
