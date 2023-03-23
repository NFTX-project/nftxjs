import config from '@nftx/config';
import { NFTX_STAKING_ZAP } from '@nftx/constants';
import { NFTXStakingZap } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import { getTokenIdAmounts, getUniqueTokenIds } from '../trade';
import type { Provider, Signer, TokenId } from '@nftx/types';

type GetContract = typeof getContract;

const stake721 = ({
  network,
  provider,
  signer,
  vaultId,
  tokenIds: tokensAndQuantities,
  getContract,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  vaultId: string;
  tokenIds: TokenId[] | [TokenId, number][];
  getContract: GetContract;
}) => {
  const contract = getContract({
    provider,
    signer,
    address: getChainConstant(NFTX_STAKING_ZAP, network),
    abi: NFTXStakingZap,
  });

  const tokenIds = getUniqueTokenIds(tokensAndQuantities);

  return contract.write.provideInventory721({
    args: [BigInt(vaultId), tokenIds.map(BigInt)],
  });
};

const stake1155 = ({
  network,
  provider,
  signer,
  vaultId,
  tokenIds: tokensAndQuantities,
  getContract,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  vaultId: string;
  tokenIds: TokenId[] | [TokenId, number][];
  getContract: GetContract;
}) => {
  const contract = getContract({
    provider,
    signer,
    address: getChainConstant(NFTX_STAKING_ZAP, network),
    abi: NFTXStakingZap,
  });

  const tokenIds = getUniqueTokenIds(tokensAndQuantities);
  const amounts = getTokenIdAmounts(tokensAndQuantities);

  return contract.write.provideInventory1155({
    args: [BigInt(vaultId), tokenIds.map(BigInt), amounts.map(BigInt)],
  });
};

export default ({ getContract }: { getContract: GetContract }) =>
  /**
   * Takes NFTs and stakes them into an Inventory Position (IP).
   * Behind the scenes, we trade your NFTs for vTokens, then we stake your vTokens and receive xTokens in return
   */
  function stakeInventory(args: {
    network?: number;
    provider: Provider;
    signer: Signer;
    /** The vault you are staking into */
    vaultId: string;
    /** Token IDs for the NFTs you want to stake */
    tokenIds: TokenId[] | [TokenId, number][];
    standard?: 'ERC721' | 'ERC1155';
    quote?: 'ETH';
  }) {
    const {
      network = config.network,
      provider,
      signer,
      vaultId,
      tokenIds,
      standard = 'ERC721',
    } = args;

    if (standard === 'ERC721') {
      return stake721({
        getContract,
        network,
        provider,
        signer,
        tokenIds,
        vaultId,
      });
    }
    if (standard === 'ERC1155') {
      return stake1155({
        getContract,
        network,
        provider,
        signer,
        tokenIds,
        vaultId,
      });
    }
    throw new Error(`Unsupported standard ${standard}`);
  };
