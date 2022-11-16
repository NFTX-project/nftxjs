import { Network } from '@nftx/constants';
import { gql, querySubgraph } from '@nftx/subgraph';
import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';
import type { Asset } from '@nftx/types';
import { processAssetItems } from '../utils';

const LIMIT = 1000;

const erc721 = async ({
  network,
  userAddress,
  assetAddresses,
  lastId = '-1',
  retryCount = 0,
}: {
  network: number;
  userAddress: string;
  assetAddresses: string[];
  lastId?: string;
  retryCount?: number;
}): Promise<{ assets: Asset[]; nextId: string }> => {
  let assets: Asset[] = [];
  let nextId: string;

  if (!assetAddresses.length) {
    return { assets, nextId };
  }

  try {
    if (network === Network.Mainnet || network === Network.Goerli) {
      type Response = {
        account: {
          id: string;
          tokens: Array<{
            id: string;
            identifier: string;
            contract: {
              id: string;
            };
          }>;
        };
      };

      const query = gql<Response>`{
      account(id: $userAddress) {
        id
        tokens: ERC721tokens(
          first: ${LIMIT},
          where: {
            identifier_gt: ${lastId}
          },
          orderBy: identifier,
          orderDirection: asc
        ) {
          id
          identifier
          contract {
            id
          }
        }
      }
    }`;
      const data = await querySubgraph({
        url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
        query,
        variables: {
          userAddress,
        },
      });
      if (data?.account?.tokens?.length) {
        nextId = data.account.tokens[data.account.tokens.length - 1].identifier;
        assets = await processAssetItems({
          network,
          items: data.account.tokens.map((x) => ({
            assetAddress: x.contract.id,
            tokenId: x.identifier,
          })),
        });
      }
    } else if (network === Network.Arbitrum) {
      type Response = {
        account: {
          id: string;
          tokens: Array<{
            id: string;
            identifier: string;
            contract: {
              id: string;
            };
          }>;
        };
      };

      const query = gql<Response>`{
      account(id: $userAddress) {
        id
        tokens: ERC721tokens(
          first: ${LIMIT},
          where: {
            identifier_gt: ${lastId}
          },
          orderBy: identifier,
          orderDirection: asc
        ) {
          id
          identifier
          contract {
            id
          }
        }
      }
    }`;
      const data = await querySubgraph({
        url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
        query,
        variables: {
          userAddress,
        },
      });
      if (data?.account?.tokens?.length) {
        nextId = data.account.tokens[data.account.tokens.length - 1].identifier;
        assets = await processAssetItems({
          network,
          items: data.account.tokens.map((x) => {
            const [assetAddress] = x.id.split('/');
            const tokenId = x.identifier;

            return { assetAddress, tokenId };
          }),
        });
      }
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

  return { assets, nextId };
};

export default erc721;
