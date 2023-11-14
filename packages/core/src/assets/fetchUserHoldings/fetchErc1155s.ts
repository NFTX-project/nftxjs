import config from '@nftx/config';
import { createQuery, gql, querySubgraph } from '@nftx/subgraph';
import type { Address, ERC1155Sepolia, TokenId } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { createCursor, parseCursor } from './cursor';
import { parseEther } from 'viem';
import type { Holding } from './types';
import { Network } from '@nftx/constants';

type QuerySubgraph = typeof querySubgraph;

const makeFetchErc1155sMainnet =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    userAddress,
    lastId,
    network,
  }: {
    network: number;
    userAddress: Address;
    lastId: string;
  }) => {
    type Response = {
      account: {
        id: Address;
        balances: Array<{
          id: Address;
          contract: { id: Address };
          token: {
            identifier: string;
          };
          value: `${number}`;
        }>;
      };
    };
    type Params = {
      userAddress: Address;
      lastId: string;
    };

    const query = gql<Response, Params>`
      {
        account(id: $userAddress) {
          id
          balances: ERC1155balances(
            first: 1000
            where: { value_gt: $lastId }
            orderBy: value
            orderDirection: asc
          ) {
            id
            contract {
              id
            }
            token {
              identifier
            }
            value
          }
        }
      }
    `;

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC1155_SUBGRAPH, network),
      query,
      variables: {
        lastId,
        userAddress,
      },
    });

    let nextId: string | undefined;
    if (data?.account?.balances?.length === 1000) {
      nextId = data.account.balances[data.account.balances.length - 1].value;
    }

    const balances = data?.account?.balances ?? [];

    const holdings = balances.map((x) => {
      return {
        assetAddress: x.contract.id,
        tokenId: BigInt(x.token.identifier).toString() as TokenId,
        quantity: Number(x.value) < 1 ? parseEther(x.value) : BigInt(x.value),
      };
    });

    return [holdings, createCursor('1155', nextId)] as const;
  };

const makeFetchErc1155sSepolia =
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

    const q = createQuery<ERC1155Sepolia.Query>();

    const query = q.account.id(userAddress).select((s) => [
      s.holdings(
        q.holdings
          .first(1000)
          .orderBy('id')
          .orderDirection('asc')
          .where((w) => [w.id.gt(lastId)])
          .select((s) => [
            s.id,
            s.balance,
            s.token((t) => [t.identifier, t.collection((c) => [c.id])]),
          ])
      ),
    ]);

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.ERC1155_SUBGRAPH, network),
      query,
    });

    if (data?.account?.holdings?.length) {
      holdings = data.account.holdings.map((x) => {
        return {
          assetAddress: x.token.collection.id as Address,
          tokenId: BigInt(x.token.identifier).toString() as TokenId,
          quantity: BigInt(x.balance || '1'),
        };
      });
    }
    if (data?.account?.holdings?.length === 1000) {
      nextId = data.account.holdings[data.account.holdings.length - 1].id;
    }

    return [holdings, nextId] as const;
  };

const makeFetchErc1155sGoerli =
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
      url: getChainConstant(config.subgraph.ERC1155_SUBGRAPH, network),
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

const makeFetchErc1155sArbitrum = makeFetchErc1155sMainnet;

type FetchErc1155sMainnet = ReturnType<typeof makeFetchErc1155sMainnet>;
type FetchErc1155sGoerli = ReturnType<typeof makeFetchErc1155sGoerli>;
type FetchErc1155sArbitrum = ReturnType<typeof makeFetchErc1155sArbitrum>;
type FetchErc1155sSepolia = ReturnType<typeof makeFetchErc1155sSepolia>;

const makeFetchErc1155s =
  ({
    fetchErc1155sArbitrum,
    fetchErc1155sGoerli,
    fetchErc1155sMainnet,
    fetchErc1155sSepolia,
  }: {
    fetchErc1155sMainnet: FetchErc1155sMainnet;
    fetchErc1155sGoerli: FetchErc1155sGoerli;
    fetchErc1155sArbitrum: FetchErc1155sArbitrum;
    fetchErc1155sSepolia: FetchErc1155sSepolia;
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
    const { lastId } = parseCursor('1155', cursor);
    let holdings: Array<Holding> = [];
    let nextId: string | undefined;

    switch (network) {
      case Network.Mainnet:
        [holdings, nextId] = await fetchErc1155sMainnet({
          lastId,
          network,
          userAddress,
        });
        break;
      case Network.Goerli:
        [holdings, nextId] = await fetchErc1155sGoerli({
          lastId,
          network,
          userAddress,
        });
        break;
      case Network.Sepolia:
        [holdings, nextId] = await fetchErc1155sSepolia({
          lastId,
          network,
          userAddress,
        });
        break;
      case Network.Arbitrum:
        [holdings, nextId] = await fetchErc1155sArbitrum({
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
      cursor: createCursor('1155', nextId),
    };
  };

export default makeFetchErc1155s({
  fetchErc1155sArbitrum: makeFetchErc1155sArbitrum({ querySubgraph }),
  fetchErc1155sGoerli: makeFetchErc1155sGoerli({ querySubgraph }),
  fetchErc1155sMainnet: makeFetchErc1155sMainnet({ querySubgraph }),
  fetchErc1155sSepolia: makeFetchErc1155sSepolia({ querySubgraph }),
});
