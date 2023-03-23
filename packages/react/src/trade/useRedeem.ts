import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useRedeem = (opts: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { redeem, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof redeem>;

  return useTransaction((args: Args) => redeem({ ...args, provider, signer }), {
    description: 'Redeem',
    ...opts,
    async onSuccess(data, args) {
      await invalidateVault({ vaultId: args.vaultId, network });
      return opts?.onSuccess?.(data, args);
    },
  });
};

export default useRedeem;
