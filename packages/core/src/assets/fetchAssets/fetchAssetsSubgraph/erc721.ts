import { Network } from '@nftx/constants';
import { gql, querySubgraph } from '@nftx/subgraph';
import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';
import type { Asset, Vault } from '@nftx/types';
import { processAssetItems } from '../utils';
import type { Provider } from '@ethersproject/providers';

const LIMIT = 1000;

const erc721 = async ({
  network,
  userAddress,
  assetAddresses,
  vaults,
  provider,
  lastId = '-1',
  retryCount = 0,
}: {
  network: number;
  userAddress: string;
  assetAddresses: string[];
  provider: Provider;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'features' | 'eligibilityModule'>[];
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
          provider,
          vaults,
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
          provider,
          vaults,
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
        vaults,
        lastId,
        provider,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }

  return { assets, nextId };
};

export default erc721;
