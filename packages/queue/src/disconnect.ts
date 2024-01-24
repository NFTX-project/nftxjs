import { Connection } from './connection/getConnection';
import { NftxQueue } from './queues/getQueue';
import { MessageQueue } from './queues/getMessageQueue';

// Tear down all connections and queues
const disconnect = () => {
  // Kill the message queue
  MessageQueue.close();
  // Kill all signal queues
  NftxQueue.closeAll();
  // Kill all remaining connections
  Connection.closeAll();
};

export default disconnect;
