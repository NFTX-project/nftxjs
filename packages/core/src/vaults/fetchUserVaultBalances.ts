import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { gql, type querySubgraph } from '@nftx/subgraph';
import { Address, type fetchTokenBalance, getChainConstant } from '../web3';
import type { NftxTokenType, UserVaultBalance } from './types';

type QuerySubgraph = typeof querySubgraph;
type FetchTokenBalance = typeof fetchTokenBalance;

export default ({
  fetchTokenBalance,
  querySubgraph,
}: {
  fetchTokenBalance: FetchTokenBalance;
  querySubgraph: QuerySubgraph;
}) =>
  async function fetchUserVaultBalances({
    userAddress,
    network = config.network,
    provider,
  }: {
    userAddress: Address;
    network: number;
    provider: Provider;
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

    const query = gql`
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

    const data = await querySubgraph<Response>({
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

        // Get accurate balance amount
        const balance = await fetchTokenBalance({
          network,
          provider,
          ownerAddress: userAddress,
          tokenAddress: contract.id,
        });

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
