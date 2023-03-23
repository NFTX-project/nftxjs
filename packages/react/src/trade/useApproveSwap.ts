import { useNftx } from '../contexts';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useApproveSwap = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { approveSwap },
  } = useNftx();

  type Args = TxnArgsOnly<typeof approveSwap>;

  return useTransaction(
    (args: Args) => approveSwap({ network, provider, signer, ...args }),
    {
      description: 'Approve Swap',
      ...opts,
    }
  );
};

export default useApproveSwap;
