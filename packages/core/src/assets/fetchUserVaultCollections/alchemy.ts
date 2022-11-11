import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import { addressEqual, getChainConstant, isCryptoKitty } from '@nftx/utils';

type Response = {
  totalCount: number;
  pageKey: string;
  contracts: Array<{
    address: string;
    totalBalance: number;
    numDistinctTokensOwned: number;
    isSpam: boolean;
    tokenId: string;
    name: string;
    symbol: string;
    tokenType: 'ERC721' | 'ERC1155';
  }>;
};

const fetchUserVaultCollectionsAlchemy = async ({
  network,
  userAddress,
  vaults,
}: {
  network: number;
  userAddress: string;
  vaults: Pick<Vault, 'asset' | 'vaultId'>[];
}) => {
  const baseUrl = getChainConstant(config.urls.ALCHEMY_URL, network);
  const apiKey = config.keys.ALCHEMY;

  const ownedCollections: {
    vaultId: string;
    assetAddress: string;
  }[] = [];

  let cursor: string = null;

  do {
    const uri = new URL(`/nft/v2/${apiKey}/getContractsForOwner`, baseUrl);
    uri.searchParams.set('owner', userAddress);
    if (cursor) {
      uri.searchParams.set('pageKey', cursor);
    }
    const url = uri.toString();

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data: Response = await response.json();

    const collections =
      data?.contracts?.flatMap((collection) => {
        return vaults
          .filter(
            (v) =>
              addressEqual(v.asset.id, collection.address) &&
              !isCryptoKitty(v.asset.id)
          )
          .map((vault) => {
            return {
              vaultId: vault.vaultId,
              assetAddress: vault.asset.id,
            };
          });
      }) ?? [];

    ownedCollections.push(...collections);
    cursor = data?.pageKey;
  } while (cursor != null);

  return ownedCollections;
};

export default fetchUserVaultCollectionsAlchemy;
