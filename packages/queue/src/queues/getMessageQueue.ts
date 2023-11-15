import { MESSAGE_QUEUE_NAME } from '../constants';
import getQueue from './getQueue';

const getMessageQueue = () => {
  return getQueue(MESSAGE_QUEUE_NAME);
};

export default getMessageQueue;
