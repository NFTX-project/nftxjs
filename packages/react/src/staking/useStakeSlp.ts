import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

const useStakeSlp = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { stakeSlp, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof stakeSlp>;

  return useTransaction(
    (args: Args) => stakeSlp({ network, signer, ...args }),
    {
      description: 'Stake SLP',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({ vaultId: args.vaultId, network });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useStakeSlp;
