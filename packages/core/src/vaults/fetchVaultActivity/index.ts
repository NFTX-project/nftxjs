import { querySubgraph } from '@nftx/subgraph';
import makeFetchVaultActivity from './fetchVaultActivity';
import makeGetAll from './getAll';
import { makeFetchMints, makeProcessMints } from './mints';
import { makeFetchRedeems, makeProcessRedeems } from './redeems';
import { makeFetchSwaps, makeProcessSwaps } from './swaps';

export default makeFetchVaultActivity({
  getAll: makeGetAll({
    processMints: makeProcessMints({
      fetchMints: makeFetchMints({ querySubgraph }),
    }),
    processRedeems: makeProcessRedeems({
      fetchRedeems: makeFetchRedeems({ querySubgraph }),
    }),
    processSwaps: makeProcessSwaps({
      fetchSwaps: makeFetchSwaps({ querySubgraph }),
    }),
    querySubgraph,
  }),
});
