import config from '@nftx/config';
import { Address, Asset, Provider, TokenId, Vault } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import { queryReservoir } from '@nftx/utils';
import { ReservoirResponse } from '../fetchUserAssets/fetchAssetsFromReservoir';
import getEligibleAssetVaultIds from '../fetchUserAssets/getEligibleAssetVaultIds';
import reservoirTokenToAsset from '../fetchUserAssets/reservoirTokenToAsset';

type QueryReservoir = typeof queryReservoir;
type GetEligibleAssetVaultIds = typeof getEligibleAssetVaultIds;

export const makeFetchAssets =
  ({
    getEligibleAssetVaultIds,
    queryReservoir,
  }: {
    queryReservoir: QueryReservoir;
    getEligibleAssetVaultIds: GetEligibleAssetVaultIds;
  }) =>
  async ({
    network = config.network,
    cursor,
    provider,
    vaults,
    assets: _assets,
  }: {
    network?: number;
    cursor?: string;
    provider: Provider;
    vaults: Pick<
      Vault,
      'asset' | 'features' | 'eligibilityModule' | 'vaultId'
    >[];
    assets: Array<{ assetAddress: Address; tokenIds: TokenId[] }>;
  }): Promise<{ assets: Asset[]; cursor?: string }> => {
    if (!_assets.length) {
      return { assets: [] };
    }

    const assets: Asset[] = [];

    const continuation = parseCursor(cursor);
    const start = Number(continuation || '0');

    const allTokens = _assets.flatMap(({ assetAddress, tokenIds }) =>
      tokenIds.map((tokenId) => `${assetAddress}:${tokenId}`)
    );
    const offsetTokens = allTokens.slice(start);
    const tokens = offsetTokens.slice(0, 50);
    const hasContinuation = offsetTokens.length > tokens.length;
    const newContinuation = hasContinuation ? String(start + 50) : undefined;
    const newCursor = createCursor(newContinuation);

    const data = await queryReservoir<ReservoirResponse>({
      network,
      path: `/tokens/v6`,
      query: {
        tokens,
        limit: 100,
        includeAttributes: true,
      },
    });

    await Promise.all(
      data.tokens.map(async ({ token }) => {
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

export default makeFetchAssets({ getEligibleAssetVaultIds, queryReservoir });
