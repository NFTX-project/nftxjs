import { Address } from '@nftx/types';
import { getSignalQueue } from './queues';

type Messages = {
  'collection-indexed': { collectionAddress: Address; network: number };
  'vault-indexed': { network: number; vaultId: string };
};

const message = <S extends keyof Messages>(name: S, payload: Messages[S]) => {
  const queue = getSignalQueue();
  return queue.add(name, payload);
};

export default message;
