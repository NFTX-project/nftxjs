import type { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { NFTX_LP_STAKING } from '@nftx/constants';
import type { fetchPool, LiquidityPool } from '../pools';
import type { fetchClaimableTokens } from '../staking';
import type { fetchReservesForToken, TokenReserve } from '../tokens';
import { t } from '../utils';
import {
  fetchUserVaultBalance,
  fetchVault,
  fetchVaultAprs,
  fetchVaultFees,
  fetchXTokenShare,
  Vault,
  VaultAddress,
  VaultFeeReceipt,
} from '../vaults';
import {
  Address,
  addressEqual,
  fetchTokenBalance,
  getChainConstant,
  type fetchTotalSupply,
} from '../web3';
import type { Position } from './types';
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

type FetchPool = typeof fetchPool;
type FetchClaimableTokens = typeof fetchClaimableTokens;
type FetchUserVaultBalance = typeof fetchUserVaultBalance;
type FetchVault = typeof fetchVault;
type FetchVaultAprs = typeof fetchVaultAprs;
type FetchXTokenShare = typeof fetchXTokenShare;
type FetchTotalSupply = typeof fetchTotalSupply;
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
    vaultAddress: VaultAddress;
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
    xTokenBalance?: BigNumber;
    xSlpBalance?: BigNumber;
    xTokenShare?: BigNumber;
    network?: number;
    inventoryApr?: number;
    liquidityApr?: number;
    slpSupply?: BigNumber;
    slpBalance?: BigNumber;
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
      args.xTokenBalance ?? balance?.xToken?.balance ?? Zero;
    const xSlpBalance = args.xSlpBalance ?? balance?.xSlp?.balance ?? Zero;
    let xTokenShare = args.xTokenShare;
    if (xTokenShare == null && vault.inventoryStakingPool?.id != null) {
      xTokenShare = await fetchXTokenShare({
        provider,
        vaultId: vault.vaultId,
        network,
      });
    }
    const needsApr = args.inventoryApr == null || args.liquidityApr == null;
    const apr = needsApr
      ? (
          await fetchVaultAprs({ network, vaultAddresses: [vaultAddress] })
        ).find((x) => addressEqual(x.vaultAddress, vaultAddress))
      : null;
    const inventoryApr = args.inventoryApr ?? apr?.inventoryApr ?? 0;
    const liquidityApr = args.liquidityApr ?? apr?.liquidityApr ?? 0;

    const slpBalance =
      args.slpBalance ?? pool?.stakingToken?.id
        ? await t(
            fetchTokenBalance({
              network,
              provider,
              ownerAddress: getChainConstant(NFTX_LP_STAKING, network),
              tokenAddress: pool.stakingToken.id,
            })
          )[1]
        : null;

    const slpSupply =
      args.slpSupply ?? pool?.stakingToken?.id
        ? await t(
            fetchTotalSupply({
              network,
              provider,
              tokenAddress: pool.stakingToken.id,
            })
          )[1]
        : null;

    const xTokenAddress = vault.inventoryStakingPool?.id;
    const xSlpAddress = pool?.dividendToken?.id;

    const xTokenSupply = xTokenAddress
      ? (await t(
          fetchTotalSupply({
            provider,
            network,
            tokenAddress: xTokenAddress,
          })
        )[1]) ?? Zero
      : Zero;
    const xSlpSupply = xSlpAddress
      ? (await t(
          fetchTotalSupply({ network, provider, tokenAddress: xSlpAddress })
        )[1]) ?? Zero
      : Zero;

    const feeReceipts =
      args.feeReceipts ??
      (await t(
        fetchVaultFees({
          network,
          fromTimestamp: Date.now() / 1000 - 2592000,
          vaultAddress,
        })
      )[1]);

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
    const liquidityValue = liquidityEth.mul(2);

    // CLAIMABLE
    // The amount of LP rewards that are claimable
    const [, claimableAmount = Zero] = await t(
      fetchClaimableTokens({
        pool,
        provider,
        userAddress,
        network,
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
      liquidityBalance: liquidityTokens.mul(2),
    });

    // The total eth value of all staked assets
    const valueStaked = liquidityValue.add(inventoryValue);
    // The total value including claimable amounts
    const totalValue = valueStaked.add(claimableValue);

    const position: Position = {
      vaultId: vault.vaultId,
      vaultAddress: vaultAddress,
      poolId: pool?.id,
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
      xSlp: xSlpBalance,
      xSlpSupply,
      xToken: xTokenBalance,
      xTokenShare,
      xTokenSupply,
      slpBalance,
      slpSupply,

      feeReceipts,
      createdAt: vault.createdAt,
    };

    return position;
  };
