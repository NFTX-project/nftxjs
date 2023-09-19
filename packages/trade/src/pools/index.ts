import makeCreateVault from './createVault';
import { getContract } from '@nftx/utils';

export const createVault = makeCreateVault({ getContract });
