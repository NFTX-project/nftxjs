import config from '@nftx/config';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
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
        tokenId: BigInt(x.token.identifier).toString(),
        quantity: Number(x.value) < 1 ? parseEther(x.value) : BigInt(x.value),
      };
    });

    return [holdings, createCursor('1155', nextId)] as const;
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
          tokenId: x.tokenID,
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

const makeFetchErc1155s =
  ({
    fetchErc1155sArbitrum,
    fetchErc1155sGoerli,
    fetchErc1155sMainnet,
  }: {
    fetchErc1155sMainnet: FetchErc1155sMainnet;
    fetchErc1155sGoerli: FetchErc1155sGoerli;
    fetchErc1155sArbitrum: FetchErc1155sArbitrum;
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
      cursor: createCursor('721', nextId),
    };
  };

export default makeFetchErc1155s({
  fetchErc1155sArbitrum: makeFetchErc1155sArbitrum({ querySubgraph }),
  fetchErc1155sGoerli: makeFetchErc1155sGoerli({ querySubgraph }),
  fetchErc1155sMainnet: makeFetchErc1155sMainnet({ querySubgraph }),
});
