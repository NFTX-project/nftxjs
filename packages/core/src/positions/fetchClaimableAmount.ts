import { NonfungiblePositionManager } from '@nftx/abi';
import { NONFUNGIBLE_POSITION_MANAGER } from '@nftx/constants';
import type { Address, Provider } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

const MAX_UINT128 = 340282366920938463463374607431768211455n;

const fetchClaimableAmount = async ({
  network,
  positionId,
  provider,
}: {
  provider: Provider;
  network: number;
  positionId: Address;
}): Promise<[bigint, bigint]> => {
  const ownerAddress = await provider.readContract({
    abi: NonfungiblePositionManager,
    address: getChainConstant(NONFUNGIBLE_POSITION_MANAGER, network),
    functionName: 'ownerOf',
    args: [BigInt(positionId)],
  });

  const {
    result: [amount0, amount1],
  } = await provider.simulateContract({
    abi: NonfungiblePositionManager,
    address: getChainConstant(NONFUNGIBLE_POSITION_MANAGER, network),
    functionName: 'collect',
    args: [
      {
        amount0Max: MAX_UINT128,
        amount1Max: MAX_UINT128,
        recipient: ownerAddress,
        tokenId: BigInt(positionId),
      },
    ],
  });

  return [amount0, amount1];
};

export default fetchClaimableAmount;
