import { VaultFactory } from '@nftx/abi';
import {
  PREMIUM_DURATION,
  VAULT_FACTORY,
  WeiPerEther,
  Zero,
} from '@nftx/constants';
import { getChainConstant, isCryptoPunk } from '@nftx/utils';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
  VaultHolding,
} from '@nftx/types';
import { getContract } from '@nftx/utils';
import { NotFoundError } from '@nftx/errors';

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
    throw new NotFoundError('vault NFT', tokenId);
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
  }): Promise<[vToken: bigint, price: bigint]> => {
    const now = Math.floor(Date.now() / 1000);
    const premiumThreshold = now - PREMIUM_DURATION;

    if (holding.dateAdded < premiumThreshold) {
      return [Zero, Zero];
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
    const price = (premiumVTokenAmount * vTokenToEth) / WeiPerEther;

    return [premiumVTokenAmount, price];
  };
export const fetchPremiumPrice = makeFetchPremiumPrice({ getContract });

export const calculateTotalPremiumPrice = (
  items: { premiumPrice: bigint; premiumLimit: bigint }[]
): [vToken: bigint, price: bigint] => {
  const initial: [bigint, bigint] = [Zero, Zero];
  return items.reduce((total, item) => {
    return [total[0] + item.premiumLimit, total[1] + item.premiumPrice];
  }, initial);
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
