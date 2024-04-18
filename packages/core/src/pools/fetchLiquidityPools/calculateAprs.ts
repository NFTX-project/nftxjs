import { FeeTier, VAULT_FEE_TIER, WeiPerEther } from '@nftx/constants';
import type {
  LiquidityPool,
  NftxV3Uniswap,
  VaultFeeReceipt,
} from '@nftx/types';
import { parseEther } from 'viem';

const ONE_DAY = 86400;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_DAY * 365;

const calculatePoolValue = ({
  isWeth0,
  balances,
  vTokenToEth,
}: {
  balances: string[] | undefined;
  isWeth0: boolean;
  vTokenToEth: bigint;
}) => {
  const eth = parseEther(balances?.[isWeth0 ? 0 : 1] ?? '0');
  const vToken = parseEther(balances?.[isWeth0 ? 1 : 0] ?? '0');
  const vTokenValue = (vToken * vTokenToEth) / WeiPerEther;
  const poolValue = eth + vTokenValue;
  return poolValue;
};

const snapshotToBalances = (
  snapshot:
    | Pick<
        NftxV3Uniswap.PoolDayData,
        'totalValueLockedToken0' | 'totalValueLockedToken1'
      >
    | undefined
) => {
  if (!snapshot) {
    return undefined;
  }
  return [snapshot.totalValueLockedToken0, snapshot.totalValueLockedToken1];
};

const calculateAMMApr = ({
  createdAt,
  dailySnapshots,
  isWeth0,
  periodEnd,
  periodStart,
  vTokenToEth,
}: {
  dailySnapshots: Pick<
    NftxV3Uniswap.PoolDayData,
    'date' | 'totalValueLockedToken0' | 'totalValueLockedToken1' | 'feesETH'
  >[];
  isWeth0: boolean;
  periodStart: number;
  periodEnd: number;
  createdAt: number;
  vTokenToEth: bigint;
}) => {
  const aprs: bigint[] = [];

  let start = periodStart > createdAt ? periodStart : createdAt;
  let end = start + 86400;
  const initialSnapshot = dailySnapshots.findLast(
    (s) => Number(s.date) >= start && Number(s.date) <= end
  );
  let lastPoolValue = calculatePoolValue({
    isWeth0,
    balances: snapshotToBalances(initialSnapshot),
    vTokenToEth,
  });

  while (end <= periodEnd) {
    const dailySnapshot = dailySnapshots.find(
      (s) => Number(s.date) >= start && Number(s.date) <= end
    );
    let apr = 0n;

    if (dailySnapshot) {
      lastPoolValue = calculatePoolValue({
        isWeth0,
        vTokenToEth,
        balances: snapshotToBalances(dailySnapshot),
      });

      const poolValue = lastPoolValue;
      const periodFees = parseEther(dailySnapshot.feesETH);
      if (periodFees && poolValue) {
        apr = (periodFees * WeiPerEther * 365n) / poolValue;
        if (apr < 0n) {
          apr = 0n;
        }
      }
    }

    aprs.push(apr);

    start += 86400;
    end += 86400;
  }

  if (!aprs.length) {
    return 0n;
  }

  const totalApr = aprs.reduce((total, apr) => total + apr, 0n);
  const averageApr = totalApr / BigInt(aprs.length);
  return averageApr;
};

const calculateVaultFeeApr = ({
  dailySnapshots,
  isWeth0,
  periodEnd,
  periodStart,
  vTokenToEth,
  vaultFeeReceipts,
  createdAt,
}: {
  periodStart: number;
  periodEnd: number;
  dailySnapshots: Pick<
    NftxV3Uniswap.PoolDayData,
    'date' | 'totalValueLockedToken0' | 'totalValueLockedToken1'
  >[];
  vaultFeeReceipts: Pick<VaultFeeReceipt, 'date' | 'amount'>[];
  vTokenToEth: bigint;
  isWeth0: boolean;
  createdAt: number;
}) => {
  const aprs: bigint[] = [];

  let start = periodStart > createdAt ? periodStart : createdAt;
  let end = start + 86400;
  const initialSnapshot = dailySnapshots.findLast(
    (s) => Number(s.date) >= start && Number(s.date) <= end
  );
  let lastPoolValue = calculatePoolValue({
    isWeth0,
    balances: snapshotToBalances(initialSnapshot),
    vTokenToEth,
  });

  while (end <= periodEnd) {
    const dailySnapshot = dailySnapshots.find(
      (s) => Number(s.date) >= start && Number(s.date) <= end
    );
    const vaultFeeReceipt = vaultFeeReceipts.find(
      (r) => r.date >= start && r.date <= end
    );

    const periodFees = vaultFeeReceipt?.amount || 0n;
    if (dailySnapshot) {
      lastPoolValue = calculatePoolValue({
        isWeth0,
        vTokenToEth,
        balances: snapshotToBalances(dailySnapshot),
      });
    }
    const poolValue = lastPoolValue;

    let apr = 0n;
    if (periodFees && poolValue) {
      apr = (periodFees * 800000000000000000n * 365n) / poolValue;
      if (apr < 0n) {
        apr = 0n;
      }
    }
    aprs.push(apr);

    start += 86400;
    end += 86400;
  }

  if (!aprs.length) {
    return 0n;
  }

  const totalApr = aprs.reduce((total, apr) => total + apr, 0n);
  const averageApr = totalApr / BigInt(aprs.length);
  return averageApr;
};

export default ({
  createdAt,
  dailySnapshots,
  isWeth0,
  vaultFeeReceipts,
  vTokenToEth,
  feeTier,
}: {
  createdAt: number;
  dailySnapshots: Pick<
    NftxV3Uniswap.PoolDayData,
    'date' | 'totalValueLockedToken0' | 'totalValueLockedToken1' | 'feesETH'
  >[];
  vaultFeeReceipts: VaultFeeReceipt[];
  vTokenToEth: bigint;
  isWeth0: boolean;
  feeTier: FeeTier;
}): LiquidityPool['apr'] => {
  const now = Math.floor(Date.now() / 1000);

  if (feeTier === VAULT_FEE_TIER) {
    return {
      '24h': calculateVaultFeeApr({
        dailySnapshots,
        isWeth0,
        vaultFeeReceipts,
        vTokenToEth,
        periodStart: now - ONE_DAY,
        periodEnd: now,
        createdAt,
      }),
      '7d': calculateVaultFeeApr({
        dailySnapshots,
        isWeth0,
        vaultFeeReceipts,
        vTokenToEth,
        periodStart: now - ONE_WEEK,
        periodEnd: now,
        createdAt,
      }),
      '1m': calculateVaultFeeApr({
        dailySnapshots,
        isWeth0,
        vaultFeeReceipts,
        vTokenToEth,
        periodStart: now - ONE_MONTH,
        periodEnd: now,
        createdAt,
      }),
      '1y': calculateVaultFeeApr({
        dailySnapshots,
        isWeth0,
        vaultFeeReceipts,
        vTokenToEth,
        periodStart: now - ONE_YEAR,
        periodEnd: now,
        createdAt,
      }),
    };
  }

  return {
    '24h': calculateAMMApr({
      dailySnapshots,
      isWeth0,
      vTokenToEth,
      periodStart: now - ONE_DAY,
      periodEnd: now,
      createdAt,
    }),
    '7d': calculateAMMApr({
      dailySnapshots,
      isWeth0,
      vTokenToEth,
      periodStart: now - ONE_WEEK,
      periodEnd: now,
      createdAt,
    }),
    '1m': calculateAMMApr({
      dailySnapshots,
      isWeth0,
      vTokenToEth,
      periodStart: now - ONE_MONTH,
      periodEnd: now,
      createdAt,
    }),
    '1y': calculateAMMApr({
      dailySnapshots,
      isWeth0,
      vTokenToEth,
      periodStart: now - ONE_YEAR,
      periodEnd: now,
      createdAt,
    }),
  };
};
