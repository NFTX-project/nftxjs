import type { InventoryPool } from '@nftx/types';
import { Zero } from '@nftx/constants';

const calculatePeriodFees = (): InventoryPool['periodFees'] => {
  return {
    // TODO: calculate period fees
    // I think in theory we should be able to just pull in all activityEvents for the given period
    // and add up the fee receipts to get the total
    '1m': Zero,
    '24h': Zero,
    '7d': Zero,
    all: Zero,
  };
};

export default calculatePeriodFees;
