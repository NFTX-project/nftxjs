import type { VaultHolding } from '@nftx/types';
import type { Response } from '../fetchSubgraphVaults';

const transformVaultHolding = (
  holding: Response['vaults'][0]['holdings'][0]
): VaultHolding => {
  return {
    id: holding.id,
    tokenId: holding.tokenId as `${number}`,
    amount: BigInt(holding.amount),
    dateAdded: Number(holding.dateAdded),
  };
};

export default transformVaultHolding;
