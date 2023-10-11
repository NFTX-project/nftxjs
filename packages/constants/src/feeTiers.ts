import { ValidationError } from '@nftx/errors';

/** 0.3% | 1% | 3% */
export type FeeTier = 3_000 | 10_000 | 30_000;
export type FeePercentage = 0 | 0.003 | 0.01 | 0.03;
export type FeeTickSpacing = 60 | 200 | 600;

export const VAULT_FEE_TIER: FeeTier = 3_000;

export const percentageToFeeTier = (feePercentage: number): FeeTier => {
  switch (feePercentage) {
    case 0.3:
    case 0.003:
      return 3_000;
    case 1:
    case 0.01:
      return 10_000;
    case 3:
    case 0.03:
      return 30_000;
    default:
      throw new ValidationError({
        feePercentage: `Invalid fee percentage: "${feePercentage}"`,
      });
  }
};

export const feeTierToPercentage = (feeTier: number): FeePercentage => {
  switch (feeTier) {
    case 3000:
      return 0.003;
    case 10000:
      return 0.01;
    case 30000:
      return 0.03;
    default:
      throw new ValidationError({
        feeTier: `Invalid fee tier: "${feeTier}"`,
      });
  }
};

export const feeTierToTickSpacing = (feeTier: number): FeeTickSpacing => {
  switch (feeTier) {
    case 3000:
      return 60;
    case 10000:
      return 200;
    case 30000:
      return 600;
    default:
      throw new ValidationError({
        feeTier: `Invalid fee tier: "${feeTier}"`,
      });
  }
};
