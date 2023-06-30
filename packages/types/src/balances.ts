import type { Address } from './web3';

export type VTokenBalance = {
  type: 'vToken';
  /** The address of the vault token */
  id: Address;
  /** The vault ID */
  vaultId: string;
  /** The user's vToken balance */
  balance: bigint;
};
