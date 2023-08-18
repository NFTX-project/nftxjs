import type { Address, LiquidityPool, Provider, Vault } from '@nftx/types';
import { addressEqual, getChainConstant, getContract } from '@nftx/utils';
import { NFTX_ROUTER, WETH_TOKEN, Zero } from '@nftx/constants';
import { NftxRouter } from '@nftx/abi';

type FeeTier = LiquidityPool['feeTier'];
const FEE_TIERS: FeeTier[] = [0.3, 0.5, 1];

const fetchPoolAddress = async ({
  feeTier,
  network,
  provider,
  vaultAddress,
}: {
  vaultAddress: Address;
  feeTier: 0.3 | 0.5 | 1;
  network: number;
  provider: Provider;
}) => {
  const fee = feeTier * 10000;

  const contract = getContract({
    address: getChainConstant(NFTX_ROUTER, network),
    provider,
    abi: NftxRouter,
  });

  const poolAddress = await contract.read.computePool({
    args: [vaultAddress, fee],
  });

  return poolAddress;
};

const createStub = ({
  feeTier,
  network,
  poolAddress,
  vault,
}: {
  vault: Pick<Vault, 'id' | 'vaultId' | 'token'>;
  feeTier: 0.3 | 0.5 | 1;
  poolAddress: Address;
  network: number;
}): LiquidityPool => {
  const wethAddress = getChainConstant(WETH_TOKEN, network);

  return {
    activeLiquidity: Zero,
    apr: { '1m': Zero, '24h': Zero, '7d': Zero, all: Zero },
    exists: false,
    fees: [
      {
        id: '0x',
        feeType: 'FIXED_LP_FEE',
        feePercentage: feeTier,
      },
      { id: '0x', feeType: 'FIXED_PROTOCOL_FEE', feePercentage: 0 },
      {
        id: '0x',
        feeType: 'FIXED_TRADING_FEE',
        feePercentage: feeTier,
      },
    ],
    feeTier,
    id: poolAddress,
    name: `${vault.token.symbol} ${feeTier}% Pool`,
    periodFees: { '1m': Zero, '24h': Zero, '7d': Zero, all: Zero },
    tick: Zero,
    tokens: [
      vault.token,
      { id: wethAddress, name: 'Wrapped Ether', symbol: 'WETH' },
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
  };
};

const stubVaultPool = async ({
  feeTier,
  network,
  provider,
  vault,
}: {
  feeTier: FeeTier;
  network: number;
  provider: Provider;
  vault: Pick<Vault, 'id' | 'vaultId' | 'token'>;
}) => {
  const poolAddress = await fetchPoolAddress({
    feeTier,
    network,
    provider,
    vaultAddress: vault.id,
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
  // 0.3% 0.5% and 1%
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
}: {
  vault: Pick<Vault, 'id' | 'vaultId' | 'token'>;
  pools: LiquidityPool[];
  network: number;
  provider: Provider;
}) => {
  // Find all pools for this vault
  const vaultPools = getPoolsByVaultId(allPools, vault.vaultId);
  const tiers = getMissingTiers(vaultPools);

  // For each tier that doesn't have a pool, calculate the address and create a stubbed pool for it
  await Promise.all(
    tiers.map(async (feeTier) => {
      vaultPools.push(
        await stubVaultPool({ feeTier, network, provider, vault })
      );
    })
  );

  return vaultPools;
};

const stubMissingPools = async ({
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
  pools: LiquidityPool[];
  provider: Provider;
}) => {
  if (poolIds) {
    // We're fetching a specific set of poolIds we don't need to stub anything
    return allPools;
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
      });
    })
  );

  return missingPools.flat();
};

export default stubMissingPools;
