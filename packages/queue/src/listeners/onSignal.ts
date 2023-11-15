import { SIGNAL_QUEUE_NAME } from '../constants';
import createWorker from './createWorker';
import { SignalCallback } from '../types';

/** Subscribes to top-level signals.
 * Only 1 listener will be called when a signal is sent.
 */
const onSignal = (callback: SignalCallback) => {
  return createWorker(SIGNAL_QUEUE_NAME, (job) => {
    const { name, data } = job;
    callback({ type: name as any, payload: data });
  });
};

export default onSignal;
