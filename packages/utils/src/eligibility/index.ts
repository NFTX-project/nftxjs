import makeCheckEligible from './checkEligible';
import makeFetchMerkleLeaves from './fetchMerkleLeaves';
import makeFetchMerkleReference from './fetchMerkleReference';
import makeProcessTokens from './processTokens';
import makeRequiresProcessing from './requiresProcessing';

export { default as isMerkleVault } from './isMerkleVault';

export const checkEligible = makeCheckEligible();
export const fetchMerkleLeaves = makeFetchMerkleLeaves();
export const fetchMerkleReference = makeFetchMerkleReference();
export const processTokens = makeProcessTokens({ fetchMerkleLeaves });
export const requiresProcessing = makeRequiresProcessing({ fetchMerkleLeaves });
