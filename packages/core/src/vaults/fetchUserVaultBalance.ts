import type { Provider } from '@ethersproject/providers';
import type { Address } from '../web3';
import type { VaultId } from './types';
import type fetchUserVaultBalances from './fetchUserVaultBalances';

type FetchUserVaultBalances = ReturnType<typeof fetchUserVaultBalances>;

export default ({
  fetchUserVaultBalances,
}: {
  fetchUserVaultBalances: FetchUserVaultBalances;
}) =>
  async function fetchUserVaultBalance({
    userAddress,
    network,
    provider,
    vaultId,
  }: {
    userAddress: Address;
    network: number;
    provider: Provider;
    vaultId: VaultId;
  }) {
    const balances = await fetchUserVaultBalances({
      network,
      provider,
      userAddress,
    });

    const slp = balances.slp.find((x) => x.vaultId === vaultId);
    const xSlp = balances.xSlp.find((x) => x.vaultId === vaultId);
    const vToken = balances.vTokens.find((x) => x.vaultId === vaultId);
    const xToken = balances.xTokens.find((x) => x.vaultId === vaultId);

    return { slp, xSlp, vToken, xToken };
  };
