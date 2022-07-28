import type { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
import { parseEther } from '@ethersproject/units';
import { toEthersNumber } from '../web3';
import type { Vault, VaultFeeReceipt } from './types';

const calculatePercentageStaked = ({
  balance,
  supply,
}: {
  balance: BigNumber;
  supply: BigNumber;
}) => {
  if (!balance || !supply || balance.eq(0) || supply.eq(0)) {
    return Zero;
  }
  return balance.mul(WeiPerEther).div(supply);
};

const calculateLiquidityPoolSize = ({
  reserveVToken,
  slpSupply,
  slpBalance,
}: {
  reserveVToken: BigNumber;
  slpSupply: BigNumber;
  slpBalance: BigNumber;
}) => {
  const percentageStaked = calculatePercentageStaked({
    balance: slpBalance,
    supply: slpSupply,
  });

  if (reserveVToken.eq(0) || percentageStaked.eq(0)) {
    return Zero;
  }

  const vToken = reserveVToken.mul(percentageStaked).div(WeiPerEther);

  return vToken;
};

const calculateInventoryPoolSize = ({
  xTokenSupply,
  xTokenShare,
}: {
  xTokenSupply: BigNumber;
  xTokenShare: BigNumber;
}) => {
  const vToken = xTokenSupply.mul(xTokenShare).div(WeiPerEther);

  return vToken;
};

const calculatePeriodFees = (feeReceipts: VaultFeeReceipt[]) => {
  if (!feeReceipts?.length) {
    return Zero;
  }

  const fees = feeReceipts.reduce(
    (total, receipt) => total.add(receipt.amount),
    Zero
  );

  return fees;
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
  vToken: BigNumber;
  periodFees: BigNumber;
  share: number;
  multiplier: number;
  createdAt: number;
}) => {
  let apr = 0;

  if (vToken.gt(0) && periodFees.gt(0)) {
    const periodMultiplier = getPeriodMultiplier(createdAt);
    // yearly return
    const numerator = periodFees
      .mul(periodMultiplier)
      .mul(parseEther(`${share}`))
      .div(WeiPerEther)
      .mul(12);
    const denominator = vToken.mul(multiplier);
    const result = numerator.mul(WeiPerEther).div(denominator);
    apr = toEthersNumber(result);
  }

  return apr;
};

const calculateVaultApr = ({
  vault,
  slpSupply,
  slpBalance,
  xTokenSupply,
  xTokenShare,
  feeReceipts,
}: {
  vault: Pick<Vault, 'reserveVtoken' | 'createdAt'>;
  slpSupply: BigNumber;
  slpBalance: BigNumber;
  xTokenSupply: BigNumber;
  xTokenShare: BigNumber;
  feeReceipts: VaultFeeReceipt[];
}) => {
  const lpVToken = calculateLiquidityPoolSize({
    reserveVToken: vault.reserveVtoken,
    slpSupply,
    slpBalance,
  });
  const ipVToken = calculateInventoryPoolSize({ xTokenSupply, xTokenShare });
  const periodFees = calculatePeriodFees(feeReceipts);
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
