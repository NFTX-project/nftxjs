import { SIGNAL_QUEUE_NAME } from '../constants';
import getQueue from './getQueue';

const getSignalQueue = () => {
  return getQueue(SIGNAL_QUEUE_NAME);
};

export default getSignalQueue;
