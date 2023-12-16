import type { InventoryPool, VaultFeeReceipt } from '@nftx/types';
import { Zero } from '@nftx/constants';

const calculatePeriodFees = (
  receipts: Pick<VaultFeeReceipt, 'date' | 'amount'>[]
): InventoryPool['periodFees'] => {
  const periodFees: InventoryPool['periodFees'] = {
    '1m': Zero,
    '24h': Zero,
    '7d': Zero,
    '1y': Zero,
  };

  const now = Math.floor(Date.now() / 1000);
  const oneDayAgo = now - 86400;
  const oneWeekAgo = now - 604800;
  const oneMonthAgo = now - 2592000;
  const oneYearAgo = now - 31536000;

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
    if (receipt.date >= oneYearAgo) {
      periodFees['1y'] += receipt.amount;
    }
  });

  return periodFees;
};

export default calculatePeriodFees;
