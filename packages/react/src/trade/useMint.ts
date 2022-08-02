import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useMint = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { mint },
  } = useNftx();

  type Args = TxnArgsOnly<typeof mint>;

  return useTransaction((args: Args) => mint({ ...args, network, signer }), {
    description: 'Mint',
    ...opts,
  });
};

export default useMint;
