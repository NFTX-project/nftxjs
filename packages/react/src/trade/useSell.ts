import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useSell = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { sell, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof sell>;

  return useTransaction(
    (args: Args) => sell({ ...args, network, provider, signer }),
    {
      description: 'Sell',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({ vaultId: args.vault.vaultId, network });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useSell;
