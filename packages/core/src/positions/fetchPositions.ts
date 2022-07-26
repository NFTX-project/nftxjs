import type { BigNumber } from '@ethersproject/bignumber';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { fetchPools, LiquidityPool } from '../pools';
import type { fetchReservesForTokens, TokenReserve } from '../tokens';
import type {
  fetchUserVaultBalances,
  fetchVaultAprs,
  fetchVaults,
  fetchXTokenShares,
  UserVaultBalance,
  Vault,
  VaultApr,
  VaultId,
} from '../vaults';
import type fetchPosition from './fetchPosition';
import { Address, addressEqual } from '../web3';

type FetchPools = typeof fetchPools;
type FetchReservesForTokens = typeof fetchReservesForTokens;
type FetchVaultAprs = typeof fetchVaultAprs;
type FetchVaults = typeof fetchVaults;
type FetchXTokenShares = typeof fetchXTokenShares;
type FetchUserVaultBalances = typeof fetchUserVaultBalances;
type FetchPosition = ReturnType<typeof fetchPosition>;

export default ({
  fetchPools,
  fetchReservesForTokens,
  fetchVaultAprs,
  fetchVaults,
  fetchXTokenShares,
  fetchUserVaultBalances,
  fetchPosition,
}: {
  fetchVaults: FetchVaults;
  fetchPools: FetchPools;
  fetchVaultAprs: FetchVaultAprs;
  fetchXTokenShares: FetchXTokenShares;
  fetchReservesForTokens: FetchReservesForTokens;
  fetchUserVaultBalances: FetchUserVaultBalances;
  fetchPosition: FetchPosition;
}) =>
  /** Fetch useful information about a user's positions such as their inventory/liquidity balances, pool split, pool share */
  async function fetchPositions({
    provider,
    userAddress,
    network = config.network,
    ...args
  }: {
    userAddress: Address;
    network?: number;
    provider: Provider;
    vaults?: Vault[];
    aprs?: VaultApr[];
    pools?: LiquidityPool[];
    reserves?: TokenReserve[];
    balances?: {
      xSlp: UserVaultBalance[];
      xTokens: UserVaultBalance[];
    };
    xTokenShares?: { share: BigNumber; vaultId: VaultId }[];
  }) {
    const allVaults = args.vaults ?? (await fetchVaults({ network }));
    const balances =
      args.balances ??
      (await fetchUserVaultBalances({ userAddress, network, provider }));
    const userVaultIds = [
      ...new Set(
        [...balances.xTokens, ...balances.xSlp].map(({ vaultId }) => vaultId)
      ),
    ];
    const stakedVaults = allVaults.filter((vault) =>
      userVaultIds.includes(vault.vaultId)
    );
    const vaultAddresses = stakedVaults.map((vault) => vault.id);
    const vaultIds = stakedVaults.map((vault) => vault.vaultId);
    const pools = args.pools ?? (await fetchPools({ network }));
    const allReserves =
      args.reserves ??
      (await fetchReservesForTokens({
        network,
        tokenAddresses: vaultAddresses,
      }));
    const xTokenShares =
      args.xTokenShares ??
      (await fetchXTokenShares({ provider, vaultIds, network }));
    const aprs = args.aprs ?? (await fetchVaultAprs({ network }));

    const positions = await Promise.all(
      stakedVaults.map((vault) => {
        const { inventoryApr = 0, liquidityApr = 0 } =
          aprs.find((apr) => addressEqual(apr.vaultAddress, vault.id)) ?? {};
        const pool = pools.find((pool) => pool.vaultId === vault.vaultId);
        const reserves = allReserves.find((reserves) =>
          addressEqual(reserves.tokenId, vault.id)
        );
        const xSlpBalance = balances.xSlp.find(
          ({ vaultId }) => vaultId === vault.vaultId
        )?.balance;
        const xTokenBalance = balances.xTokens.find(
          ({ vaultId }) => vaultId === vault.vaultId
        )?.balance;
        const xTokenShare = xTokenShares.find(
          ({ vaultId }) => vaultId === vault.vaultId
        )?.share;

        return fetchPosition({
          provider,
          userAddress,
          vaultAddress: vault.id,
          inventoryApr,
          liquidityApr,
          network,
          pool,
          reserves,
          vault,
          xSlpBalance,
          xTokenBalance,
          xTokenShare,
        });
      })
    );

    return positions;
  };
