import type { Address } from '@nftx/types';

type VTokenBalance = {
  type: 'vToken';
  /** The address of the vault token */
  id: Address;
  /** The vault ID */
  vaultId: string;
  /** The user's vToken balance */
  balance: bigint;
};

const fetchVTokenBalances = async (args: {
  network?: number;
  userAddresses?: Address[];
  vaultIds?: string[];
  vaultAddresses?: Address[];
}): Promise<VTokenBalance[]> => {
  // TODO: implement
  // So here we'll likely just be pulling a user's vToken balances from a subgraph (similar to v2's vault token holdings subgraph)
  throw new Error('Not implemented');
};

export default fetchVTokenBalances;
