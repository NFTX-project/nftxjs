import { useNftx } from '../contexts';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useUnstakeLiquidity = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { unstakeLiquidity, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof unstakeLiquidity>;

  return useTransaction(
    (args: Args) => unstakeLiquidity({ network, provider, signer, ...args }),
    {
      description: 'Unstake Liquidity',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({ vaultId: args.vaultId, network });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useUnstakeLiquidity;
