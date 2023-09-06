import makeFetchBlockNumberByTimestamp from './fetchBlockNumberByTimestamp';

export { default as addressEqual } from './addressEqual';
export { default as balanceOf } from './balanceOf';
export { default as totalSupply } from './totalSupply';
export { default as getChainConstant } from './getChainConstant';
export { default as parseLogEvent } from './parseLogEvent';
export { default as parseLogEvents } from './parseLogEvents';
export { default as getContract } from './getContract';

export const fetchBlockNumberByTimestamp = makeFetchBlockNumberByTimestamp({
  // Fun with possibly-undefined globals!
  fetch: typeof fetch !== 'undefined' ? fetch : (undefined as any),
});
