type OwnedNft = {
  contract: { address: string };
  balance: string;
  id: { tokenId: string };
};

export type Response = {
  pageKey: string;
  totalCount: string;
  blockHash: string;
  ownedNfts: OwnedNft[];
};
