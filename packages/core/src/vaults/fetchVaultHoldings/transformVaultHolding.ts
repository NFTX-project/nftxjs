import type { Address, VaultHolding } from '@nftx/types';
import type { Response } from '../fetchSubgraphVaults';

const transformVaultHolding = (
  holding: Response['vaults'][0]['holdings'][0]
): VaultHolding => {
  return {
    id: holding.id,
    tokenId: holding.tokenId as `${number}`,
    amount: BigInt(holding.amount),
    dateAdded: Number(holding.dateAdded),
    vaultId: holding.vault.vaultId,
    assetAddress: holding.vault.asset.id as Address,
  };
};

export default transformVaultHolding;
