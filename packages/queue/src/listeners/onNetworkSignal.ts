import createWorker from './createWorker';
import { NETWORK_QUEUE_NAMES } from '../constants';
import { SignalCallback } from '../types';

/** Subscribes to signals on a queue for that specific network.
 * The main signal queue should manage delegating signals on to the network-specific queues.
 * Only one listener will be called for each signal sent.
 */
const onNetworkSignal = (network: number, callback: SignalCallback) => {
  const queueName =
    NETWORK_QUEUE_NAMES[network as keyof typeof NETWORK_QUEUE_NAMES];

  return createWorker(queueName, (job) => {
    const { name, data } = job;
    return callback({ payload: data, type: name as any });
  });
};

export default onNetworkSignal;
