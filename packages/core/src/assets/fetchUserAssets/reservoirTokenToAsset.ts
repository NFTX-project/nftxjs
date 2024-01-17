import type { Address, Asset } from '@nftx/types';

const reservoirTokenToAsset = ({
  token,
  vaultIds,
}: {
  token: {
    contract: Address;
    tokenId: `${number}`;
    imageSmall: string;
    image: string;
    isFlagged: boolean;
    name: string;
    rarityScore: number;
    rarityRank: number;
    media: string;
    supply: number;
    attributes: { key: string; value: string }[];
  };
  vaultIds: string[];
}) => {
  const imageUrl = token.image || token.imageSmall || token.media;
  const animationUrl = token.media?.includes('.mp4') ? token.media : undefined;

  const asset: Asset = {
    assetAddress: token.contract,
    tokenId: token.tokenId,
    id: `${token.contract}/${token.tokenId}`,
    imagePreviewUrl: token.imageSmall,
    imageUrl,
    isFlagged: !!token.isFlagged,
    name: token.name,
    rarity: token.rarityScore,
    rarityRank: token.rarityRank,
    animationUrl,
    quantity: token.supply ? BigInt(token.supply) : undefined,
    traits: (token.attributes ?? []).reduce((acc, { key, value }) => {
      return { ...acc, [key]: value };
    }, {} as Record<string, string>),
    vaultIds,
    mintable: vaultIds.length > 0,
  };

  return asset;
};

export default reservoirTokenToAsset;
