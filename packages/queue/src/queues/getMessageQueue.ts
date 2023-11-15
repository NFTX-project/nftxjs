import { getConnection } from '../connection';
import { MESSAGE_QUEUE_NAME } from '../constants';

let queue: {
  add: (type: string, payload: Record<string, any>) => void;
  subscribe: (cb: (type: string, payload: any) => void) => void;
};

/** Returns a queue object that allows you to emit or subscribe to messages */
const getMessageQueue = () => {
  if (!queue) {
    const connection = getConnection();
    const channel = MESSAGE_QUEUE_NAME;

    const add = (type: string, payload: Record<string, any>) => {
      console.debug(`Sending message: ${type}`);
      const message = JSON.stringify({ type, payload });
      connection.publish(channel, message);
    };
    const subscribe = (
      callback: (type: string, payload: Record<string, any>) => any
    ) => {
      connection.subscribe(MESSAGE_QUEUE_NAME, (err) => {
        if (err) {
          console.error(`Failed to subscribe: ${err.message}`);
        }
      });

      connection.on('message', (channel, message) => {
        const { type, payload } = JSON.parse(message);
        callback(type, payload);
      });
    };

    queue = { add, subscribe };
  }
  return queue;
};

export default getMessageQueue;
