import { Queue, QueueOptions } from 'bullmq';
import { getConnection } from '../connection';

export class NftxQueue extends Queue {
  constructor(name: string, opts: QueueOptions) {
    super(name, opts);
    NftxQueue.queues[name] = this;
  }
  close() {
    delete NftxQueue.queues[this.name];
    return super.close();
  }

  static queues: Record<string, Queue> = {};

  static closeAll() {
    Object.values(NftxQueue.queues).forEach((queue) => {
      queue.close();
    });
  }
}

const getQueue = (queueName: string) => {
  return (
    NftxQueue.queues[queueName] ||
    new NftxQueue(queueName, {
      connection: getConnection(queueName),
      defaultJobOptions: {
        attempts: 5,
        removeOnComplete: true,
        removeOnFail: true,
        backoff: {
          type: 'exponential',
          delay: 30000,
        },
      },
    })
  );
};

export default getQueue;
