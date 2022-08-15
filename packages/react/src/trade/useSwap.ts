import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useSwap = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { swap },
  } = useNftx();

  type Args = TxnArgsOnly<typeof swap>;

  return useTransaction((args: Args) => swap({ ...args, network, signer }), {
    description: 'Swap',
    ...opts,
  });
};

export default useSwap;
