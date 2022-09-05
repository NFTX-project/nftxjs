import { Zero } from '@ethersproject/constants';
import type { Vault } from './types';

export const isVaultSwappable = (vault: {
  features?: Pick<Vault['features'], 'enableRandomSwap' | 'enableTargetSwap'>;
}) => {
  return (
    vault?.features?.enableTargetSwap ||
    vault?.features?.enableRandomSwap ||
    false
  );
};

export const doesVaultHaveTargetSwapFee = (vault: {
  fees: Pick<Vault['fees'], 'targetSwapFee'>;
}) => {
  return (vault?.fees?.targetSwapFee ?? Zero).isZero() === false;
};

export const doesVaultHaveRandomSwapFee = (vault: {
  fees: Pick<Vault['fees'], 'randomSwapFee'>;
}) => {
  return (vault?.fees?.randomSwapFee ?? Zero).isZero() === false;
};

export const matchVault = (
  vault: Pick<Vault, 'token' | 'asset'>,
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
    vault.asset.symbol.toLowerCase().includes(s)
  );
};

export const searchVaults = (vaults: Vault[], search: string) => {
  return vaults?.filter((vault) => matchVault(vault, search));
};
