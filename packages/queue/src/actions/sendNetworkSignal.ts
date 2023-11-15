import { getNetworkQueue } from '../queues';
import { Signals } from '../types';

const sendNetworkSignal = <S extends keyof Signals>({
  payload,
  network,
  type,
}: {
  network: number;
  type: S;
  payload: Signals[S];
}) => {
  const queue = getNetworkQueue(network);
  return queue.add(type, payload);
};

export default sendNetworkSignal;
