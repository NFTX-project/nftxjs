import config from '@nftx/config';
import { NFTX_LP_STAKING, Zero } from '@nftx/constants';
import type { fetchLiquidityPool, LiquidityPool } from '../pools';
import type { fetchClaimableTokens } from '../staking';
import { t } from '../utils';
import { fetchVault, fetchVaultFees } from '../vaults';
import {
  calculateClaimableEth,
  calculateInventoryBalance,
  calculateInventoryEth,
  calculateInventoryShare,
  calculateLiquidityBalance,
  calculateLiquidityEth,
  calculateLiquidityShare,
  calculateStakeSplit,
} from './utils';
import type {
  Address,
  Position,
  Provider,
  TokenReserve,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';
import {
  addressEqual,
  balanceOf,
  fetchReservesForToken,
  fetchUserVaultBalance,
  fetchXTokenShare,
  getChainConstant,
  totalSupply,
} from '@nftx/utils';
import type fetchVaultAprs from '../vaults/fetchVaultAprs';

type FetchPool = typeof fetchLiquidityPool;
type FetchClaimableTokens = typeof fetchClaimableTokens;
type FetchUserVaultBalance = typeof fetchUserVaultBalance;
type FetchVault = typeof fetchVault;
type FetchVaultAprs = typeof fetchVaultAprs;
type FetchXTokenShare = typeof fetchXTokenShare;
type FetchTotalSupply = typeof totalSupply;
type FetchReservesForToken = typeof fetchReservesForToken;

export default ({
  fetchClaimableTokens,
  fetchPool,
  fetchTotalSupply,
  fetchUserVaultBalance,
  fetchVault,
  fetchVaultAprs,
  fetchXTokenShare,
  fetchReservesForToken,
}: {
  fetchPool: FetchPool;
  fetchClaimableTokens: FetchClaimableTokens;
  fetchUserVaultBalance: FetchUserVaultBalance;
  fetchVault: FetchVault;
  fetchVaultAprs: FetchVaultAprs;
  fetchXTokenShare: FetchXTokenShare;
  fetchTotalSupply: FetchTotalSupply;
  fetchReservesForToken: FetchReservesForToken;
}) =>
  /** Fetch useful information about a user's position such as their inventory/liquidity balances, pool split, pool share */
  async function fetchPosition({
    vaultAddress,
    network = config.network,
    provider,
    userAddress,
    ...args
  }: {
    vaultAddress: Address;
    provider: Provider;
    userAddress: Address;
    vault?: {
      id: Vault['id'];
      vaultId: Vault['vaultId'];
      inventoryStakingPool?: {
        id: Vault['inventoryStakingPool']['id'];
      };
      createdAt: Vault['createdAt'];
    };
    pool?: LiquidityPool;
    reserves?: TokenReserve;
    xTokenBalance?: bigint;
    xSlpBalance?: bigint;
    xTokenShare?: bigint;
    network?: number;
    inventoryApr?: number;
    liquidityApr?: number;
    slpSupply?: bigint;
    slpBalance?: bigint;
    feeReceipts?: VaultFeeReceipt[];
  }) {
    const vault =
      args.vault ?? (await fetchVault({ network, vaultAddress, provider }));
    const pool = args.pool ?? (await fetchPool({ network, vaultAddress }));
    const reserves =
      args.reserves ??
      (await fetchReservesForToken({ network, tokenAddress: vaultAddress }));
    const needsBalance =
      args.xSlpBalance === undefined && args.xTokenBalance == undefined;
    const balance = needsBalance
      ? await fetchUserVaultBalance({
          userAddress,
          network,
          provider,
          vaultId: vault.vaultId,
        })
      : null;
    const xTokenBalance =
      args.xTokenBalance ??
      balance?.find((x) => x.type === 'xToken')?.balance ??
      Zero;
    const xSlpBalance =
      args.xSlpBalance ??
      balance?.find((x) => x.type === 'xTokenWETH')?.balance ??
      Zero;
    let xTokenShare = args.xTokenShare;
    if (xTokenShare == null && vault.inventoryStakingPool?.id != null) {
      xTokenShare = await fetchXTokenShare({
        provider,
        vaultId: vault.vaultId,
        network,
      });
    }
    if (xTokenShare == null) {
      xTokenShare = Zero;
    }
    const needsApr = args.inventoryApr == null || args.liquidityApr == null;
    const apr = needsApr
      ? (
          await fetchVaultAprs({ network, vaultAddresses: [vaultAddress] })
        ).find((x) => addressEqual(x.vaultAddress, vaultAddress))
      : null;
    const inventoryApr = args.inventoryApr ?? apr?.inventoryApr ?? 0;
    const liquidityApr = args.liquidityApr ?? apr?.liquidityApr ?? 0;

    let slpBalance = args.slpBalance;
    if (!slpBalance && pool?.stakingToken?.id) {
      [, slpBalance] = await t(
        balanceOf({
          provider,
          ownerAddress: getChainConstant(NFTX_LP_STAKING, network),
          tokenAddress: pool.stakingToken.id,
        })
      );
    }
    if (!slpBalance) {
      slpBalance = Zero;
    }

    let slpSupply = args.slpSupply;
    if (!slpSupply && pool?.stakingToken?.id) {
      [, slpSupply] = await t(
        fetchTotalSupply({
          provider,
          tokenAddress: pool.stakingToken.id,
        })
      );
    }
    if (!slpSupply) {
      slpSupply = Zero;
    }

    const xTokenAddress = vault.inventoryStakingPool?.id;

    let xTokenSupply = Zero;
    if (xTokenAddress) {
      [, xTokenSupply] = await t(
        fetchTotalSupply({
          provider,
          tokenAddress: xTokenAddress,
        })
      );
    }
    const xSlpAddress = pool?.dividendToken?.id;
    let xSlpSupply = Zero;
    if (xSlpAddress) {
      [, xSlpSupply] = await t(
        fetchTotalSupply({ provider, tokenAddress: xSlpAddress })
      );
    }

    let feeReceipts = args.feeReceipts;
    if (!feeReceipts) {
      [, feeReceipts] = await t(
        fetchVaultFees({
          network,
          fromTimestamp: Date.now() / 1000 - 2592000,
          vaultAddress,
        })
      );
    }

    // INVENTORY
    // The % of all staked inventory owned by the user
    const inventoryShare = calculateInventoryShare({
      xToken: xTokenBalance,
      xTokenSupply,
    });
    // The amount of vToken the user has put it into inventory staking
    const inventoryTokens = calculateInventoryBalance({
      xToken: xTokenBalance,
      xTokenShare,
    });
    // The eth value of the user's inventory tokens
    const inventoryValue = calculateInventoryEth({
      inventoryBalance: inventoryTokens,
      reserves,
    });

    // LIQUIDITY
    // The % of all staked liquidity owned by the user
    const liquidityShare = calculateLiquidityShare({
      xSlp: xSlpBalance,
      xSlpSupply,
    });
    // The amout of vToken the user has staked
    const liquidityTokens = calculateLiquidityBalance({
      liquidityShare,
      reserves,
    });
    // The amount of WETH the user has paired with their vToken
    const liquidityEth = calculateLiquidityEth({ liquidityShare, reserves });
    // The total eth value of their liquidity position
    // This is only a rough estimate but the vToken value should be equal to the eth value
    // So we can get away with just * 2 the eth amount
    const liquidityValue = liquidityEth * 2n;

    // CLAIMABLE
    // The amount of LP rewards that are claimable
    const [, claimableAmount = Zero] = await t(
      fetchClaimableTokens({
        pool,
        provider,
        userAddress,
      })
    );
    // The eth value of the amount
    const claimableValue = calculateClaimableEth({
      stakedEth: liquidityEth,
      claimableTokens: claimableAmount,
      stakedTokens: liquidityTokens,
    });

    // The % of the user's total position that is inventory or liquidity
    const [inventorySplit, liquiditySplit] = calculateStakeSplit({
      inventoryBalance: inventoryTokens,
      liquidityBalance: liquidityTokens * 2n,
    });

    // The total eth value of all staked assets
    const valueStaked = liquidityValue + inventoryValue;
    // The total value including claimable amounts
    const totalValue = valueStaked + claimableValue;

    const position: Omit<
      Position,
      | 'inventoryStaked'
      | 'liquidityStaked'
      | 'totalValueStaked'
      | 'inventoryLockTime'
      | 'liquidityLockTime'
      | 'stakingTokenId'
    > = {
      vaultId: vault.vaultId,
      vaultAddress: vaultAddress,
      userAddress,
      liquidityPoolId: pool?.id,
      inventoryTokens,
      inventoryValue,
      inventoryShare,
      inventoryApr,
      inventorySplit,

      liquidityTokens,
      liquidityEth,
      liquidityValue,
      liquidityShare,
      liquidityApr,
      liquiditySplit,

      claimableAmount,
      claimableValue,

      valueStaked,
      totalValue,

      poolReserves: reserves,
      xSlpBalance,
      xSlpSupply,
      xTokenBalance,
      xTokenShare,
      xTokenSupply,
      slpBalance,
      slpSupply,

      periodFees: feeReceipts.reduce(
        (total, receipt) => total + receipt.amount,
        Zero
      ),
      createdAt: vault.createdAt,
    };

    return position;
  };
