import { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { NftxTokenType, UserVaultBalance } from '@nftx/types';
import { getChainConstant } from '../web3';

type QuerySubgraph = typeof querySubgraph;

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
    type Response = {
      account: {
        ERC20balances: Array<{
          contract: {
            id: string;
            name: string;
            symbol: string;
            asVaultAsset: {
              type: NftxTokenType;
              vaultId: string;
            };
          };
          valueExact: string;
        }>;
      };
    };

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

    const balances: UserVaultBalance[] = await Promise.all(
      erc20Balances.map(async ({ valueExact, contract }) => {
        if (valueExact === '0') {
          return null;
        }

        const balance = BigNumber.from(valueExact);

        return {
          type: contract.asVaultAsset.type,
          vaultId: contract.asVaultAsset.vaultId,
          address: contract.id,
          name: contract.name,
          symbol: contract.symbol,
          balance,
        };
      })
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
