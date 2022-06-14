import { Network, ERC721_SUBGRAPH } from '@nftx/constants';
import { compareByAlpha, toLowerCase } from '../../utils';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '../../web3/types';
import type { Asset } from '../types';
import { getChainConstant } from '../../web3';

const LIMIT = 1000;

const erc721 = async ({
  network,
  userAddress,
  assetAddresses,
  lastId = -1,
  retryCount = 0,
}: {
  network: number;
  userAddress: Address;
  assetAddresses: Address[];
  lastId?: number;
  retryCount?: number;
}): Promise<Asset[]> => {
  let assets: Asset[] = [];

  if (!assetAddresses.length) {
    return assets;
  }

  try {
    if (network === Network.Mainnet) {
      const query = gql`{
      account(id: $userAddress) {
        id
        tokens: ERC721tokens(
          first: ${LIMIT},
          where: {
            identifier_gt: $lastId,
            contract_in: $assetAddresses,
          },
          orderBy: identifier,
          orderDirection: asc
        ) {
          id
          identifier
        }
      }
    }`;
      const data = await querySubgraph<{
        account: {
          id: string;
          tokens: Array<{ id: string; identifier: string }>;
        };
      }>({
        url: getChainConstant(ERC721_SUBGRAPH, network),
        query,
        variables: {
          userAddress,
          lastId,
          assetAddresses: assetAddresses
            .map(toLowerCase)
            .sort((a, b) => compareByAlpha(a, b)),
        },
      });
      assets = data?.account?.tokens?.map(({ id, identifier }) => {
        const [assetAddress] = id.split('/');
        const tokenId = identifier;

        const asset: Asset = {
          id,
          tokenId,
          assetAddress,
          metaUrl: `https://api.nftx.xyz/asset/${assetAddress}/${tokenId}?chainId=${network}`,
        };

        return asset;
      });
    } else if (network === Network.Rinkeby) {
      const query = gql`{
      owner(id: $userAddress) {
        id
        tokens(
          first: ${LIMIT},
          where: {
            tokenID_gt: $lastId,
            contract_in: $assetAddresses,
          },
          orderBy: tokenID,
          orderDirection: asc
        ) {
          id
          tokenID
        }
      }
    }`;
      const data = await querySubgraph<{
        owner: { id: string; tokens: Array<{ id: string; tokenID: string }> };
      }>({
        url: getChainConstant(ERC721_SUBGRAPH, network),
        query,
        variables: {
          userAddress,
          lastId,
          assetAddresses: assetAddresses
            .map(toLowerCase)
            .sort((a, b) => compareByAlpha(a, b)),
        },
      });
      assets = data?.owner?.tokens?.map(({ id, tokenID }) => {
        const [assetAddress] = id.split('_');
        const tokenId = tokenID;

        const asset: Asset = {
          id,
          tokenId,
          assetAddress,
          metaUrl: `https://api.nftx.xyz/asset/${assetAddress}/${tokenId}?chainId=${network}`,
        };

        return asset;
      });
    } else if (network === Network.Arbitrum) {
      const query = gql`{
      account(id: $userAddress) {
        id
        tokens: ERC721tokens(
          first: ${LIMIT},
          where: {
            identifier_gt: $lastId,
            contract_in: $assetAddresses,
          },
          orderBy: identifier,
          orderDirection: asc
        ) {
          id
          identifier
        }
      }
    }`;
      const data = await querySubgraph<{
        account: {
          id: string;
          tokens: Array<{ id: string; identifier: string }>;
        };
      }>({
        url: getChainConstant(ERC721_SUBGRAPH, network),
        query,
        variables: {
          userAddress,
          lastId,
          assetAddresses: assetAddresses
            .map(toLowerCase)
            .sort((a, b) => compareByAlpha(a, b)),
        },
      });
      assets = data?.account?.tokens?.map(({ id, identifier }) => {
        const [assetAddress] = id.split('/');
        const tokenId = identifier;

        const asset: Asset = {
          id,
          assetAddress,
          tokenId,
          metaUrl: `https://api.nftx.xyz/asset/${assetAddress}/${tokenId}?chainId=${network}`,
        };

        return asset;
      });
    } else {
      throw new Error(`Unsupported network ${network}`);
    }
  } catch (e) {
    if (retryCount < 3) {
      return erc721({
        assetAddresses,
        network,
        userAddress,
        lastId,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }

  if (assets?.length === LIMIT) {
    const moreAssets = await erc721({
      assetAddresses,
      network,
      userAddress,
      lastId: Number(assets[assets.length - 1].tokenId),
      retryCount: 0,
    });
    return [...assets, ...moreAssets];
  }

  return assets;
};

export default erc721;