import type { Address, Asset, Provider, Vault } from '@nftx/types';
import { queryReservoir } from '@nftx/utils';
import reservoirTokenToAsset from './reservoirTokenToAsset';
import getEligibleAssetVaultIds from './getEligibleAssetVaultIds';
import { createCursor, parseCursor } from './cursor';

type QueryReservoir = typeof queryReservoir;
type GetEligibleAssetVaultIds = typeof getEligibleAssetVaultIds;

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

const makeFetchUserAssetsFromReservoir =
  ({
    getEligibleAssetVaultIds,
    queryReservoir,
  }: {
    queryReservoir: QueryReservoir;
    getEligibleAssetVaultIds: GetEligibleAssetVaultIds;
  }) =>
  async ({
    assetAddresses,
    cursor,
    network,
    userAddress,
    vaults,
    provider,
  }: {
    userAddress: Address;
    network: number;
    cursor: string | undefined;
    assetAddresses?: Address[];
    vaults: Pick<
      Vault,
      'asset' | 'vaultId' | 'eligibilityModule' | 'features'
    >[];
    provider: Provider;
  }) => {
    const assets: Asset[] = [];

    const continuation = parseCursor(cursor);

    const data = await queryReservoir<ReservoirResponse>({
      network,
      path: `/users/${userAddress}/tokens/v7`,
      query: {
        limit: 200,
        includeAttributes: true,
        continuation,
        collection:
          assetAddresses?.length === 1 ? assetAddresses[0] : undefined,
      },
    });

    const newCursor = createCursor(data.continuation);

    await Promise.all(
      data.tokens.map(async ({ token }) => {
        if (
          assetAddresses &&
          !assetAddresses.includes(token.contract.toLowerCase() as Address)
        ) {
          return;
        }
        const vaultIds = await getEligibleAssetVaultIds({
          vaults,
          asset: {
            assetAddress: token.contract,
            tokenId: token.tokenId,
          },
          provider,
        });
        const asset = reservoirTokenToAsset({ token, vaultIds });
        assets.push(asset);
      })
    );

    return { assets, cursor: newCursor };
  };

const fetchUserAssetsFromReservoir = makeFetchUserAssetsFromReservoir({
  getEligibleAssetVaultIds,
  queryReservoir,
});

export default fetchUserAssetsFromReservoir;
