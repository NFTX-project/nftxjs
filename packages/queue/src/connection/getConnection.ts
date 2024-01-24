import IORedis from 'ioredis';
import { BULLMQ_REDIS_URI } from '../constants';

export class Connection extends IORedis {
  constructor(public name: string, connectionUri: string) {
    super(connectionUri);
    Connection.connections[name] = this;
  }

  close() {
    delete Connection.connections[this.name];
    super.disconnect();
  }

  static connections: Record<string, Connection> = {};

  static closeAll() {
    Object.values(Connection.connections).forEach((connection) => {
      connection.close();
    });
  }
}

const getConnection = (name: string) => {
  return Connection.connections[name] || new Connection(name, BULLMQ_REDIS_URI);
};

export default getConnection;
