import { Address, ERC721, TokenId } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import { Network } from '@nftx/constants';
import { createQuery, gql, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import config from '@nftx/config';
import type { Holding } from './types';

type QuerySubgraph = typeof querySubgraph;

const fetchErc721sMainnet = async ({
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
  let holdings: Holding[] = [];
  let nextId: string | undefined;

  const query = createQuery<ERC721.Query>()
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
        quantity: 1n,
      };
    });
  }
  if (data?.tokens?.length === 1000) {
    nextId = data.tokens[data.tokens.length - 1].id;
  }

  return [holdings, nextId] as const;
};

const fetchErc721sSepolia = fetchErc721sMainnet;

const fetchErc721sGoerli = async ({
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
    url: getChainConstant(config.subgraph.ERC721_SUBGRAPH, network),
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

const fetchErc721sArbitrum = fetchErc721sMainnet;

export const makeFetchErc721s =
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
    const { lastId } = parseCursor('721', cursor);
    let holdings: Array<Holding> = [];
    let nextId: string | undefined;

    switch (network) {
      case Network.Mainnet:
        [holdings, nextId] = await fetchErc721sMainnet({
          lastId,
          network,
          userAddress,
          querySubgraph,
        });
        break;
      case Network.Goerli:
        [holdings, nextId] = await fetchErc721sGoerli({
          lastId,
          network,
          userAddress,
          querySubgraph,
        });
        break;
      case Network.Sepolia:
        [holdings, nextId] = await fetchErc721sSepolia({
          lastId,
          network,
          userAddress,
          querySubgraph,
        });
        break;
      case Network.Arbitrum:
        [holdings, nextId] = await fetchErc721sArbitrum({
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
      cursor: createCursor('721', nextId),
    };
  };

export default makeFetchErc721s({ querySubgraph });
