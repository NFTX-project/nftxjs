import type { Log } from '@ethersproject/providers';
import parseLogEvents from './parseLogEvents';

/** Searches an array of transaction logs, parses the found log, and returns its args */
const parseLogEvent = <T>({
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
    const events = parseLogEvents<T[]>({
      interface: iface,
      logs,
      signature,
      filter,
    });

    // we want the find the _last_ log that matches
    const event = events[events.length - 1];

    if (!event) {
      return null;
    }

    return event;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default parseLogEvent;
