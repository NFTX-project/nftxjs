import type { InventoryPool } from '@nftx/types';
import { Zero } from '@nftx/constants';

const calculateAprs = (): InventoryPool['apr'] => {
  return {
    // TODO: calculate apr
    '1m': Zero,
    '24h': Zero,
    '7d': Zero,
    all: Zero,
  };
};

export default calculateAprs;
