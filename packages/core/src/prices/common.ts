import { VaultFactory } from '@nftx/abi';
import {
  MARKETPLACE_ZAP,
  VAULT_FACTORY,
  WeiPerEther,
  Zero,
} from '@nftx/constants';
import { getChainConstant, getExactTokenIds, isCryptoPunk } from '@nftx/utils';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
  VaultHolding,
} from '@nftx/types';
import { getContract } from '@nftx/utils';

type GetContract = typeof getContract;

export const calculateFeePricePerItem = (fee: bigint, vTokenToEth: bigint) => {
  return (fee * vTokenToEth) / WeiPerEther;
};
export const calculateTotalFeePrice = (
  fee: bigint,
  vTokenToEth: bigint,
  buyAmount: bigint
) => {
  return (fee * vTokenToEth * buyAmount) / (WeiPerEther * WeiPerEther);
  // return (calculateFeePricePerItem(fee, vTokenToEth) * buyAmount) / WeiPerEther;
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
  network,
  provider,
  tokenId,
  vaultId,
  amount,
  getContract,
  standard,
}: {
  network: number;
  vaultId: string;
  provider: Provider;
  tokenId: `${number}`;
  amount: number;
  getContract: GetContract;
  standard: 'ERC721' | 'ERC1155';
}) => {
  const contract = getContract({
    address: getChainConstant(VAULT_FACTORY, network),
    provider,
    abi: VaultFactory,
  });

  if (standard === 'ERC1155') {
    const [premiumVTokenAmount] = await contract.read.getVTokenPremium1155({
      args: [BigInt(vaultId), BigInt(tokenId), BigInt(amount)],
    });

    return premiumVTokenAmount;
  }

  const [premiumVTokenAmount] = await contract.read.getVTokenPremium721({
    args: [BigInt(vaultId), BigInt(tokenId)],
  });

  return premiumVTokenAmount;
};

const makeFetchPremiumPrice =
  ({ getContract }: { getContract: GetContract }) =>
  async ({
    holding,
    provider,
    tokenId,
    vTokenToEth,
    amount,
    network,
    standard,
    vaultId,
  }: {
    holding: Pick<VaultHolding, 'dateAdded'>;
    provider: Provider;
    tokenId: `${number}`;
    amount: number;
    vTokenToEth: bigint;
    network: number;
    standard: 'ERC721' | 'ERC1155';
    vaultId: string;
  }) => {
    const premiumThreshold = Date.now() / 1000 - 3601;

    if (holding.dateAdded < premiumThreshold) {
      return Zero;
    }
    const premiumVTokenAmount = await fetchVTokenPremium({
      provider,
      tokenId,
      amount,
      network,
      standard,
      vaultId,
      getContract,
    });
    return (premiumVTokenAmount * vTokenToEth) / WeiPerEther;
  };
export const fetchPremiumPrice = makeFetchPremiumPrice({ getContract });

export const estimatePremiumPrice = ({
  holding,
  vTokenToEth,
  now,
}: {
  holding: Pick<VaultHolding, 'dateAdded'> | undefined;
  vTokenToEth: bigint;
  now: number;
}) => {
  const oneHour = 3600;
  // const now = Math.floor(Date.now() / 1000); // 1691441674
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
  now,
}: {
  tokenIds: TokenId[] | [TokenId, number][];
  holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded'>[];
  vTokenToEth: bigint;
  now: number;
}) => {
  return getExactTokenIds(tokenIds).reduce((total, tokenId) => {
    const holding = maybeGetHoldingByTokenId(holdings, tokenId);
    const premium = estimatePremiumPrice({
      holding,
      vTokenToEth,
      now,
    });
    return total + premium;
  }, Zero);
};

export const calculateTotalPremiumPrice = (
  items: { premiumPrice: bigint }[]
) => {
  return items.reduce((total, item) => total + item.premiumPrice, Zero);
};

export const getApproveContracts = ({
  tokenIds,
  vault,
  spender,
}: {
  vault: Pick<Vault, 'is1155' | 'asset'>;
  tokenIds: TokenId[];
  spender: Address;
}): MarketplaceQuote['approveContracts'] => {
  const standard = vault.is1155 ? 'ERC1155' : 'ERC721';

  if (isCryptoPunk(vault.asset.id)) {
    return tokenIds.map((tokenId) => {
      return {
        type: 'on-chain',
        tokenAddress: vault.asset.id,
        spenderAddress: spender,
        standard,
        tokenIds: [tokenId],
      };
    });
  } else {
    return [
      {
        type: 'on-chain',
        tokenAddress: vault.asset.id,
        spenderAddress: spender,
        standard,
        tokenIds: tokenIds,
      },
    ];
  }
};
