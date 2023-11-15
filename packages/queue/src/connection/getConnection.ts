import IORedis from 'ioredis';
import { BULLMQ_REDIS_URI } from '../constants';

let connection: IORedis;

const getConnection = () => {
  if (!connection) {
    connection = new IORedis(BULLMQ_REDIS_URI);
  }
  return connection;
};

export default getConnection;
