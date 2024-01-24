import { Job, Worker } from 'bullmq';
import { getConnection } from '../connection';

export class NftxWorker extends Worker {
  constructor(queueName: string, onJob: (job: Job) => any) {
    super(queueName, onJob, {
      concurrency: 8,
      connection: getConnection(queueName),
    });
    NftxWorker.workers[queueName] = this;
  }

  close() {
    delete NftxWorker.workers[this.name];
    return super.close();
  }

  static workers: Record<string, NftxWorker> = {};

  static closeAll() {
    Object.values(NftxWorker.workers).forEach((worker) => {
      worker.close();
    });
  }
}

// Create a bullmq worker for the given queue name (internal use)
const createWorker = (queueName: string, onJob: (job: Job) => any) => {
  const worker = new NftxWorker(queueName, onJob);
  return worker;
};

export default createWorker;
