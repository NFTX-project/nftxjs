import type { LiquidityPool } from '@nftx/types';
import { INVENTORY_SHARE, calculatePoolAprs } from '@nftx/utils';

export default ({
  createdAt,
  periodFees,
  poolValue,
}: {
  createdAt: number;
  periodFees: LiquidityPool['periodFees'];
  poolValue: bigint;
}) => {
  return calculatePoolAprs({
    share: INVENTORY_SHARE,
    createdAt,
    periodFees,
    poolValue,
  });
};
