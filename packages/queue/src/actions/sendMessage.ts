import { getMessageQueue } from '../queues';
import { Messages } from '../types';

const sendMessage = <S extends keyof Messages>({
  type,
  payload,
}: {
  type: S;
  payload: Messages[S];
}) => {
  const queue = getMessageQueue();
  return queue.add(type, payload);
};

export default sendMessage;
