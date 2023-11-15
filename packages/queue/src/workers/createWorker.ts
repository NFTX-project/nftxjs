import { Job, Worker } from 'bullmq';
import { getConnection } from '../connection';

const createWorker = (queueName: string, onJob: (job: Job) => any) => {
  const connection = getConnection();
  const worker = new Worker(queueName, onJob, {
    concurrency: 8,
    connection,
  });
  return worker;
};

export default createWorker;
