import makeCreatePool from './createPool';
import makeEstimateCreatePoolGas from './estimateCreatePoolGas';
import { getContract } from '@nftx/utils';

export const createPool = makeCreatePool({ getContract });

export const estimateCreatePoolGas = makeEstimateCreatePoolGas({
  getContract,
});
