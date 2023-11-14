import { Address, ERC721Sepolia, TokenId } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import { Network } from '@nftx/constants';
import { buildWhere, createQuery, gql, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import config from '@nftx/config';
import type { Holding } from './types';

type QuerySubgraph = typeof querySubgraph;

const makeFetchErc721sMainnet =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    lastId,
    network,
    userAddress,
  }: {
    network: number;
    lastId: string;
    userAddress: Address;
  }) => {
    let holdings: Array<Holding> = [];
    let nextId: string | undefined;

    type Response = {
      account: {
        id: Address;
        tokens: Array<{
          id: Address;
          identifier: `${number}`;
          contract: {
            id: Address;
          };
        }>;
      };
    };
    type Params = { userAddress: Address };

    const where = buildWhere({
      identifier_gt: lastId,
    });

    const query = gql<Response, Params>`
      {
        account(id: $userAddress) {
          id
          tokens: ERC721tokens(
            first: 1000
            where: ${where}
            orderBy: identifier
            orderDirection: asc
          ) {
            id
            identifier
            contract {
              id
            }
          }
        }
      }
    `;

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
      query,
      variables: {
        userAddress,
      },
    });

    if (data?.account?.tokens?.length) {
      holdings = data.account.tokens.map((x) => {
        return {
          assetAddress: x.contract.id,
          tokenId: BigInt(x.identifier).toString() as TokenId,
        };
      });
    }
    if (data?.account?.tokens?.length === 1000) {
      nextId = data.account.tokens[data.account.tokens.length - 1].identifier;
    }

    return [holdings, nextId] as const;
  };

const makeFetchErc721sSepolia =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    network,
    lastId,
    userAddress,
  }: {
    network: number;
    lastId: string;
    userAddress: Address;
  }) => {
    let holdings: Holding[] = [];
    let nextId: string | undefined;

    const query = createQuery<ERC721Sepolia.Query>()
      .tokens.where((w) => [w.owner.is(userAddress), w.id.gt(lastId)])
      .orderBy('id')
      .orderDirection('asc')
      .first(1000)
      .select((s) => [s.id, s.collection((c) => [c.id]), s.identifier]);

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
      query,
    });

    if (data?.tokens?.length) {
      holdings = data.tokens.map((x) => {
        return {
          assetAddress: x.collection.id as Address,
          tokenId: BigInt(x.identifier).toString() as TokenId,
        };
      });
    }
    if (data?.tokens?.length === 1000) {
      nextId = data.tokens[data.tokens.length - 1].id;
    }

    return [holdings, nextId] as const;
  };

const makeFetchErc721sGoerli =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    lastId,
    network,
    userAddress,
  }: {
    network: number;
    lastId: string;
    userAddress: Address;
  }) => {
    let holdings: Array<Holding> = [];
    let nextId: string | undefined;
    type Response = {
      owners: {
        id: Address;
        totalTokens: string;
        tokens: {
          tokenID: `${number}`;
          collection: { id: Address };
        }[];
      }[];
    };

    const query = gql<Response>`{
    owners(
      where: {
        id: "${userAddress}"
      }
    ) {
      id
      totalTokens
      tokens(
        first: 1000
        orderBy: tokenID
        where: {
          tokenID_gt: "${lastId}"
        }
      ) {
        tokenID
        collection {
          id
        }
      }
    }
  }`;

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
      query,
    });

    if (data?.owners?.[0]?.tokens?.length) {
      holdings = data.owners[0].tokens.map((x) => {
        return {
          assetAddress: x.collection.id,
          tokenId: BigInt(x.tokenID).toString() as TokenId,
        };
      });
    }
    if (data?.owners?.[0]?.tokens?.length === 1000) {
      nextId =
        data.owners?.[0].tokens[data.owners?.[0].tokens.length - 1].tokenID;
    }

    return [holdings, nextId] as const;
  };

const makeFetchErc721sArbitrum =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    network,
    lastId,
    userAddress,
  }: {
    network: number;
    lastId: string;
    userAddress: Address;
  }) => {
    let holdings: Array<Holding> = [];
    let nextId: string | undefined;

    type Response = {
      account: {
        id: Address;
        tokens: Array<{
          id: Address;
          identifier: `${number}`;
          contract: { id: Address };
        }>;
      };
    };
    type Params = { userAddress: Address; lastId: string };

    const query = gql<Response, Params>`
      {
        account(id: $userAddress) {
          id
          tokens: ERC721tokens(
            first: 1000
            where: { identifier_gt: $lastId }
            orderBy: identifier
            orderDirection: asc
          ) {
            id
            identifier
            contract {
              id
            }
          }
        }
      }
    `;

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
      query,
      variables: { lastId, userAddress },
    });

    if (data?.account?.tokens?.length) {
      holdings = data.account.tokens.map((x) => ({
        assetAddress: x.contract.id,
        tokenId: BigInt(x.identifier).toString() as TokenId,
      }));
    }
    if (data?.account?.tokens?.length === 1000) {
      nextId = data.account.tokens[data.account.tokens.length - 1].identifier;
    }

    return [holdings, nextId] as const;
  };

type FetchErc721sMainnet = ReturnType<typeof makeFetchErc721sMainnet>;
type FetchErc721sGoerli = ReturnType<typeof makeFetchErc721sGoerli>;
type FetchErc721sArbitrum = ReturnType<typeof makeFetchErc721sArbitrum>;
type FetchErc721sSepolia = ReturnType<typeof makeFetchErc721sSepolia>;

const makeFetchErc721s =
  ({
    fetchErc721sArbitrum,
    fetchErc721sGoerli,
    fetchErc721sMainnet,
    fetchErc721sSepolia,
  }: {
    fetchErc721sMainnet: FetchErc721sMainnet;
    fetchErc721sGoerli: FetchErc721sGoerli;
    fetchErc721sArbitrum: FetchErc721sArbitrum;
    fetchErc721sSepolia: FetchErc721sSepolia;
  }) =>
  async ({
    userAddress,
    cursor,
    network,
  }: {
    network: number;
    userAddress: Address;
    cursor?: string;
  }): Promise<{
    holdings: Holding[];
    cursor?: string;
  }> => {
    const { lastId } = parseCursor('721', cursor);
    let holdings: Array<Holding> = [];
    let nextId: string | undefined;

    switch (network) {
      case Network.Mainnet:
        [holdings, nextId] = await fetchErc721sMainnet({
          lastId,
          network,
          userAddress,
        });
        break;
      case Network.Goerli:
        [holdings, nextId] = await fetchErc721sGoerli({
          lastId,
          network,
          userAddress,
        });
        break;
      case Network.Sepolia:
        [holdings, nextId] = await fetchErc721sSepolia({
          lastId,
          network,
          userAddress,
        });
        break;
      case Network.Arbitrum:
        [holdings, nextId] = await fetchErc721sArbitrum({
          lastId,
          network,
          userAddress,
        });
        break;
      default:
        break;
    }

    return {
      holdings,
      cursor: createCursor('721', nextId),
    };
  };

export default makeFetchErc721s({
  fetchErc721sMainnet: makeFetchErc721sMainnet({ querySubgraph }),
  fetchErc721sGoerli: makeFetchErc721sGoerli({ querySubgraph }),
  fetchErc721sArbitrum: makeFetchErc721sArbitrum({ querySubgraph }),
  fetchErc721sSepolia: makeFetchErc721sSepolia({ querySubgraph }),
});
