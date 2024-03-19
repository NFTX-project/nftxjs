import config from '@nftx/config';
import { createQuery, gql, querySubgraph } from '@nftx/subgraph';
import type { Address, ERC1155, TokenId } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { createCursor, parseCursor } from './cursor';
import type { Holding } from './types';
import { Network } from '@nftx/constants';

type QuerySubgraph = typeof querySubgraph;

const fetchErc1155sMainnet = async ({
  userAddress,
  lastId,
  network,
  querySubgraph,
}: {
  network: number;
  userAddress: Address;
  lastId: string;
  querySubgraph: QuerySubgraph;
}) => {
  let holdings: Array<Holding> = [];
  let nextId: string | undefined;

  const q = createQuery<ERC1155.Query>();

  const query = q.account.id(userAddress).select((s) => [
    s.holdings(
      q.holdings
        .first(1000)
        .orderBy('id')
        .orderDirection('asc')
        .where((w) => [w.id.gt(lastId), w.balance.gt('0')])
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

const fetchErc1155sSepolia = fetchErc1155sMainnet;

const fetchErc1155sGoerli = async ({
  lastId,
  network,
  userAddress,
  querySubgraph,
}: {
  network: number;
  lastId: string;
  userAddress: Address;
  querySubgraph: QuerySubgraph;
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
        quantity: 1n,
      };
    });
  }
  if (data?.owners?.[0]?.tokens?.length === 1000) {
    nextId =
      data.owners?.[0].tokens[data.owners?.[0].tokens.length - 1].tokenID;
  }

  return [holdings, nextId] as const;
};

const fetchErc1155sArbitrum = fetchErc1155sMainnet;

export const makeFetchErc1155s =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
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
          querySubgraph,
        });
        break;
      case Network.Goerli:
        [holdings, nextId] = await fetchErc1155sGoerli({
          lastId,
          network,
          userAddress,
          querySubgraph,
        });
        break;
      case Network.Sepolia:
        [holdings, nextId] = await fetchErc1155sSepolia({
          lastId,
          network,
          userAddress,
          querySubgraph,
        });
        break;
      case Network.Arbitrum:
        [holdings, nextId] = await fetchErc1155sArbitrum({
          lastId,
          network,
          userAddress,
          querySubgraph,
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

export default makeFetchErc1155s({ querySubgraph });
