import { WeiPerEther, Zero } from '@nftx/constants';
import type { Vault } from '@nftx/types';
import { parseEther } from 'viem';
import { toEthersNumber } from '../web3';

const calculatePercentageStaked = ({
  balance,
  supply,
}: {
  balance: bigint;
  supply: bigint;
}) => {
  if (!balance || !supply || balance === Zero || supply === Zero) {
    return Zero;
  }
  return (balance * WeiPerEther) / supply;
};

const calculateLiquidityPoolSize = ({
  reserveVToken,
  slpSupply,
  slpBalance,
}: {
  reserveVToken: bigint;
  slpSupply: bigint;
  slpBalance: bigint;
}) => {
  const percentageStaked = calculatePercentageStaked({
    balance: slpBalance,
    supply: slpSupply,
  });

  if (reserveVToken === Zero || percentageStaked === Zero) {
    return Zero;
  }

  const vToken = (reserveVToken * percentageStaked) / WeiPerEther;

  return vToken;
};

const calculateInventoryPoolSize = ({
  xTokenSupply,
  xTokenShare,
}: {
  xTokenSupply: bigint;
  xTokenShare: bigint;
}) => {
  const vToken = (xTokenSupply * xTokenShare) / WeiPerEther;

  return vToken;
};

const getPeriodMultiplier = (createdAt: number) => {
  const vaultAge = Date.now() / 1000 - createdAt;
  const oneMonth = 3600 * 24 * 30;
  const underOneMonthOld = vaultAge < oneMonth;
  const proRata = Math.floor(oneMonth / vaultAge);
  const periodMultiplier = underOneMonthOld ? proRata : 1;
  return periodMultiplier;
};

const calculateApr = ({
  vToken,
  periodFees,
  share,
  multiplier,
  createdAt,
}: {
  vToken: bigint;
  periodFees: bigint;
  share: number;
  multiplier: number;
  createdAt: number;
}) => {
  let apr = 0;

  if (vToken > Zero && periodFees > Zero) {
    const periodMultiplier = getPeriodMultiplier(createdAt);
    // yearly return
    const numerator =
      ((periodFees * BigInt(periodMultiplier) * parseEther(`${share}`)) /
        WeiPerEther) *
      12n;
    const denominator = vToken * BigInt(multiplier);
    const result = (numerator * WeiPerEther) / denominator;
    apr = toEthersNumber(result) ?? 0;
  }

  return apr;
};

/**
 * Calculate a vault's APR rate.
 * This method requires several different datapoints, such as slpSupply, xTokenSupply, accrued fees, etc.
 * Therefore it is recommended to instead use {@link @nftx/api!fetchPool} to get a vault's pool which contains the current APR values.
 */
const calculateVaultApr = (args: {
  vault: Pick<Vault, 'reserveVtoken' | 'createdAt'>;
  slpSupply: bigint;
  slpBalance: bigint;
  xTokenSupply: bigint;
  xTokenShare: bigint;
  periodFees: bigint;
}) => {
  const {
    vault,
    slpSupply,
    slpBalance,
    xTokenSupply,
    xTokenShare,
    periodFees,
  } = args;
  const lpVToken = calculateLiquidityPoolSize({
    reserveVToken: vault.reserveVtoken,
    slpSupply,
    slpBalance,
  });
  const ipVToken = calculateInventoryPoolSize({ xTokenSupply, xTokenShare });
  const liquidityApr = calculateApr({
    vToken: lpVToken,
    periodFees,
    share: 0.8,
    multiplier: 2,
    createdAt: vault.createdAt,
  });
  const inventoryApr = calculateApr({
    vToken: ipVToken,
    periodFees,
    share: 0.2,
    multiplier: 1,
    createdAt: vault.createdAt,
  });

  return { liquidityApr, inventoryApr };
};

export default calculateVaultApr;
