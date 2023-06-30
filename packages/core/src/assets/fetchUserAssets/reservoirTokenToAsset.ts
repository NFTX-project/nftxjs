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
  const asset: Asset = {
    assetAddress: token.contract,
    tokenId: token.tokenId,
    id: `${token.contract}/${token.tokenId}`,
    imagePreviewUrl: token.imageSmall,
    imageUrl: token.image,
    isFlagged: !!token.isFlagged,
    name: token.name,
    rarity: token.rarityScore,
    rarityRank: token.rarityRank,
    animationUrl: token.media,
    // TODO
    backgroundColor: undefined,
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
