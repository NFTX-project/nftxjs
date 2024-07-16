import { getSignalQueue } from '../queues';
import { Signals } from '../types';

const createJobId = <S extends keyof Signals>({
  payload,
  type,
}: {
  type: S;
  payload: Signals[S];
}) => {
  const params = Object.entries(payload)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const header = `${type}__`;

  return `${header}${params}`.replace(/:/g, ''); // jobId cannot contain colons
};

const sendSignal = <S extends keyof Signals>({
  payload,
  type,
}: {
  type: S;
  payload: Signals[S];
}) => {
  const jobId = createJobId({ type, payload });
  const queue = getSignalQueue();
  return queue.add(type, payload, { jobId });
};

export default sendSignal;
