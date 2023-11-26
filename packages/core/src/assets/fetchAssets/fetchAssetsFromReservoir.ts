import { Address, Asset, Provider, TokenId, Vault } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import { queryReservoir } from '@nftx/utils';
import { ReservoirResponse } from '../fetchUserAssets/fetchAssetsFromReservoir';
import getEligibleAssetVaultIds from '../fetchUserAssets/getEligibleAssetVaultIds';
import reservoirTokenToAsset from '../fetchUserAssets/reservoirTokenToAsset';

const fetchAssetsFromReservoir = async ({
  network,
  cursor,
  assets: _assets,
  vaults,
  provider,
}: {
  network: number;
  cursor: string | undefined;
  assets: Array<{ assetAddress: Address; tokenIds: TokenId[] }>;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'eligibilityModule' | 'features'>[];
  provider: Provider;
}) => {
  const assets: Asset[] = [];

  const continuation = parseCursor(cursor);
  const start = Number(continuation || '0');

  const allTokens = _assets.flatMap(({ assetAddress, tokenIds }) =>
    tokenIds.map((tokenId) => `${assetAddress}:${tokenId}`)
  );
  const offsetTokens = allTokens.slice(start);
  const tokens = offsetTokens.slice(0, 50);
  const newContinuation =
    offsetTokens.length === tokens.length ? undefined : String(start + 50);
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

export default fetchAssetsFromReservoir;
