import config from '@nftx/config';
import { getChainConstant } from '../web3';

export interface CollectionMetadata {
  name: string;
  symbol: string;
  totalSupply: string;
  tokenType: string;
  openSea: {
    floorPrice: number;
    collectionName: string;
    safelistRequestStatus: string;
    imageUrl: string;
    description: string;
    externalUrl: string;
    twitterUsername: string;
    discordUrl: string;
    lastIngestedAt: string;
  };
}

export interface CollectionsMetadataResponse {
  address: string;
  contractMetadata: CollectionMetadata;
}

/** Fetches metadata about a specific collection */
const fetchCollectionMetadata = async (args: {
  address: string;
  network?: number;
}) => {
  const { address, network = config.network } = args;

  const baseUrl = getChainConstant(config.urls.ALCHEMY_URL, network);
  const apiKey = getChainConstant(config.keys.ALCHEMY, network);

  const uri = new URL(`/nft/v2/${apiKey}/getContractMetadata`, baseUrl);
  uri.searchParams.set('contractAddress', address);

  const response = await fetch(uri.toString());
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data: CollectionsMetadataResponse = await response.json();

  return data.contractMetadata;
};

export default fetchCollectionMetadata;
