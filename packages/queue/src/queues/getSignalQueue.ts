import { SIGNAL_QUEUE_NAME } from '../constants';
import getQueue from './getQueue';

/** Returns a bullmq instance for top-level signals */
const getSignalQueue = () => {
  return getQueue(SIGNAL_QUEUE_NAME);
};

export default getSignalQueue;
