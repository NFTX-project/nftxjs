import { useNftx } from '../contexts';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useApproveSell = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { approveSell },
  } = useNftx();

  type Args = TxnArgsOnly<typeof approveSell>;

  return useTransaction(
    (args: Args) => approveSell({ network, provider, signer, ...args }),
    {
      description: 'Approve Sell',
      ...opts,
    }
  );
};

export default useApproveSell;
