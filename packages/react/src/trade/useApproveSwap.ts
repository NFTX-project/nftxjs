import { useNftx } from '../contexts';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useApproveSwap = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { approveSwap },
  } = useNftx();

  type Args = TxnArgsOnly<typeof approveSwap>;

  return useTransaction(
    (args: Args) => approveSwap({ network, signer, ...args }),
    {
      description: 'Approve Swap',
      ...opts,
    }
  );
};

export default useApproveSwap;
