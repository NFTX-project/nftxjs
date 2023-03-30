import config from '@nftx/config';
import queryApi from './queryApi';

const isApiBehind = () => {
  const { apiBlockNumber, requiredBlockNumber } = config.internal;

  return apiBlockNumber < requiredBlockNumber;
};

// Wraps an async function.
// While the promise is unresolved, all subsequent calls will receive the same promise
const throttleFn = <F extends (...args: any[]) => Promise<any>>(fn: F): F => {
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

const fetchLastIndexedBlock = throttleFn(async () => {
  const url = `/${config.network}/block`;
  type Response = { block: number };
  const response = await queryApi<Response>({
    url,
    query: { source: 'live' },
  });
  return response?.block;
});

const updateApiBlock = ({ source }: { source: 'live' | 'api' }) => {
  // Switch to live mode
  if (source !== 'live') {
    config.internal.source = 'live';
  }
  // Wait a few seconds before polling the api again
  setTimeout(async () => {
    // Get the last indexed block on the api
    config.internal.apiBlockNumber = await fetchLastIndexedBlock();
    // Run this fn again until we're up to date...
    checkApiBlock();
  }, 5000);
};

const resetRequiredBlock = () => {
  // Reset the required block number
  config.internal.requiredBlockNumber = 0;
  // Switch back to using the api as the SoT
  config.internal.source = 'api';
};

export const checkApiBlock = (): void => {
  const { requiredBlockNumber } = config.internal;

  // We don't need to worry about syncing if there's no required block number
  if (!requiredBlockNumber) {
    return;
  }

  const { source } = config.internal;

  // The API is behind the required block
  if (isApiBehind()) {
    updateApiBlock({ source });
  } else if (source === 'live') {
    resetRequiredBlock();
  }
};
