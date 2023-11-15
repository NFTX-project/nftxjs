import { getSignalQueue } from '../queues';
import { Signals } from '../types';

const sendSignal = <S extends keyof Signals>({
  payload,
  type,
}: {
  type: S;
  payload: Signals[S];
}) => {
  const queue = getSignalQueue();
  return queue.add(type, payload);
};

export default sendSignal;
