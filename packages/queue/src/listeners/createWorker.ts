import { Job, Worker } from 'bullmq';
import { getConnection } from '../connection';

// Create a bullmq worker for the given queue name (internal use)
const createWorker = (queueName: string, onJob: (job: Job) => any) => {
  const connection = getConnection();
  const worker = new Worker(queueName, onJob, {
    concurrency: 8,
    connection,
  });
  return worker;
};

export default createWorker;
