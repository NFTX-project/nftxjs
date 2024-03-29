import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useSwap = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { swap, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof swap>;

  return useTransaction(
    (args: Args) => swap({ ...args, network, provider, signer }),
    {
      description: 'Swap',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({
          vaultId: args.quote.methodParameters.vaultId,
          network,
        });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useSwap;
