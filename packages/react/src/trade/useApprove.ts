import type { approve } from 'nftx.js';
import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

type Args = TxnArgsOnly<typeof approve>;

const useApprove = (opts?: UseTransactionOptions) => {
  const {
    provider,
    signer,
    network,
    core: { approve },
  } = useNftx();

  return useTransaction(
    (args: Args) => approve({ ...args, provider, signer, network }),
    {
      description: 'Approve',
      ...opts,
    }
  );
};

export default useApprove;
