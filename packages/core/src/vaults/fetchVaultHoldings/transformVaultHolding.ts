import { BigNumber } from '@ethersproject/bignumber';
import type { VaultHolding } from '@nftx/types';
import type { Response } from '../fetchSubgraphVaults';

const transformVaultHolding = (
  holding: Response['vaults'][0]['holdings'][0]
): VaultHolding => {
  return {
    id: holding.id,
    tokenId: holding.tokenId,
    amount: BigNumber.from(holding.amount),
    dateAdded: Number(holding.dateAdded),
  };
};

export default transformVaultHolding;
