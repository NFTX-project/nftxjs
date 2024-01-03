import { Address } from '@nftx/types';

export type ReservoirResponse = {
  tokens: Array<{
    token: {
      contract: Address;
      tokenId: `${number}`;
      kind: string;
      name: string;
      image: string;
      imageSmall: string;
      imageLarge: string;
      isFlagged: boolean;
      metadata: unknown;
      supply: number;
      remainingSupply: number;
      rarityScore: number;
      rarityRank: number;
      media: string;
      collection: unknown;
      attributes: Array<{
        key: string;
        kind: string;
        value: string;
        tokenCount: number;
        onSaleCount: number;
        floorAskPrice: number;
        topBidValue: number;
        createdAt: string;
      }>;
    };
    ownership: {
      tokenCount: string;
      onSaleCount: string;
      floorAsk: {
        id: string;
        price: {
          amount: {
            raw: string;
            decimal: number;
            usd: number;
            native: number;
          };
          netAmount: {
            raw: string;
            decimal: number;
            usd: number;
            native: number;
          };
        };
        maker: string;
        kind: string;
        validFrom: number;
        validUntil: number;
        source: unknown;
        rawData: unknown;
        acquiredAt: string;
      };
    };
  }>;
  continuation: string;
};
