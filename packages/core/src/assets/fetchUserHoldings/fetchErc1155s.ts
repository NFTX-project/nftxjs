import config from '@nftx/config';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { createCursor, parseCursor } from './cursor';
import { parseEther } from 'viem';
import type { Holding } from './types';

type QuerySubgraph = typeof querySubgraph;

const makeFetchErc1155s =
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

    return {
      holdings,
      cursor: createCursor('1155', nextId),
    };
  };

export default makeFetchErc1155s({ querySubgraph });
