import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

const useBuy = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { buy },
  } = useNftx();

  type Args = TxnArgsOnly<typeof buy>;

  return useTransaction((args: Args) => buy({ ...args, network, signer }), {
    description: 'Buy',
    ...opts,
  });
};

export default useBuy;
