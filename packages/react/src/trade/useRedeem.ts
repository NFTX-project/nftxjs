import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useRedeem = (opts: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { redeem },
  } = useNftx();

  type Args = TxnArgsOnly<typeof redeem>;

  return useTransaction((args: Args) => redeem({ ...args, network, signer }), {
    description: 'Redeem',
    ...opts,
  });
};

export default useRedeem;
