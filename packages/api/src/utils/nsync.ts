import config from '@nftx/config';
import { query } from '@nftx/utils';

// Wraps an async function.
// While the promise is unresolved, all subsequent calls will receive the same promise
const throttleAsyncFn = <F extends (...args: any[]) => Promise<any>>(
  fn: F
): F => {
  let p: Promise<any> | undefined;
  return ((...args: Parameters<F>) => {
    if (p) {
      return p;
    }
    p = fn(...args).then(
      (result) => {
        p = undefined;
        return result;
      },
      (e) => {
        p = undefined;
        throw e;
      }
    );
    return p;
  }) as any as F;
};

/** Gets the required block number */
export const getRequiredBlockNumber = (network = config.network) => {
  return config.internal.requiredBlockNumber[network] ?? 0;
};

/** Sets the required block number */
export const setRequiredBlockNumber = (
  value: number,
  network: number = config.network
) => {
  config.internal.requiredBlockNumber[network] = value;
};

/** Gets the current block number from the api */
export const getApiBlockNumber = (network = config.network) => {
  return config.internal.apiBlockNumber[network] ?? 0;
};

export const getBlockBuffer = () => {
  return config.internal.blockBuffer;
};

// Checks whether the required block number is ahead of the api block number
const isApiBehind = ({
  network,
  requiredBlockNumber,
}: {
  network: number;
  requiredBlockNumber: number;
}) => {
  if (!requiredBlockNumber) {
    // No required block number so we don't need to worry about the api
    return false;
  }
  const apiBlockNumber = getApiBlockNumber(network);

  return apiBlockNumber < requiredBlockNumber;
};

const updateLastIndexedBlock = async ({ network }: { network: number }) => {
  // Get the last indexed block on the api
  const response = await query<{ block: number }>({
    url: `/${network}/block`,
    query: { source: 'live', ebn: 'true' },
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.keys.NFTX_API,
    },
  });
  const block = response?.block ?? 0;
  // Save it (writes to local storage)
  config.internal.apiBlockNumber[network] = block;
};

const resetRequiredBlock = ({ network }: { network: number }) => {
  // reset the required block number
  setRequiredBlockNumber(0, network);
  // Switch back to using the api as the SoT
  config.internal.source = 'api';
};

/** Checks if the api is behind the latest block.
 * If it is behind, it will switch to live mode and continue checking the api until it has caught up
 **/
export const syncApiBlock = throttleAsyncFn(
  async (network: number = config.network) => {
    // We throttle this method so even if 1k requests are made in quick succession,
    // we'll only attempt to sync the api one time

    // Keep looping while the api is behind the current block
    while (
      isApiBehind({
        network,
        requiredBlockNumber: getRequiredBlockNumber(network),
      })
    ) {
      if (config.internal.source !== 'live') {
        // Switch to live mode
        config.internal.source = 'live';
      }
      // Wait 5s before polling again
      await new Promise<void>((res) => setTimeout(res, 5000));
      // Fetch the latest block from the api
      await updateLastIndexedBlock({ network });
    }

    // The api has caught up and we no longer need to be in live mode
    resetRequiredBlock({ network });
  }
);
