import { Network } from '@nftx/constants';

export const BULLMQ_REDIS_URI = process.env.BULLMQ_REDIS_URI || '';

if (!BULLMQ_REDIS_URI) {
  throw new Error('BULLMQ_REDIS_URI environment variable is not set');
}

export const NETWORK_QUEUE_NAMES = {
  [Network.Mainnet]: 'indexer-workers-mainnet',
  [Network.Sepolia]: 'indexer-workers-sepolia',
  [Network.Arbitrum]: 'indexer-workers-arbitrum',
};

export const SIGNAL_QUEUE_NAME = 'indexer-signals';
export const MESSAGE_QUEUE_NAME = 'indexer-messages';
