import { Job } from 'bullmq';
import { SIGNAL_QUEUE_NAME } from '../constants';
import createWorker from './createWorker';

const createSignalWorker = (onJob: (job: Job) => any) => {
  return createWorker(SIGNAL_QUEUE_NAME, onJob);
};

export default createSignalWorker;
