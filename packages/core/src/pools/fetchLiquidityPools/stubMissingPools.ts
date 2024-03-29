import type { Address, LiquidityPool, Provider, Vault } from '@nftx/types';
import { addressEqual, getChainConstant, getContract } from '@nftx/utils';
import {
  FeeTier,
  POOL_ROUTER,
  WETH_TOKEN,
  Zero,
  feeTierToPercentage,
} from '@nftx/constants';
import { PoolRouter } from '@nftx/abi';

type GetContract = typeof getContract;

const FEE_TIERS: FeeTier[] = [3_000, 10_000, 30_000];

const fetchPoolAddress = async ({
  feeTier,
  network,
  provider,
  vaultAddress,
  getContract,
}: {
  vaultAddress: Address;
  feeTier: FeeTier;
  network: number;
  provider: Provider;
  getContract: GetContract;
}) => {
  const contract = getContract({
    address: getChainConstant(POOL_ROUTER, network),
    provider,
    abi: PoolRouter,
  });

  const poolAddress = await contract.read.computePool({
    args: [vaultAddress, feeTier],
  });

  return poolAddress.toLowerCase() as Address;
};

const createStub = ({
  feeTier,
  network,
  poolAddress,
  vault,
}: {
  vault: Pick<Vault, 'id' | 'vaultId' | 'token'>;
  feeTier: FeeTier;
  poolAddress: Address;
  network: number;
}): LiquidityPool => {
  const wethAddress = getChainConstant(WETH_TOKEN, network);
  const feePercentage = feeTierToPercentage(feeTier);

  return {
    activeLiquidity: Zero,
    apr: { '1m': Zero, '24h': Zero, '7d': Zero, '1y': Zero },
    exists: false,
    fees: [
      {
        id: '0x',
        feeType: 'FIXED_LP_FEE',
        feePercentage,
      },
      { id: '0x', feeType: 'FIXED_PROTOCOL_FEE', feePercentage: 0 },
      {
        id: '0x',
        feeType: 'FIXED_TRADING_FEE',
        feePercentage,
      },
    ],
    feeTier,
    id: poolAddress,
    name: `${vault.token.symbol} ${feePercentage * 100}% Pool`,
    periodFees: { '1m': Zero, '24h': Zero, '7d': Zero, '1y': Zero },
    tick: Zero,
    tickValue: Zero,
    tokens: [
      { ...vault.token, balance: Zero },
      { id: wethAddress, name: 'Wrapped Ether', symbol: 'WETH', balance: Zero },
    ],
    totalLiquidity: Zero,
    vaultAddress: vault.id,
    vaultId: vault.vaultId,
    dailyRevenue: Zero,
    dailyVolume: Zero,
    inRangeLiquidity: Zero,
    totalValueLocked: Zero,
    weeklyRevenue: Zero,
    weeklyVolume: Zero,
    totalPositions: 0,
  };
};

const stubVaultPool = async ({
  feeTier,
  network,
  provider,
  vault,
  getContract,
}: {
  feeTier: FeeTier;
  network: number;
  provider: Provider;
  vault: Pick<Vault, 'id' | 'vaultId' | 'token'>;
  getContract: GetContract;
}) => {
  const poolAddress = await fetchPoolAddress({
    feeTier,
    network,
    provider,
    vaultAddress: vault.id,
    getContract,
  });
  return createStub({ feeTier, network, poolAddress, vault });
};

const getPoolsByVaultId = <T extends Pick<LiquidityPool, 'vaultId'>>(
  pools: T[],
  vaultId: string
) => {
  return pools.filter((pool) => pool.vaultId === vaultId);
};

const getMissingTiers = (pools: Pick<LiquidityPool, 'feeTier'>[]) => {
  // There should be 3 liquidity pools for each vault
  // If any of them are missing, they haven't been created yet and we'll need to create stub for them
  const tiers = [...FEE_TIERS];

  // Remove tiers that we have pools for, then whatever remains needs stubbing
  pools.forEach((pool) => {
    const i = tiers.indexOf(pool.feeTier);
    if (i >= 0) {
      tiers.splice(i, 1);
    }
  });

  return tiers;
};

const stubMissingVaultPools = async ({
  pools: allPools,
  network,
  provider,
  vault,
  getContract,
}: {
  vault: Pick<Vault, 'id' | 'vaultId' | 'token'>;
  pools: Pick<LiquidityPool, 'vaultId' | 'feeTier'>[];
  network: number;
  provider: Provider;
  getContract: GetContract;
}) => {
  // Find all pools for this vault
  const vaultPools = getPoolsByVaultId(allPools, vault.vaultId);
  const tiers = getMissingTiers(vaultPools);

  // For each tier that doesn't have a pool, calculate the address and create a stubbed pool for it
  return Promise.all(
    tiers.map((feeTier) => {
      return stubVaultPool({ feeTier, network, provider, vault, getContract });
    })
  );
};

export const makeStubMissingPools =
  ({ getContract }: { getContract: GetContract }) =>
  async ({
    network,
    pools: allPools,
    vaults,
    poolIds,
    vaultAddresses,
    vaultIds,
    provider,
  }: {
    network: number;
    vaults: Pick<Vault, 'id' | 'vaultId' | 'token'>[];
    vaultIds?: string[];
    vaultAddresses?: Address[];
    poolIds?: Address[];
    pools: Pick<LiquidityPool, 'vaultId' | 'feeTier'>[];
    provider: Provider;
  }): Promise<LiquidityPool[]> => {
    if (poolIds) {
      // We're fetching a specific set of poolIds we don't need to stub anything
      return [];
    }

    const missingPools = await Promise.all(
      vaults.map((vault) => {
        if (vaultIds && vaultIds.includes(vault.vaultId) === false) {
          return [];
        }
        if (
          vaultAddresses &&
          vaultAddresses.some((a) => addressEqual(a, vault.id)) === false
        ) {
          return [];
        }

        return stubMissingVaultPools({
          network,
          pools: allPools,
          provider,
          vault,
          getContract,
        });
      })
    );

    return missingPools.flat();
  };

const stubMissingPools = makeStubMissingPools({ getContract });

export default stubMissingPools;
