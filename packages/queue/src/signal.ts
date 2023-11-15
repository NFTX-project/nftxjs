import { Address } from '@nftx/types';
import { getSignalQueue } from './queues';

type Signals = {
  'index-collection': { collectionAddress: Address; network: number };
  'index-vault': { network: number; vaultId: string };
  'index-inactive-vaults': { network: number };
};

const signal = <S extends keyof Signals>(name: S, payload: Signals[S]) => {
  const queue = getSignalQueue();
  return queue.add(name, payload);
};

export default signal;
