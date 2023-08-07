import { Zero } from '@nftx/constants';

const calculatePeriodFees = () => {
  // TODO: implement
  // I think in theory we should be able to just pull in all activityEvents for the given period
  // and add up the fee receipts to get the total
  return {
    '24h': Zero,
    '7d': Zero,
    '1m': Zero,
    all: Zero,
  };
};

export default calculatePeriodFees;
