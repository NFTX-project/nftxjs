import { useNftx } from '../contexts';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useApproveBuy = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { approveBuy },
  } = useNftx();

  type Args = TxnArgsOnly<typeof approveBuy>;

  return useTransaction(
    (args: Args) => approveBuy({ network, signer, ...args }),
    {
      description: 'Approve Buy',
      ...opts,
    }
  );
};

export default useApproveBuy;
