import { BigNumber } from '@ethersproject/bignumber';
import { gql, querySubgraph } from '@nftx/subgraph';
import { NFTX_TOKEN_BALANCE_SUBGRAPH } from '@nftx/constants';
import { getChainConstant } from '../utils';
import type { NftxTokenType, UserVaultBalance } from './types';

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

const fetchUserVaultBalances = async ({
  userAddress,
  network,
}: {
  userAddress: string;
  network: number;
}) => {
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
    url: getChainConstant(NFTX_TOKEN_BALANCE_SUBGRAPH, network),
    query,
    variables: { userAddress },
  });

  const balances: UserVaultBalance[] =
    data?.account?.ERC20balances?.map((balance) => {
      if (balance.valueExact === '0') {
        return null;
      }
      return {
        type: balance.contract.asVaultAsset.type,
        vaultId: balance.contract.asVaultAsset.vaultId,
        address: balance.contract.id,
        name: balance.contract.name,
        symbol: balance.contract.symbol,
        balance: BigNumber.from(balance.valueExact),
      };
    }).filter(Boolean) ?? [];

  const vTokens: UserVaultBalance[] = [];
  const xTokens: UserVaultBalance[] = [];
  const slp: UserVaultBalance[] = [];
  const xSlp: UserVaultBalance[] = [];

  balances.forEach((balance) => {
    switch (balance.type) {
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

export default fetchUserVaultBalances;
