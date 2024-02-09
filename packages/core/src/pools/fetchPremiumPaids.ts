import { NftxV3, type Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import config from '@nftx/config';

type QuerySubgraph = typeof querySubgraph;

export const makeFetchPremiumPaids =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async ({
    network,
    vaultAddresses,
    vaultIds,
  }: {
    network: number;
    vaultAddresses?: Address[];
    vaultIds?: string[];
  }) => {
    const premiumPaids: {
      date: number;
      amount: bigint;
      vaultId: string;
      to: Address;
      vaultAddress: Address;
    }[] = [];
    let lastId: string | undefined;

    do {
      const query = createQuery<NftxV3.Query>()
        .premiumPaids.orderBy('id')
        .orderDirection('asc')
        .first(1000)
        .where((w) => [
          w.id.gt(lastId),
          w.vault.in(vaultAddresses),
          w.vault((vault) => [vault.vaultId.in(vaultIds)]),
        ])
        .select((s) => [
          s.amount,
          s.date,
          s.id,
          // s.to((to) => [to.id]),
          s.vault((vault) => [vault.id, vault.vaultId]),
        ]);
      const data = await querySubgraph({
        query,
        url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      });

      premiumPaids.push(
        ...data.premiumPaids.map((p) => {
          return {
            date: Number(p.date),
            amount: BigInt(p.amount),
            vaultId: p.vault.vaultId,
            // FIXME: restore when the subgraph fixes this field
            // to: p.to.id as Address,
            to: undefined as unknown as Address,
            vaultAddress: p.vault.id as Address,
          };
        })
      );

      if (data.premiumPaids.length === 1000) {
        lastId = data.premiumPaids[data.premiumPaids.length - 1].id;
      } else {
        lastId = undefined;
      }
    } while (lastId);

    return premiumPaids;
  };

const fetchPremiumPaids = makeFetchPremiumPaids({ querySubgraph });

export default fetchPremiumPaids;
