import makeCreatePool from './createPool';
import makeEstimateCreatePoolGas from './estimateCreatePoolGas';
import { getContract } from '@nftx/utils';
import { estimateGasAndFees } from '../trade';

export const createPool = makeCreatePool({ getContract });

export const estimateCreatePoolGas = makeEstimateCreatePoolGas({
  estimateGasAndFees,
  getContract,
});
