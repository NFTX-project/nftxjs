import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { NftxV3, Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

type VTokenBalance = {
  type: 'vToken';
  /** The address of the vault token */
  id: Address;
  /** The vault ID */
  vaultId: string;
  /** The user's vToken balance */
  balance: bigint;
};

type QuerySubgraph = typeof querySubgraph;

export const makeFetchVTokenBalances =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    network = config.network,
    userAddresses,
    vaultAddresses,
    vaultIds,
  }: {
    network?: number;
    userAddresses?: Address[];
    vaultIds?: string[];
    vaultAddresses?: Address[];
  }): Promise<VTokenBalance[]> => {
    const balances: VTokenBalance[] = [];
    let lastId: string | undefined;

    do {
      const q = createQuery<NftxV3.Query>();
      const query = q.erc20Balances
        .first(1000)
        .orderBy('id')
        .where((w) => [
          userAddresses?.length === 1
            ? w.account.is(userAddresses[0])
            : w.account.in(userAddresses),
          vaultAddresses?.length === 1
            ? w.contract.is(vaultAddresses[0])
            : w.contract.in(vaultAddresses),
        ])
        .select((balance) => [
          balance.id,
          balance.contract((contract) => [
            contract.id,
            contract.asVaultAsset((vault) => [vault.vaultId]),
          ]),
          balance.valueExact,
        ]);

      const result = await querySubgraph({
        url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
        query,
      });

      result.erc20Balances.forEach((balance) => {
        if (
          vaultIds &&
          !vaultIds.includes(balance.contract.asVaultAsset.vaultId ?? '')
        ) {
          return;
        }

        const vTokenBalance: VTokenBalance = {
          type: 'vToken',
          id: balance.contract.id as Address,
          vaultId: balance.contract.asVaultAsset.vaultId ?? '',
          balance: BigInt(balance.valueExact),
        };

        balances.push(vTokenBalance);
      });

      if (result.erc20Balances.length === 1000) {
        lastId = result.erc20Balances[result.erc20Balances.length - 1].id;
      } else {
        lastId = undefined;
      }
    } while (lastId);

    return balances;
  };

const fetchVTokenBalances = makeFetchVTokenBalances({ querySubgraph });

export default fetchVTokenBalances;
