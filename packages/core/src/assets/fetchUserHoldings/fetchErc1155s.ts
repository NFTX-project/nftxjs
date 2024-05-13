import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { Address, ERC1155, TokenId } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { createCursor, parseCursor } from './cursor';
import type { Holding } from './types';

type QuerySubgraph = typeof querySubgraph;

const fetchErc1155s = async ({
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

    const [holdings, nextId] = await fetchErc1155s({
      lastId,
      network,
      querySubgraph,
      userAddress,
    });

    return {
      holdings,
      cursor: createCursor('1155', nextId),
    };
  };

export default makeFetchErc1155s({ querySubgraph });
