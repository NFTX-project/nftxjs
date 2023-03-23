import type { Abi } from 'abitype';
import type { Log } from 'viem';
import parseLogEvents from './parseLogEvents';

/** Searches an array of transaction logs, parses the found log, and returns its args */
const parseLogEvent = <T extends Abi>({
  logs,
  signature,
  filter,
  abi,
}: {
  logs: Log[];
  /** The starting characters of the encoded topic i.e. 0x1234 */
  signature: string;
  /** Optionally filter out logs */
  filter?: (log: Log) => boolean;
  abi: T;
}) => {
  try {
    const events = parseLogEvents({
      abi,
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
