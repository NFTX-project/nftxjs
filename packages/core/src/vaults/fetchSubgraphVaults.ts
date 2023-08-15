import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { Address, NftxV3 } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

export type Response = { globals: NftxV3.Global[]; vaults: NftxV3.Vault[] };

const fetchSubgraphVaults = async ({
  manager,
  network = config.network,
  vaultAddresses,
  vaultIds,
}: {
  network?: number;
  vaultAddresses?: Address[];
  vaultIds?: string[];
  manager?: Address;
}): Promise<Response> => {
  const g = createQuery<NftxV3.Query>();
  const globalsQuery = g.globals.select((s) => [
    s.fees((s) => [s.mintFee, s.redeemFee, s.swapFee]),
  ]);

  const vaults: NftxV3.Vault[] = [];
  const globals: NftxV3.Global[] = [];
  let lastId: string | undefined;

  do {
    const vaultsQuery = g.vaults
      .first(1000)
      .where((w) => [
        w.vaultId.in(vaultIds && vaultIds.length > 1 ? vaultIds : undefined),
        w.vaultId.is(
          vaultIds && vaultIds.length === 1 ? vaultIds[0] : undefined
        ),
        w.vaultId.gt(lastId),
        w.id.in(
          vaultAddresses && vaultAddresses.length > 1
            ? vaultAddresses
            : undefined
        ),
        w.id.is(
          vaultAddresses && vaultAddresses.length === 1
            ? vaultAddresses[0]
            : undefined
        ),
        w.manager.is(manager),
      ])
      .select((v) => [
        v.vaultId,
        v.id,
        v.is1155,
        v.isFinalized,
        v.totalHoldings,
        v.totalMints,
        v.totalRedeems,
        v.totalFees,
        v.createdAt,
        v.shutdownDate,
        v.usesFactoryFees,
        v.token((s) => [s.id, s.name, s.symbol]),
        v.fees((s) => [s.mintFee, s.redeemFee, s.swapFee]),
        v.asset((s) => [s.id, s.name, s.symbol]),
        v.manager((s) => [s.id]),
        v.createdBy((s) => [s.id]),
        v.eligibilityModule((e) => [
          e.id,
          e.name,
          e.eligibleIds,
          e.eligibleRange,
        ]),
        v.features((f) => [f.enableMint, f.enableRedeem, f.enableSwap]),
        g.holdings
          .first(1000)
          .orderBy('tokenId')
          .select((h) => [h.id, h.tokenId, h.amount, h.dateAdded]),
      ]);

    // const query = g.combine(globalsQuery, vaultsQuery);
    const query = globalsQuery.combine(vaultsQuery);

    const data = await querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      query,
    });

    vaults.push(...data.vaults);
    globals.push(...data.globals);

    if (data.vaults.length === 1000) {
      const lastVault = data.vaults[data.vaults.length - 1];
      lastId = `${lastVault.vaultId}`;
    } else {
      lastId = undefined;
    }
  } while (lastId);

  return { globals, vaults };
};

export default fetchSubgraphVaults;
