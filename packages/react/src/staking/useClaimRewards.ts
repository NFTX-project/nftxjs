import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useClaimRewards = (opts?: UseTransactionOptions) => {
  const {
    signer,
    network,
    core: { claimRewards, invalidateUser },
  } = useNftx();

  type Args = TxnArgsOnly<typeof claimRewards> & { userAddress: string };

  return useTransaction(
    (args: Args) => claimRewards({ network, signer, ...args }),
    {
      description: 'Claim Rewards',
      ...opts,
      async onSuccess(data, args) {
        await invalidateUser({ network, userAddress: args.userAddress });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useClaimRewards;
