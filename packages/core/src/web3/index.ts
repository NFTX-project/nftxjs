import makeFetchBlockNumberByTimestamp from './fetchBlockNumberByTimestamp';

export { default as addressEqual } from './addressEqual';
export { default as fetchTokenBalance } from './fetchTokenBalance';
export { default as fetchTotalSupply } from './fetchTotalSupply';
export { default as getChainConstant } from './getChainConstant';
export { default as fromEthersNumber } from './fromEthersNumber';
export { default as getContract } from './getContract';
export { default as MulticallContract } from './MulticallContract';
export { default as parseLogEvent } from './parseLogEvent';
export { default as parseLogEvents } from './parseLogEvents';
export * from './types';
export { default as toEthersNumber } from './toEthersNumber';

export const fetchBlockNumberByTimestamp = makeFetchBlockNumberByTimestamp({
  fetch,
});
