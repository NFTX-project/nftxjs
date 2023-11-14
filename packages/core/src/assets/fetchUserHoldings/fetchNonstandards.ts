import type { Address } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import { gql, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import config from '@nftx/config';
import type { Holding } from './types';

type QuerySubgraph = typeof querySubgraph;

type Response = {
  account: {
    tokens: Array<{
      id: Address;
      identifier: `${number}`;
    }>;
  };
};
type Params = { userAddress: Address; lastId: string };

const makeFetchNonStandards =
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
    let nextId: string | undefined;

    const { lastId } = parseCursor('nonstandard', cursor);

    const url = getChainConstant(
      config.subgraph.NON_STANDARD_SUBGRAPH,
      network
    );
    if (url == null) {
      // Network doesn't support non-standard
      return { holdings: [], cursor: createCursor('nonstandard', undefined) };
    }

    const query = gql<Response, Params>`
      {
        account(id: $userAddress) {
          id
          tokens(
            first: 1000
            orderBy: identifier
            orderDirection: asc
            where: { identifier_gt: $lastId }
          ) {
            id
            identifier
          }
        }
      }
    `;

    const data = await querySubgraph({
      url,
      query,
      variables: { lastId, userAddress },
    });

    const tokens = data?.account?.tokens ?? [];

    const holdings: Holding[] = tokens.map((x) => {
      const [assetAddress] = x.id.split('-') as [Address, string];
      const tokenId = BigInt(x.identifier).toString() as `${number}`;

      return {
        assetAddress,
        tokenId,
      };
    });

    if (data?.account?.tokens?.length === 1000) {
      nextId = data.account.tokens[data.account.tokens.length - 1].identifier;
    }

    return { holdings, cursor: createCursor('nonstandard', nextId) };
  };

export default makeFetchNonStandards({ querySubgraph });
