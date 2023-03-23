import type { Address } from '@nftx/types';

type OwnedNft = {
  contract: { address: Address };
  balance: `${number}`;
  id: { tokenId: `${number}` };
};

export type Response = {
  pageKey: string;
  totalCount: string;
  blockHash: string;
  ownedNfts: OwnedNft[];
};
