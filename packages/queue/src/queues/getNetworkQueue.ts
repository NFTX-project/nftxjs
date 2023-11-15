import { NETWORK_QUEUE_NAMES } from '../constants';
import getQueue from './getQueue';

/** Returns a bullmq instance for a specific network queue */
const getNetworkQueue = (network: number) => {
  const queueName =
    NETWORK_QUEUE_NAMES[network as keyof typeof NETWORK_QUEUE_NAMES];
  return getQueue(queueName);
};

export default getNetworkQueue;
