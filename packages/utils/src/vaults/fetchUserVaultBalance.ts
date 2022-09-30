import type { Provider } from '@ethersproject/providers';
import type { balanceOf } from '../web3';
import type fetchUserVaultBalances from './fetchUserVaultBalances';

type FetchUserVaultBalances = ReturnType<typeof fetchUserVaultBalances>;
type BalanceOf = typeof balanceOf;

export default ({
  fetchUserVaultBalances,
  balanceOf,
}: {
  fetchUserVaultBalances: FetchUserVaultBalances;
  balanceOf: BalanceOf;
}) =>
  async function fetchUserVaultBalance({
    userAddress,
    network,
    provider,
    vaultId,
  }: {
    userAddress: string;
    network: number;
    provider: Provider;
    vaultId: string;
  }) {
    const balances = await fetchUserVaultBalances({
      network,
      userAddress,
    });

    const slp = balances.slp.find((x) => x.vaultId === vaultId);
    const xSlp = balances.xSlp.find((x) => x.vaultId === vaultId);
    const vToken = balances.vTokens.find((x) => x.vaultId === vaultId);
    const xToken = balances.xTokens.find((x) => x.vaultId === vaultId);

    const result = await Promise.all(
      [slp, xSlp, vToken, xToken]
        .filter(Boolean)
        .map(async ({ address, ...rest }) => {
          const balance = await balanceOf({
            network,
            provider,
            ownerAddress: userAddress,
            tokenAddress: address,
          });

          return { ...rest, address, balance };
        })
    );

    return result;
  };
