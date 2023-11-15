import { NETWORK_QUEUE_NAMES } from '../constants';
import getQueue from './getQueue';

const getNetworkQueue = (network: number) => {
  const queueName =
    NETWORK_QUEUE_NAMES[network as keyof typeof NETWORK_QUEUE_NAMES];
  return getQueue(queueName);
};

export default getNetworkQueue;
