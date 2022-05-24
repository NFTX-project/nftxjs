import { Zero } from '@ethersproject/constants';
import type { Vault } from './types';

export const isVaultSwappable = (vault: Pick<Vault, 'features'>) => {
  return (
    vault?.features?.enableTargetSwap ||
    vault?.features?.enableRandomSwap ||
    false
  );
};

export const doesVaultHaveTargetSwapFee = (vault: Pick<Vault, 'fees'>) => {
  return (vault?.fees?.targetSwapFee ?? Zero).isZero() === false;
};

export const doesVaultHaveRandomSwapFee = (vault: Pick<Vault, 'fees'>) => {
  return (vault?.fees?.randomSwapFee ?? Zero).isZero() === false;
};

export const matchVault = (vault: Vault, search: string) => {
  if (!vault || !search) {
    return false;
  }
  const s = search.toLowerCase();
  return (
    vault.token.name.toLowerCase().includes(s) ||
    vault.token.symbol.toLowerCase().includes(s) ||
    vault.asset.name.toLowerCase().includes(s) ||
    vault.asset.symbol.toLowerCase().includes(s)
  );
};

export const searchVaults = (vaults: Vault[], search: string) => {
  return vaults?.filter((vault) => matchVault(vault, search));
};
