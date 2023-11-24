import type {
  InventoryPosition,
  Vault,
  NftxV3,
  Address,
  TokenId,
} from '@nftx/types';
import { WeiPerEther, Zero } from '@nftx/constants';

const transformPosition = ({
  claimableRewards,
  position,
  vault,
}: {
  position: NftxV3.InventoryPosition;
  vault: Pick<Vault, 'vTokenToEth'>;
  claimableRewards: bigint;
}): InventoryPosition => {
  const vToken = BigInt(`${position.amount}`);
  const vTokenValue = (vToken * vault.vTokenToEth) / WeiPerEther;

  // TODO: where do we get reward data from?
  const lifetimeRewards = Zero;

  return {
    id: position.id as Address,
    tokenId: position.positionId as TokenId,
    userAddress: position.user.id as Address,
    vaultAddress: position.vault.id as Address,
    vaultId: position.vault.vaultId,
    claimableRewards,
    lifetimeRewards,
    vToken,
    vTokenValue,
    poolShare: Zero,
    vTokenLockedUntil: Number(position.vTokenTimeLockUntil),
    lockedUntil: Number(position.timeLockUntil),
  };
};

export default transformPosition;
