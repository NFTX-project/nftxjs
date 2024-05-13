import { Address, ERC721, TokenId } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import config from '@nftx/config';
import type { Holding } from './types';

type QuerySubgraph = typeof querySubgraph;

const fetchErc721s = async ({
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

    const [holdings, nextId] = await fetchErc721s({
      lastId,
      network,
      querySubgraph,
      userAddress,
    });

    return {
      holdings,
      cursor: createCursor('721', nextId),
    };
  };

export default makeFetchErc721s({ querySubgraph });
