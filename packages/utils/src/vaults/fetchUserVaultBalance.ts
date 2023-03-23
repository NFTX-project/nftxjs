import type { Address, Provider, UserVaultBalance } from '@nftx/types';
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
  /**
   * Fetches a user's holdings of vToken/xToken/vTokenWETH/xTokenWETH for a specific vault.
   * Unlike fetchUserVaultBalances, this method returns an on-chain balance value.
   */
  async function fetchUserVaultBalance({
    userAddress,
    network,
    provider,
    vaultId,
  }: {
    userAddress: Address;
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
    const tokens = [slp, xSlp, vToken, xToken].filter(
      Boolean
    ) as UserVaultBalance[];

    const result = await Promise.all(
      tokens.map(async ({ address, ...rest }) => {
        const balance = await balanceOf({
          provider,
          ownerAddress: userAddress,
          tokenAddress: address,
        });

        return { ...rest, address, balance };
      })
    );

    return result;
  };
