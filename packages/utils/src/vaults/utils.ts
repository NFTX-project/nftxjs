import { Zero } from '@nftx/constants';
import type { Vault } from '@nftx/types';
import { addressEqual } from '../web3';

/** Returns whether a vault has swaps enabled (either random or target swaps count) */
export const isVaultSwappable = (vault: {
  features?: Pick<Vault['features'], 'enableRandomSwap' | 'enableTargetSwap'>;
}) => {
  return (
    vault?.features?.enableTargetSwap ||
    vault?.features?.enableRandomSwap ||
    false
  );
};

/** Returns whether a vault charges a fee for a target swap */
export const doesVaultHaveTargetSwapFee = (vault: {
  fees: Pick<Vault['fees'], 'targetSwapFee'>;
}) => {
  return (vault?.fees?.targetSwapFee ?? Zero) !== Zero;
};

/** Returns whether a vault charges a fee for a random swap */
export const doesVaultHaveRandomSwapFee = (vault: {
  fees: Pick<Vault['fees'], 'randomSwapFee'>;
}) => {
  return (vault?.fees?.randomSwapFee ?? Zero) !== Zero;
};

/**
 * Carries out a rudimentary check to see if a vault contains a given search string.
 */
export const matchVault = (
  vault: Pick<Vault, 'token' | 'asset' | 'id' | 'vaultId'>,
  search: string
) => {
  if (!vault || !search) {
    return false;
  }
  const s = search.toLowerCase();
  return (
    vault.token.name.toLowerCase().includes(s) ||
    vault.token.symbol.toLowerCase().includes(s) ||
    vault.asset.name.toLowerCase().includes(s) ||
    vault.asset.symbol.toLowerCase().includes(s) ||
    addressEqual(vault.id, s) ||
    vault.vaultId === s ||
    addressEqual(vault.asset.id, s)
  );
};

/**
 * Returns any vaults that match a search string
 */
export const searchVaults = <
  T extends Pick<Vault, 'token' | 'asset' | 'id' | 'vaultId'>
>(
  vaults: T[],
  search: string
) => {
  return vaults?.filter((vault) => matchVault(vault, search));
};
