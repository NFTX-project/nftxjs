import type { InventoryPool } from '@nftx/types';
import { Zero } from '@nftx/constants';

const calculatePeriodFees = (): InventoryPool['periodFees'] => {
  return {
    // TODO: calculate period fees
    '1m': Zero,
    '24h': Zero,
    '7d': Zero,
    all: Zero,
  };
};

export default calculatePeriodFees;
