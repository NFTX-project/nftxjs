import type { InventoryPool, VaultFeeReceipt } from '@nftx/types';
import { Zero } from '@nftx/constants';

const calculatePeriodFees = (
  receipts: VaultFeeReceipt[]
): InventoryPool['periodFees'] => {
  const periodFees: InventoryPool['periodFees'] = {
    '1m': Zero,
    '24h': Zero,
    '7d': Zero,
    all: Zero,
  };

  const now = Math.floor(Date.now() / 1000);
  const oneDayAgo = now - 86400;
  const oneWeekAgo = now - 604800;
  const oneMonthAgo = now - 2592000;

  receipts.forEach((receipt) => {
    if (receipt.date >= oneDayAgo) {
      periodFees['24h'] += receipt.amount;
    }
    if (receipt.date >= oneWeekAgo) {
      periodFees['7d'] += receipt.amount;
    }
    if (receipt.date >= oneMonthAgo) {
      periodFees['1m'] += receipt.amount;
    }
    periodFees.all += receipt.amount;
  });

  return periodFees;
};

export default calculatePeriodFees;
