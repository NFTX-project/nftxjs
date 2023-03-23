import type { Abi } from 'abitype';
import { decodeEventLog, Log } from 'viem';

/** Searches an array of transaction logs, parses the found logs, and returns them */
const parseLogEvents = <T extends Abi>({
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
  // FIXME: currently ts can't handle inferring the return type from viem, it just blows up
}): any[] => {
  try {
    const events = logs
      .filter((log) => {
        if (!log.topics[0]?.startsWith(signature)) {
          return false;
        }
        if (filter != null && !filter(log)) {
          return false;
        }
        return true;
      })
      .map((log) => decodeEventLog({ abi, ...log }).args);

    return events;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default parseLogEvents;
