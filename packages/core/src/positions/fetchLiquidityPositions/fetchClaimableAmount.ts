import { NonfungiblePositionManager } from '@nftx/abi';
import { Zero } from '@nftx/constants';
import type { Address, Provider, TokenId } from '@nftx/types';

const MAX_UINT128 = 340282366920938463463374607431768211455n;

const fetchClaimableAmount = async ({
  tokenId,
  provider,
  manager,
}: {
  provider: Provider;
  tokenId: TokenId;
  manager: Address;
}): Promise<[bigint, bigint]> => {
  try {
    const ownerAddress = await provider.readContract({
      abi: NonfungiblePositionManager,
      address: manager,
      functionName: 'ownerOf',
      args: [BigInt(tokenId)],
    });

    const {
      result: [amount0, amount1],
    } = await provider.simulateContract({
      abi: NonfungiblePositionManager,
      address: manager,
      functionName: 'collect',
      args: [
        {
          amount0Max: MAX_UINT128,
          amount1Max: MAX_UINT128,
          recipient: ownerAddress,
          tokenId: BigInt(tokenId),
        },
      ],
    });

    return [amount0, amount1];
  } catch (e) {
    return [Zero, Zero];
  }
};

export default fetchClaimableAmount;
