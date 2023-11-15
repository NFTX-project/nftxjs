import { Network } from '@nftx/constants';

export const BULLMQ_REDIS_URI = process.env.BULLMQ_REDIS_URI || '';

if (!BULLMQ_REDIS_URI) {
  throw new Error('MULLMQ_REDIS_URI environment variable is not set');
}

export const NETWORK_QUEUE_NAMES = {
  [Network.Goerli]: 'indexer-workers-goerli',
  [Network.Sepolia]: 'indexer-workers-sepolia',
};

export const SIGNAL_QUEUE_NAME = 'indexer-signals';
export const MESSAGE_QUEUE_NAME = 'indexer-messages';
