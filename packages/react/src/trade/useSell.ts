import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useSell = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { sell },
  } = useNftx();

  type Args = TxnArgsOnly<typeof sell>;

  return useTransaction((args: Args) => sell({ ...args, network, signer }), {
    description: 'Sell',
    ...opts,
  });
};

export default useSell;
