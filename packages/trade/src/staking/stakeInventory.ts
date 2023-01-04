import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import { NFTX_STAKING_ZAP } from '@nftx/constants';
import NftxStakingAbi from '@nftx/constants/abis/NFTXStakingZap.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Signer } from 'ethers';
import { getTokenIdAmounts, getUniqueTokenIds } from '../trade';

type GetContract = typeof getContract;

const stake721 = ({
  network,
  signer,
  vaultId,
  tokenIds: tokensAndQuantities,
  getContract,
}: {
  network: number;
  signer: Signer;
  vaultId: string;
  tokenIds: string[] | [string, number][];
  getContract: GetContract;
}) => {
  const contract = getContract({
    network,
    signer,
    address: getChainConstant(NFTX_STAKING_ZAP, network),
    abi: NftxStakingAbi,
  });

  const tokenIds = getUniqueTokenIds(tokensAndQuantities);

  return contract.provideInventory721(vaultId, tokenIds);
};

const stake1155 = ({
  network,
  signer,
  vaultId,
  tokenIds: tokensAndQuantities,
  getContract,
}: {
  network: number;
  signer: Signer;
  vaultId: string;
  tokenIds: string[] | [string, number][];
  getContract: GetContract;
}) => {
  const contract = getContract({
    network,
    signer,
    address: getChainConstant(NFTX_STAKING_ZAP, network),
    abi: NftxStakingAbi,
  });

  const tokenIds = getUniqueTokenIds(tokensAndQuantities);
  const amounts = getTokenIdAmounts(tokensAndQuantities);

  return contract.provideInventory1155(vaultId, tokenIds, amounts);
};

export default ({ getContract }: { getContract: GetContract }) =>
  /**
   * Takes NFTs and stakes them into an Inventory Position (IP).
   * Behind the scenes, we trade your NFTs for vTokens, then we stake your vTokens and receive xTokens in return
   */
  function stakeInventory(args: {
    network?: number;
    signer: Signer;
    /** The vault you are staking into */
    vaultId: string;
    /** Token IDs for the NFTs you want to stake */
    tokenIds: string[] | [string, number][];
    standard?: 'ERC721' | 'ERC1155';
    quote?: 'ETH';
  }): Promise<ContractTransaction> {
    const {
      network = config.network,
      signer,
      vaultId,
      tokenIds,
      standard = 'ERC721',
    } = args;

    if (standard === 'ERC721') {
      return stake721({ getContract, network, signer, tokenIds, vaultId });
    }
    if (standard === 'ERC1155') {
      return stake1155({ getContract, network, signer, tokenIds, vaultId });
    }
    throw new Error(`Unsupported standard ${standard}`);
  };
