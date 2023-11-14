import { PREMIUM_DURATION, WeiPerEther, Zero } from '@nftx/constants';
import { TokenId } from '@nftx/types';
import { getExactTokenIds } from '../tokenIdUtils';
import { getChainConstant } from '../web3';

export const estimatePremiumPrice = ({
  network,
  holding,
  vTokenToEth,
  now,
}: {
  network: number;
  holding: { dateAdded: number } | undefined;
  vTokenToEth: bigint;
  now: number;
}): [vToken: bigint, price: bigint] => {
  const premiumThreshold = now - getChainConstant(PREMIUM_DURATION, network);

  if (!holding || holding.dateAdded < premiumThreshold) {
    return [Zero, Zero];
  }

  const maxPremium = 5 * 10 ** 18; // 5 vTokens
  const timeStep = 60 * 60; // 1 hour
  // const endValue = maxPremium * 2 ** (-PREMIUM_DURATION / timeStep)
  const endValue = 4882812500000000;
  const elapsed = now - holding.dateAdded;

  const p = maxPremium * 2 ** (-elapsed / timeStep) - endValue;
  // Bottom out at 0
  const premiumVTokenAmount = BigInt(Math.floor(Math.max(p, 0)));

  const price = (premiumVTokenAmount * vTokenToEth) / WeiPerEther;

  return [premiumVTokenAmount, price];
};

export const estimateTotalPremiumPrice = ({
  holdings,
  tokenIds,
  vTokenToEth,
  now,
  network,
}: {
  tokenIds: TokenId[] | [TokenId, number][];
  holdings: { dateAdded: number; tokenId: TokenId }[];
  vTokenToEth: bigint;
  now: number;
  network: number;
}): [vToken: bigint, price: bigint] => {
  return getExactTokenIds(tokenIds).reduce(
    (total, tokenId) => {
      const holding = holdings?.find((h) => h.tokenId === tokenId);
      const premium = estimatePremiumPrice({
        holding,
        vTokenToEth,
        now,
        network,
      });
      return [total[0] + premium[0], total[1] + premium[1]] as [bigint, bigint];
    },
    [Zero, Zero] as [vToken: bigint, price: bigint]
  );
};
