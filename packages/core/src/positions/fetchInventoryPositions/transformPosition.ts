import type { InventoryPosition, Vault } from '@nftx/types';
import type { InventoryPositionsResponse } from './types';
import { WeiPerEther, Zero } from '@nftx/constants';
import { parseEther } from 'viem';

const transformPosition = (
  position: InventoryPositionsResponse['inventoryPositions'][0],
  vault: Pick<Vault, 'vTokenToEth'>
): InventoryPosition => {
  const vToken = parseEther(`${position.nftIds.length}`);
  const vTokenValue = (vToken * vault.vTokenToEth) / WeiPerEther;

  // TODO: where do we get reward data from?
  const claimableRewards = Zero;
  const lifetimeRewards = Zero;

  return {
    id: position.id,
    userAddress: position.user.id,
    vaultAddress: position.vault.id,
    vaultId: position.vault.vaultId,
    claimableRewards,
    lifetimeRewards,
    vToken,
    vTokenValue,
  };
};

export default transformPosition;
