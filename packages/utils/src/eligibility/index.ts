import { getContract } from '../web3';
import makeCheckEligible from './checkEligible';
import makeFetchMerkleLeaves from './fetchMerkleLeaves';
import makeFetchMerkleReference from './fetchMerkleReference';
import makeProcessTokens from './processTokens';
import makeRequiresProcessing from './requiresProcessing';

export { default as isMerkleVault } from './isMerkleVault';

export const checkEligible = makeCheckEligible({ getContract });
export const fetchMerkleLeaves = makeFetchMerkleLeaves({
  fetch: typeof fetch === 'undefined' ? (undefined as any) : fetch,
  getContract,
});
export const fetchMerkleReference = makeFetchMerkleReference({ getContract });
export const processTokens = makeProcessTokens({ fetchMerkleLeaves });
export const requiresProcessing = makeRequiresProcessing({ fetchMerkleLeaves });
