import { Job } from 'bullmq';
import createWorker from './createWorker';
import { NETWORK_QUEUE_NAMES } from '../constants';

const createNetworkWorker = (network: number, onJob: (job: Job) => any) => {
  const queueName =
    NETWORK_QUEUE_NAMES[network as keyof typeof NETWORK_QUEUE_NAMES];

  return createWorker(queueName, onJob);
};

export default createNetworkWorker;
