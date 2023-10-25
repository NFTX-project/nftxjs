import type {
  Address,
  LiquidityPosition,
  Provider,
  TokenId,
  Vault,
} from '@nftx/types';
import queryPositionData from './queryPositionData';
import { addressEqual } from '@nftx/utils';
import transformPosition from './transformPosition';
import { NotFoundError } from '@nftx/errors';
import fetchClaimableAmount from '../fetchClaimableAmount';

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
    throw new NotFoundError('vault for position', position.id);
  }
  return vault;
};

const calculateTokenId = (positionId: string) => {
  const code = positionId.slice(2).replace(/^0+/, '').replace(/0+$/, '');
  const tokenId = parseInt(code, 16);
  return tokenId.toString() as TokenId;
};

const fetchPositionsSet = async ({
  lastId,
  network,
  vaults,
  poolIds,
  positionIds,
  userAddresses,
  provider,
}: {
  network: number;
  vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
  provider: Provider;
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

  const positions = await Promise.all(
    data.positions.map(async (position): Promise<LiquidityPosition> => {
      const tokenId = calculateTokenId(position.id);

      const vault = getVaultByTokens({
        inputTokens: position.pool.inputTokens,
        position,
        vaults,
      });
      const [claimable0, claimable1] = await fetchClaimableAmount({
        network,
        tokenId,
        provider,
      });
      return transformPosition({
        network,
        position,
        vault,
        claimable0,
        claimable1,
        tokenId,
      });
    })
  );

  let nextId: Address | undefined;

  if (data.positions.length === 1000) {
    nextId = data.positions.pop()?.id as Address;
  }

  return [positions, nextId] as const;
};

export default fetchPositionsSet;
