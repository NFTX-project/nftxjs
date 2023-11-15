import { Job } from 'bullmq';
import { MESSAGE_QUEUE_NAME } from '../constants';
import createWorker from './createWorker';

const createMessageWorker = (onJob: (job: Job) => any) => {
  return createWorker(MESSAGE_QUEUE_NAME, onJob);
};

export default createMessageWorker;
