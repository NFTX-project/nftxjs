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
const fetchCollectionMetadata = async (args: { address: string }) => {
  const { address } = args;

  const uri = `https://eth-mainnet.g.alchemy.com/nft/v2/_nKylYxzcktTyMooyowPh7s5UfAsENKZ/getContractMetadata?contractAddress=${address}`;
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data: CollectionsMetadataResponse = await response.json();

  return data.contractMetadata;
};

export default fetchCollectionMetadata;
