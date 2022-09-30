import type { Log } from '@ethersproject/providers';
import { Interface } from '@ethersproject/abi';

/** Searches an array of transaction logs, parses the found logs, and returns them */
const parseLogEvents = <T>({
  interface: iface,
  logs,
  signature,
  filter,
}: {
  logs: Log[];
  /** The starting characters of the encoded topic i.e. 0x1234 */
  signature: string;
  /** A string representation of the event's interface
   * i.e. event Transfer(address indexed from, address indexed to, uint value) */
  interface: string;
  /** Optionally filter out logs */
  filter?: (log: Log) => boolean;
}): T => {
  try {
    const parser = new Interface([iface]);
    const events = logs
      .filter((log) => {
        if (!log.topics[0].startsWith(signature)) {
          return false;
        }
        if (filter != null && !filter(log)) {
          return false;
        }
        return true;
      })
      .map((e) => parser.parseLog(e).args);

    return events as any as T;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default parseLogEvents;
