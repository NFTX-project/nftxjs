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
import fetchClaimableAmount from './fetchClaimableAmount';

type QueryPositionData = typeof queryPositionData;
type FetchClaimableAmount = typeof fetchClaimableAmount;
import getManager from './getManager';

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

export const makeFetchPositionsSet =
  ({
    fetchClaimableAmount,
    queryPositionData,
  }: {
    queryPositionData: QueryPositionData;
    fetchClaimableAmount: FetchClaimableAmount;
  }) =>
  async ({
    lastId,
    network,
    vaults,
    poolIds,
    positionIds,
    userAddresses,
    provider,
    tokenIds,
  }: {
    network: number;
    vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
    provider: Provider;
    lastId?: Address;
    poolIds?: Address[];
    positionIds?: Address[];
    userAddresses?: Address[];
    tokenIds?: TokenId[];
  }) => {
    const data = await queryPositionData({
      lastId,
      network,
      poolIds,
      positionIds,
      userAddresses,
      tokenIds,
    });

    const positions = await Promise.all(
      data.positions.map(async (position): Promise<LiquidityPosition> => {
        const vault = getVaultByTokens({
          inputTokens: position.pool.inputTokens,
          position,
          vaults,
        });
        const [claimable0, claimable1] = await fetchClaimableAmount({
          tokenId: position.tokenId as TokenId,
          provider,
          manager: getManager(network, position).manager,
        });
        return transformPosition({
          network,
          position,
          vault,
          claimable0,
          claimable1,
        });
      })
    );

    let nextId: Address | undefined;

    if (data.positions.length === 1000) {
      nextId = data.positions.pop()?.id as Address;
    }

    return [positions, nextId] as const;
  };

const fetchPositionsSet = makeFetchPositionsSet({
  fetchClaimableAmount,
  queryPositionData,
});

export default fetchPositionsSet;
