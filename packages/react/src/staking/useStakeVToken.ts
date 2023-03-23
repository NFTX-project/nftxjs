import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useStakeVToken = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    signer,
    core: { stakeVToken, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof stakeVToken>;

  return useTransaction(
    (args: Args) => stakeVToken({ network, provider, signer, ...args }),
    {
      description: 'Stake vTokens',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({ vaultId: args.vaultId, network });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useStakeVToken;
