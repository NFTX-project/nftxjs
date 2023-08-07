import type { Address, LiquidityPosition, Vault } from '@nftx/types';
import queryPositionData from './queryPositionData';
import { addressEqual } from '@nftx/utils';
import transformPosition from './transformPosition';

const getVaultByTokens = <V extends Pick<Vault, 'id'>>({
  inputTokens,
  position,
  vaults,
}: {
  vaults: V[];
  inputTokens: { id: string }[];
  position: { id: string };
}) => {
  const vault = vaults.find((vault) => {
    return inputTokens.some((inputToken) => {
      return addressEqual(inputToken.id, vault.id);
    });
  });
  if (vault == null) {
    throw new Error(`Could not find vault for position ${position.id}`);
  }
  return vault;
};

const fetchPositionsSet = async ({
  lastId,
  network,
  vaults,
  poolIds,
  positionIds,
  userAddresses,
}: {
  network: number;
  vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
  lastId?: Address;
  poolIds?: Address[];
  positionIds?: Address[];
  userAddresses?: Address[];
}) => {
  const data = await queryPositionData({
    lastId,
    network,
    poolIds,
    positionIds,
    userAddresses,
  });

  const positions = data.positions.map((position): LiquidityPosition => {
    const vault = getVaultByTokens({
      inputTokens: position.pool.inputTokens,
      position,
      vaults,
    });
    return transformPosition({ network, position, vault });
  });

  let nextId: Address | undefined;

  if (data.positions.length === 1000) {
    nextId = data.positions.pop()?.id as Address;
  }

  return [positions, nextId] as const;
};

export default fetchPositionsSet;
