import { WeiPerEther } from '@nftx/constants';
import { parseEther } from 'viem';

const increaseByPercentage = (
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

export default increaseByPercentage;
