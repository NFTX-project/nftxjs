import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

const useBuy = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { buy, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof buy>;

  return useTransaction(
    (args: Args) => buy({ ...args, provider, network, signer }),
    {
      description: 'Buy',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({
          network,
          vaultId: args.quote.methodParameters.vaultId,
        });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useBuy;
