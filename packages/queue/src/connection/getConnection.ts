import IORedis from 'ioredis';
import { BULLMQ_REDIS_URI } from '../constants';

const getConnection = () => {
  return new IORedis(BULLMQ_REDIS_URI);
};

export default getConnection;
