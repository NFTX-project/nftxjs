import { Network } from './networks';

export const WeiPerEther = 1000000000000000000n;
export const Zero = 0n;
export const MaxUint256 =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const PREMIUM_DURATION = {
  [Network.Goerli]: 36000, // 10 hours
  [Network.Sepolia]: 600, // 10 minutes
};
