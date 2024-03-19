// The maximum range is 0.0001 ETH to 10,000 ETH
// This is also the range given to an infinite range position
// Known as the RFBR (Really Formidable Big Range)

import { Network } from './networks';

// 0.0001 ETH
export const RFBR_MIN_PRICE = {
  [Network.Mainnet]: 100000000000000n,
  [Network.Sepolia]: 100000000000000n,
  [Network.Arbitrum]: 100000000000000n,
};
// 10,000 ETH
export const RFBR_MAX_PRICE = {
  [Network.Mainnet]: 10000000000000000000000n,
  [Network.Sepolia]: 10000000000000000000000n,
  [Network.Arbitrum]: 10000000000000000000000n,
};
export const RFBR_MIN_TICK = {
  [Network.Mainnet]: -92160,
  [Network.Sepolia]: -92160,
  [Network.Arbitrum]: -92160,
};
export const RFBR_MAX_TICK = {
  [Network.Mainnet]: 92100,
  [Network.Sepolia]: 92100,
  [Network.Arbitrum]: 92100,
};

// This is the "absolute" max/min ticks that can be used
export const MIN_TICK = -887272;
export const MAX_TICK = 887272;
export const MIN_PRICE = 1n;
export const MAX_PRICE = 20769187434139310514121985316880383n;

export const TICK_PRICE_BASE = 1.0001;
export const TICK_LOG_BASE = Math.log(TICK_PRICE_BASE);
