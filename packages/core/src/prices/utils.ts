import { NFTXVaultUpgradeable } from '@nftx/abi';
import { WeiPerEther, Zero } from '@nftx/constants';
import type { Address, Provider, VaultHolding } from '@nftx/types';
import { getContract } from '@nftx/utils';

export const calculateFeePricePerItem = (fee: bigint, vTokenToEth: bigint) => {
  return (fee * vTokenToEth) / WeiPerEther;
};
export const calculateTotalFeePrice = (
  fee: bigint,
  vTokenToEth: bigint,
  buyAmount: bigint
) => {
  return (calculateFeePricePerItem(fee, vTokenToEth) * buyAmount) / WeiPerEther;
};

export const maybeGetHoldingByTokenId = <
  H extends Pick<VaultHolding, 'tokenId'>
>(
  holdings: H[],
  tokenId: `${number}`
) => {
  return holdings.find((holding) => holding.tokenId === tokenId);
};
export const getHoldingByTokenId = <H extends Pick<VaultHolding, 'tokenId'>>(
  holdings: H[],
  tokenId: `${number}`
) => {
  const holding = maybeGetHoldingByTokenId(holdings, tokenId);
  if (holding == null) {
    throw new Error(`Could not locate NFT [${tokenId}] in vault holdings`);
  }
  return holding;
};

const fetchVTokenPremium = async ({
  provider,
  tokenId,
  vaultAddress,
}: {
  vaultAddress: Address;
  provider: Provider;
  tokenId: `${number}`;
}) => {
  const vaultContract = getContract({
    address: vaultAddress,
    provider,
    abi: NFTXVaultUpgradeable,
  });

  // TODO: handle 1155s
  const [premiumVTokenAmount] = await vaultContract.read.getVTokenPremium721({
    args: [BigInt(tokenId)],
  });

  return premiumVTokenAmount;
};

export const getPremiumPrice = async ({
  holding,
  provider,
  tokenId,
  vTokenToEth,
  vaultAddress,
}: {
  holding: Pick<VaultHolding, 'dateAdded'>;
  provider: Provider;
  tokenId: `${number}`;
  vaultAddress: Address;
  vTokenToEth: bigint;
}) => {
  const premiumThreshold = Date.now() / 1000 - 3601;

  if (holding.dateAdded < premiumThreshold) {
    return Zero;
  }
  const premiumVTokenAmount = await fetchVTokenPremium({
    provider,
    tokenId,
    vaultAddress: vaultAddress,
  });
  return (premiumVTokenAmount * vTokenToEth) / WeiPerEther;
};

export const estimatePremiumPrice = ({
  holding,
  vTokenToEth,
}: {
  holding: Pick<VaultHolding, 'dateAdded'> | undefined;
  vTokenToEth: bigint;
}) => {
  const oneHour = 3600;
  const now = Math.floor(Date.now() / 1000); // 1691441674
  const premiumThreshold = now - oneHour;

  if (!holding || holding.dateAdded < premiumThreshold) {
    return Zero;
  }

  const T = oneHour;
  const a = 5 * 10 ** 18;
  const endValue = 4882812500000000;
  const t = now - holding.dateAdded;
  const p = a * 2 ** (-t / T) - endValue;
  // Bottom out at 0
  const premiumVTokenAmount = BigInt(Math.floor(Math.max(p, 0)));

  return (premiumVTokenAmount * vTokenToEth) / WeiPerEther;
};
export const estimateTotalPremiumPrice = ({
  holdings,
  tokenIds,
  vTokenToEth,
}: {
  tokenIds: `${number}`[];
  holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded'>[];
  vTokenToEth: bigint;
}) => {
  return tokenIds.reduce((total, tokenId) => {
    const holding = maybeGetHoldingByTokenId(holdings, tokenId);
    const premium = estimatePremiumPrice({
      holding,
      vTokenToEth,
    });
    return total + premium;
  }, Zero);
};
