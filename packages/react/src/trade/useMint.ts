import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useMint = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { mint, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof mint>;

  return useTransaction((args: Args) => mint({ ...args, provider, signer }), {
    description: 'Mint',
    ...opts,
    async onSuccess(data, args) {
      await invalidateVault({
        vaultId: args.quote.methodParameters.vaultId,
        network,
      });
      return opts?.onSuccess?.(data, args);
    },
  });
};

export default useMint;
