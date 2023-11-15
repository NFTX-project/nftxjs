import { MessageCallback } from '../types';
import { getMessageQueue } from '../queues';

/** Subscribes to messages.
 * All subscribers will be called when a message is emitted.
 */
const onMessage = (callback: MessageCallback) => {
  const queue = getMessageQueue();
  queue.subscribe((type, payload) => callback({ type: type as any, payload }));
};

export default onMessage;
