import { getConnection } from '../connection';
import { Connection } from '../connection/getConnection';
import { MESSAGE_QUEUE_NAME } from '../constants';

interface IMessageQueue {
  add: (type: string, payload: Record<string, any>) => void;
  subscribe: (cb: (type: string, payload: any) => void) => () => void;
  close: () => void;
}

export class MessageQueue implements IMessageQueue {
  channel = MESSAGE_QUEUE_NAME;

  constructor(public connection: Connection) {
    MessageQueue.queue = this;
  }

  add(type: string, payload: Record<string, any>) {
    console.debug(`Sending message: ${type}`);
    const message = JSON.stringify({ type, payload });
    this.connection.publish(this.channel, message);
  }
  subscribe(cb: (type: string, payload: any) => void) {
    this.connection.subscribe(MESSAGE_QUEUE_NAME, (err) => {
      if (err) {
        console.error(`Failed to subscribe: ${err.message}`);
      }
    });

    this.connection.on('message', (channel, message) => {
      const { type, payload } = JSON.parse(message);
      cb(type, payload);
    });

    return () => {
      this.connection.unsubscribe(MESSAGE_QUEUE_NAME, (err) => {
        if (err) {
          console.error(`Failed to unsubscribe: ${err.message}`);
        }
      });
    };
  }
  close() {
    MessageQueue.queue = undefined;
    this.connection.close();
  }

  static queue: IMessageQueue | undefined;

  static close() {
    MessageQueue.queue?.close();
  }
}

/** Returns a queue object that allows you to emit or subscribe to messages */
const getMessageQueue = () => {
  return (
    MessageQueue.queue || new MessageQueue(getConnection(MESSAGE_QUEUE_NAME))
  );
};

export default getMessageQueue;
