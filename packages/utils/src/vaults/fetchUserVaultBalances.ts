import config from '@nftx/config';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { Address, NftxTokenType, UserVaultBalance } from '@nftx/types';
import { getChainConstant } from '../web3';

type QuerySubgraph = typeof querySubgraph;

export type Response = {
  account: {
    ERC20balances: Array<{
      contract: {
        id: Address;
        name: string;
        symbol: string;
        asVaultAsset: {
          type: NftxTokenType;
          vaultId: string;
        };
      };
      valueExact: `${number}`;
    }>;
  };
};

export default ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  /**
   * Fetches a user's holdings of vToken/xToken/vTokenWETH/xTokenWETH across all vaults
   */
  async function fetchUserBalances({
    userAddress,
    network = config.network,
  }: {
    userAddress: string;
    network: number;
  }) {
    const query = gql<Response>`
      {
        account(id: $userAddress) {
          ERC20balances(first: 1000) {
            contract {
              id
              name
              symbol
              asVaultAsset {
                type
                vaultId
              }
            }
            valueExact
          }
        }
      }
    `;

    const data = await querySubgraph({
      url: getChainConstant(
        config.subgraph.NFTX_TOKEN_BALANCE_SUBGRAPH,
        network
      ),
      query,
      variables: { userAddress },
    });

    const erc20Balances = data?.account?.ERC20balances ?? [];

    const balances: Array<UserVaultBalance | null> = erc20Balances.map(
      ({ valueExact, contract }) => {
        if (valueExact === '0') {
          return null;
        }

        const balance = BigInt(valueExact);

        return {
          type: contract.asVaultAsset.type,
          vaultId: contract.asVaultAsset.vaultId,
          address: contract.id,
          name: contract.name,
          symbol: contract.symbol,
          balance,
        };
      }
    );

    const vTokens: UserVaultBalance[] = [];
    const xTokens: UserVaultBalance[] = [];
    const slp: UserVaultBalance[] = [];
    const xSlp: UserVaultBalance[] = [];

    balances.forEach((balance) => {
      switch (balance?.type) {
        case 'vToken':
          vTokens.push(balance);
          break;
        case 'vTokenWETH':
          slp.push(balance);
          break;
        case 'xToken':
          xTokens.push(balance);
          break;
        case 'xTokenWETH':
          xSlp.push(balance);
          break;
        default:
          break;
      }
    });

    return { vTokens, xTokens, slp, xSlp };
  };
