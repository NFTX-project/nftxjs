import type { InventoryPosition, Vault, NftxV3, Address } from '@nftx/types';
import { WeiPerEther, Zero } from '@nftx/constants';

const transformPosition = (
  position: NftxV3.InventoryPosition,
  vault: Pick<Vault, 'vTokenToEth'>
): InventoryPosition => {
  const vToken = BigInt(`${position.amount}`);
  const vTokenValue = (vToken * vault.vTokenToEth) / WeiPerEther;

  // TODO: where do we get reward data from?
  const claimableRewards = Zero;
  const lifetimeRewards = Zero;

  return {
    id: position.id as Address,
    userAddress: position.user.id as Address,
    vaultAddress: position.vault.id as Address,
    vaultId: position.vault.vaultId,
    claimableRewards,
    lifetimeRewards,
    vToken,
    vTokenValue,
    poolShare: Zero,
    timeLocked: position.timeLock,
    timelockedUntil: Number(position.timeLockUntil),
  };
};

export default transformPosition;
