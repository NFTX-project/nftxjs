import { Queue } from 'bullmq';
import { getConnection } from '../connection';

const queues: Record<string, Queue> = {};

const getQueue = (queueName: string) => {
  let queue = queues[queueName];
  if (!queue) {
    const connection = getConnection();
    queue = queues[queueName] = new Queue(queueName, { connection });
  }
  return queue;
};

export default getQueue;
