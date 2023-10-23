import { WeiPerEther } from '@nftx/constants';
import { parseEther } from 'viem';

export const increaseByPercentage = (
  value: bigint,
  percentage: number | undefined
) => {
  if (!value || !percentage) {
    return value;
  }
  const bigPercentage = parseEther(`${1 + percentage}`);
  const adjusted = (value * bigPercentage) / WeiPerEther;
  return adjusted;
};

export const decreaseByPercentage = (
  value: bigint,
  percentage: number | undefined
) => {
  if (!value || !percentage) {
    return value;
  }
  return increaseByPercentage(value, -percentage);
};
